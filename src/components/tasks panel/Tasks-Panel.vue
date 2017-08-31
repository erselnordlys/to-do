<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns="">
    <div id="affairs" v-if="show">
        {{getTasksAndDurationsFromDB}}
        <!--{{taskToDelete}}-->
        <!--new task drag, tasks list, results-->
        <div class="column-group">

                <!--DRAG BLOCK for new tasks-->
                <div @drop="drop" @dragover.prevent>
                    <task-time
                            v-bind:vis="clearResults"
                            v-bind:obj="results"
                            v-on:clear="clearResults"
                            @dragTaskTime="getPreparedObj"
                    ></task-time>
                </div>

                <!--RESULTS-->
                <div class="results">
                    <res
                            v-bind:allResults="totalResults"
                    ></res>
                </div>

                <!--PLANS-->
                <div class="plans">
                    <plans
                            v-bind:allPlans="totalPlans"
                    ></plans>
                </div>
            </div>
        <div class="column-group">
                <!--TASKS LIST-->
            <div class="tasks">
                <task
                        @dragTask="getTask"
                        v-bind:tasks="tasks"
                ></task>
            </div>

                <!--DURATIONS LIST-->
            <div class="time">
                <duration
                        @dragTime="getTime"
                        v-bind:durations="durations"
                ></duration>
            </div>

                <!--NEW TASK INPUT-->
            <div class="new-task">
                <new-task-input></new-task-input>
            </div>

                <!--DELETE BUTTON-->
                <div @drop="deleteTask" @dragover.prevent>
                    <del-block></del-block>
                </div>

            </div>
    </div>
</template>

