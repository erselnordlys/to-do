<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="affairs" v-if="show">


        <div class="row-group">

            {{ passTaskTime}}

            <!--new task drag, tasks list-->
            <div class="column-group">

                <!--drag block for new tasks-->
                <div @drop="drop" @dragover.prevent>
                    <task-time v-bind:vis="clearResults" v-bind:obj="results" v-on:clear="clearResults" @dragTaskTime="getPreparedObj"></task-time>
                </div>

                <!--tasks list-->
                <div class="tasks__msg">{{ msgTasks }}
                    <div class="tasks">
                        <task v-for="item in onTasks" @dragTask="getTask" v-bind:task="item" id="task"></task>
                    </div>
                </div>

            </div>

            <!--time, new task, delete-->
            <div class="column-group">

                <!--time list-->
                <div class="time__msg">{{ msgTime }}
                    <div class="time">
                        <duration @dragTime="getTime" v-for="item in time" v-bind:hours="item"></duration>
                    </div>
                </div>

                <!--new task input-->
                <div class="new-task__msg" > {{ msgNewTask}}
                    <input class="new-task" v-model="newTaskLine" v-on:keyup.enter="addNewTask"/>
                </div>

                <!--delete btn-->
                <div @drop="deleteTask" @dragover.prevent>
                    <del-block></del-block>
                </div>

            </div>

        </div>

        <!--results-->
        <div class="results__msg"> {{ msgResults }}
            <div class="results">
                <res v-for="item in onTasks" v-bind:resName="item"></res>
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


    export default {
        name: 'Affairs',
        data () {
            return {
                msgNewTask: 'Add a new task in list:',
                msgTaskTime: 'Drag a new task here',
                msgTasks: 'What are your tasks?',
                msgTime: 'How much time did it take?',
                msgResults: 'Your results this month',
                msgDelete: 'Delete task',

                tasks: {
                    sports: 'sports',
                    web: 'web',
                    study: 'study',
                    'day-off': 'day-off',
                    household: 'household',
                    therapy: 'therapy',
                    exams: 'exams',
                    bureaucratic: 'bureaucratic',
                    French: 'French',
                    diploma: 'diploma'
                },
                time: {
                    halfHour: 0.5,
                    hour: 1,
                    twoHours: 2,
                    threeHours: 3
                },
                res: {task: '', time: ''},
                temp: {task: '', time: ''},
                prepObj: '',
                newTaskLine: '',
                deleteDT: {},
                deleteDayTaskTemp: {}
            }
        },
        props: ['show', 'task', 'passTaskTime', 'vals'],
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
            },

            getTask: function (val) {
                // add chosen task to temp map
                this.temp.task = val;
                this.temp.time = '';

            },

            getTime: function (val) {
                // add chosen time to temp map
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

                if (this.newTaskLine.length > 0) {

                    //push new key-value to tasks
                    this.tasks[this.newTaskLine] = this.newTaskLine;
                    this.newTaskLine = '';
                }
            },

            deleteTask: function () {
                if(this.renderdeleteDTTemp == {}) {
                    var newObj = this.tasks;
                    this.tasks = {};

                    delete newObj[this.temp.task]; // таск который удаляется в этот момент

                    for (var key in newObj) {
                        this.tasks[key] = key;
                    }
                    // delete task from task-time block if dragged
                    if (this.temp.task == this.res.task)  {
                        this.res.task = '';
                        this.res.time = '';
                    }
                    this.temp.task = '';

                } else {
                    // delete daytask

                    this.renderdeleteDTTemp = this.deleteDT;
//                    this.deleteDT = {};

                    console.log(this.deleteDT);

//                delete this.deleteDayTaskTemp[val];
                }


            }

        },

        computed: {
            results: function () {
                return this.res;
            },

            onTasks: function () {
                return this.tasks;
            },

            renderdeleteDTTemp: function () {
                return this.deleteDayTaskTemp;
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
        /*padding: 0 20px;*/
        font-size: 18px;
        outline: none;
    }

    .new-task {
        padding: 4px 10px 8px;
    }
</style>