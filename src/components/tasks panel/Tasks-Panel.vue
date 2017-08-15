<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns="">
    <div id="affairs" v-if="show">

        <div class="row-group">

            {{getTasksAndDurationsFromDB}}

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

                <!--TASKS LIST-->
                <div class="tasks__msg">{{ msgs.msgTasks }}
                    <div class="tasks">
                        <task
                                v-for="item in tasks"
                                @dragTask="getTask"
                                v-bind:task="item"
                                id="task"
                        ></task>
                    </div>
                </div>

                <!--RESULTS-->
                <div class="results__msg"> {{ msgs.msgResults }}
                    <div class="results">
                        <res
                                v-for="item in totalResults"
                                v-bind:resName="item"></res>
                    </div>
                </div>
            </div>

            <!--time, new task, delete-->
            <div class="column-group">

                <!--DURATIONS LIST-->
                <div class="time__msg">{{ msgs.msgTime }}
                    <div class="time">
                        <duration
                                @dragTime="getTime"
                                v-for="item in durations"
                                v-bind:hours="item"
                        ></duration>
                    </div>
                </div>

                <!--NEW TASK INPUT-->
                <div class="new-task__msg" > {{ msgs.msgNewTask}}
                    <input
                            class="new-task"
                            v-model="newTaskLine"
                            v-on:keyup.enter="addNewTask"
                    />
                </div>

                <!--DELETE BUTTON-->
                <div @drop="deleteTask" @dragover.prevent>
                    <del-block></del-block>
                </div>

            </div>

        </div>

    </div>
</template>

<script>

    import Task from './Task.vue';
    import Time from './Time.vue';
    import Res from './Results.vue';
    import TaskTime from  './TaskTime.vue';
    import Delete from './DeleteBtn.vue';
    import {db} from '../../firebase-module';
    import {todoRef} from '../../firebase-module';

    export default {
        name: 'Task-panel',
        data () {
            return {
                msgs: {
                    msgNewTask: 'Add a new task in list:',
                    msgTaskTime: 'Drag a new task here',
                    msgTasks: 'What are your tasks?',
                    msgTime: 'How much time did it take?',
                    msgResults: 'Your results this month',
                    msgDelete: 'Delete task'
                },

                t: [],
                d: [],

                res: {task: '', time: ''},
                temp: {task: '', time: ''},
                prepObj: '',
                newTaskLine: '',
                deleteDayTaskTemp: {}
            }
        },
        props: ['show', 'task', 'passTaskTime', 'vals', 'taskToDelete', 'selectedMonth'],
        components: {
            task: Task,
            duration: Time,
            res: Res,
            'task-time': TaskTime,
            'del-block': Delete
        },
        methods: {
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

            addNewTask: function() {

                // if there is something in the input
                if (this.newTaskLine.length > 0) {

                    //push new key-value to tasks
                    db.ref('stated-data/tasks').push(this.newTaskLine);
                    this.newTaskLine = '';
                }
            },

            deleteTask: function () {

                // delete task from drag-block
                this.res = {task: '', time: ''};
                // for tasks+durations from schedule
                if (this.taskToDelete.day !== 0) {
                    console.log('delete task from schedule');

                    let name = this.taskToDelete.name;
                    let duration = this.taskToDelete.duration;
                    let month = this.taskToDelete.month;
                    let day = this.taskToDelete.day;

                    for (let key in this.todo) {
                        if ( (this.todo[key].name == name) && (this.todo[key].duration == duration) &&
                            (this.todo[key].month == month) && (this.todo[key].day == day) ) {
                            console.log(key);
                            db.ref('todo/' + key).remove();
                        }
                    }
                    this.$emit('deleteFromFinal');
                    this.taskToDelete.name = '';
                    this.taskToDelete.duration = '';


                } else if (this.taskToDelete.name !== ''){

                    // to delete stated task
                    console.log('delete another task');
                    let toDelete = this.taskToDelete.name; // web
                    let arr = this.statedTasks;
                    delete arr['.key'];

                    for (let key in arr) {
                        if(arr[key] == toDelete) {
                            db.ref('stated-data/tasks/' + key).remove();
                        }
                    }

                    this.taskToDelete.name = '';

                }
            }

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
                let tasks = this.tasks;

                delete this.todo['.key'];
                // take every task from stated tasks
                for (let key in tasks) {

                    let totalHours = 0;
                    let task = tasks[key];

                    // check every to-do object in DB, take needed hours for a current task
                    for (let key in this.todo) {
                        if ((this.todo[key].name == task) && (this.todo[key].month == this.selectedMonth) ) {
                            totalHours += this.todo[key].duration;
                        }
                        // put task: total time in the common object
                        result[task] = totalHours;
                    }
                    arr.push(task + ': ' + totalHours + 'h');
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

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        margin-left: 10px;

    }
    .row-group {
        display: flex;
        flex-direction: row;
    }

    .column-group {
        flex-direction: column;
        display: flex;
    }

    .time,
    .results,
    .tasks,
    .new-task {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;

        border: 1px solid black;
        border-radius: 3px;
        padding: 4px 4px 8px;
        min-width: 140px;
        width: auto;
        max-width: 100%;
        flex-grow: 0;


        min-height: 30px;
        height: auto;
        margin: 0 5px 10px;
    }

    .results {
        flex-direction: column;
        align-items: flex-start;
    }


    .tasks,
    .time,
    .delete,
    .new-task {
        max-width: 240px;
    }

    input {
        width: 100%;
        height: 100%;
        font-size: 18px;
        outline: none;
    }

    .new-task {
        padding: 4px 10px 8px;
    }
</style>