<script>

    import Task from './Tasks.vue';
    import Time from './Time.vue';
    import Res from './Results.vue';
    import TaskTime from  './TaskTime.vue';
    import Delete from './DeleteBtn.vue';
    import Plans from './Plans.vue';
    import NewTaskInput from './NewTaskInput.vue';
    import {db} from '../../firebase-module';
    import {todoRef} from '../../firebase-module';

    export default {
        name: 'Task-panel',
        data () {
            return {
                t: [],
                d: [],

                res: {task: '', time: ''},
                temp: {task: '', time: ''},
                prepObj: '',
                deleteDayTaskTemp: {},
            }
        },
        props: ['show', 'task', 'passTaskTime', 'vals', 'taskToDelete', 'selectedMonth'],
        components: {
            task: Task,
            duration: Time,
            res: Res,
            'task-time': TaskTime,
            'del-block': Delete,
            plans: Plans,
            'new-task-input': NewTaskInput
        },
        methods: {
            // when dropped on a drag-block
            drop: function () {
                // add values to results when dropped
                if (this.temp.task !== '') {
                    this.res.task = this.temp.task;
                }

                if (this.temp.time !== '') {
                    this.res.time = Number(this.res.time);
                    this.res.time += Number(this.temp.time);
                }

                this.temp.time = '';
                this.$emit('changeDropped');
            },

            getTask: function (val) {
                // add chosen task to temp map
                this.temp.task = val;
                this.temp.time = '';

                this.taskToDelete.name = val;
                this.taskToDelete.day = 0;
                this.taskToDelete.duration = 0;
            },

            getTime: function (val) {
                this.temp.time = val;
                this.temp.task = '';
            },

            getPreparedObj: function (val) {
                this.prepObj = val;
                this.$emit('dragTaskTime', this.prepObj);
            },

            clearResults: function () {
                // hide clear btn
                this.res = { task: '', time: ''};
                this.temp = { task: '', time: ''};
            },

            deleteTask: function () {
                // delete task from drag-block
                this.res = {task: '', time: ''};
                // for tasks+durations from schedule

                if (this.taskToDelete.day !== 0) {
                    console.log(this.taskToDelete);

                    let name = this.taskToDelete.name;
                    let duration = this.taskToDelete.duration;
                    let month = this.taskToDelete.month;
                    let day = this.taskToDelete.day;

                    for (let key in this.todo) {
                        if ((this.todo[key].name == name) && (this.todo[key].duration == duration) &&
                            (this.todo[key].month == month) && (this.todo[key].day == day)) {
                            db.ref('todo/' + key).remove();
                        }
                    }
                    this.$emit('deleteFromFinal');
//                    this.taskToDelete.name = '';
//                    this.taskToDelete.duration = '';

                }

                // to delete stated task
                else if (this.taskToDelete.name !== '') {
                    let toDelete = this.taskToDelete.name; // web
                    let arr = this.statedTasks;
                    delete arr['.key'];

                    for (let key in arr) {
                        if (arr[key] == toDelete) {
                            db.ref('stated-data/tasks/' + key).remove();
                        }
                    }
                     this.taskToDelete.name = '';
                }
            },

        },

        computed: {
            results: function () {
                // this displays in drag-block
                if(this.vals == true) {
                    this.res = {task: '', time: ''};
                }
                return this.res;
            },

            totalResults: function () {
                let arr = [];
                let result = {};
                let tasks = [];

                //get only tasks of this month from DB
                for (let key in this.todo) {
                    if (this.todo[key].month == this.selectedMonth)  {
                       if ( tasks.indexOf(this.todo[key].name) == -1) {
                           tasks.push(this.todo[key].name);
                       }
                    }
                }

                // take every task from stated tasks
                delete this.todo['.key'];
                for (let key in tasks) {

                    let totalHours = 0;
                    let task = tasks[key];
                    let d = new Date();
                    let day = d.getDate();

                    // check every to-do object in DB, take needed hours for a current task
                    for (let key in this.todo) {
                        if ((this.todo[key].name == task) && (this.todo[key].month == this.selectedMonth) &&
                            (this.todo[key].day <= day)) {
                            totalHours += this.todo[key].duration;
                        }
                        // put task: total time in the common object
                        result[task] = totalHours;
                    }
                    if (totalHours !== 0) {
                        arr.push(task.charAt(0).toUpperCase() + task.slice(1) + ': ' + totalHours + ' h');

                    }
                }

                return arr;
            },

            totalPlans: function () {
                let arr = [];
                let result = {};
                let tasks = [];

                //get only tasks of this month from DB
                for (let key in this.todo) {
                    if (this.todo[key].month == this.selectedMonth)  {
                        if ( tasks.indexOf(this.todo[key].name) == -1) {
                            tasks.push(this.todo[key].name);
                        }
                    }
                }

                // take every task from stated tasks
                delete this.todo['.key'];
                for (let key in tasks) {

                    let totalHours = 0;
                    let task = tasks[key];
                    let d = new Date();
                    let day = d.getDate();

                    // check every to-do object in DB, take needed hours for a current task
                    for (let key in this.todo) {
                        if ((this.todo[key].name == task) && (this.todo[key].month == this.selectedMonth) &&
                            (this.todo[key].day > day)) {
                            totalHours += this.todo[key].duration;
                        }
                        // put task: total time in the common object
                            result[task] = totalHours;
                    }
                    if (totalHours !== 0) {
                        arr.push(task.charAt(0).toUpperCase() + task.slice(1) + ': ' + totalHours + ' h');

                    }
                }
                return arr;
            },

            getTasksAndDurationsFromDB: function () {
                let data = this.statedData;

                this.d = data.durations;
                this.t = data.tasks;
            },

            tasks: function () {
                return this.t;
            },

            durations: function () {
                return this.d;
            }
        },

        firebase () {
            return {
                todo: {
                    source: todoRef,
                    asObject: true,
                    cancelCallback: function () {
                        console.log('error')
                    }
                },

                statedData: {
                    source: db.ref('stated-data'),
                    asObject: true,
                    cancelCallback: function () {
                        console.log('error');
                    }
                },

                statedTasks: {
                    source: db.ref('stated-data/tasks'),
                    asObject: true
                },

                statedDurations: {
                    source: db.ref('stated-data/durations'),
                    asObject: true
                }
            }

        }
    }
</script>

<style scoped>
    #affairs {
        max-width: 500px;
        width: auto;
        height: auto;

        color: #595959;
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        align-items: flex-start;
        justify-content: flex-start;
        margin-left: 10px;
    }

    .column-group {
        flex-direction: column;
        flex-grow: 1;
        display: flex;
        max-width: 210px;
        margin-right: 5px;
    }

    .column-group:last-child {
        max-width: 270px;
        margin-left: 5px;
    }

    .time,
    .results,
    .tasks,
    .new-task,
    .plans {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
    }

</style>