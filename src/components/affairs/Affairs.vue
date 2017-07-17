<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="affairs" v-if="show">


        <div class="row-group">

            <!--new task drag, tasks list-->
            <div class="column-group">

                <!--drag block for new tasks-->
                <div @drop="drop" @dragover.prevent><task-time v-bind:obj="results" v-on:clear="clearResults"></task-time></div>

                <!--tasks list-->
                <div class="tasks__msg">{{ msgTasks }}
                    <div class="tasks">
                        <task v-for="item in onTasks" @dragTask="getTask" v-bind:task="item"></task>
                    </div>
                </div>

            </div>

            <!--time, new task, delete-->
            <div class="column-group">

                <!--time list-->
                <div class="time__msg">{{ msgTime }}
                    <div class="time">
                        <duration @dragTime="getTime" v-bind:hours="time.halfHour"></duration>
                        <duration @dragTime="getTime" v-bind:hours="time.hour"></duration>
                        <duration @dragTime="getTime" v-bind:hours="time.twoHours"></duration>
                        <duration @dragTime="getTime" v-bind:hours="time.threeHours"></duration>
                    </div>
                </div>

                <!--new task input-->
                <div class="new-task__msg" > {{ msgNewTask}} {{newTaskLine}}
                    <input class="new-task" v-model="newTaskLine" v-on:keyup.enter="addNewTask"/>
                </div>

                <!--delete task-->
                <div class="archive__msg">{{msgAchv}}
                    <div class="archive">X</div>
                </div>

            </div>

        </div>

        <!--results-->
        <div class="results__msg"> {{ msgResults }}
            <div class="results">
                <res v-bind:resName="tasks.sport"></res>
                <res v-bind:resName="tasks.web"></res>
                <res v-bind:resName="tasks.study"></res>
                <res v-bind:resName="tasks.household"></res>
                <res v-bind:resName="tasks.therapy"></res>
                <res v-bind:resName="tasks.dayOff"></res>
                <res v-bind:resName="tasks.exams"></res>
                <res v-bind:resName="tasks.diploma"></res>
                <res v-bind:resName="tasks.bureaucratic"></res>
            </div>
        </div>

    </div>
</template>

<script>

    import Task from './Task.vue';
    import Time from './Time.vue';
    import Res from './Results.vue';
    import TaskTime from  './TaskTime.vue';


    export default {
        name: 'Affairs',
        data () {
            return {
                msgNewTask: 'Add a new task in list:',
                msgTaskTime: 'Drag a new task here',
                msgChosenDay: 'Choose the day',
                msgTasks: 'What are your tasks?',
                msgTime: 'How much time did it take?',
                msgResults: 'Your results this month',
                msgAchv: 'Delete task',
                tasks: {
                    sport: 'sports',
                    web: 'web',
                    study: 'study',
                    dayOff: 'day-off',
                    household: 'household',
                    therapy: 'therapy',
                    exams: 'exams',
                    bureaucratic: 'bureaucratic',
                    diploma: 'diploma'
                },
                time: {
                    halfHour: 0.5,
                    hour: 1,
                    halfAndHour: 1.5,
                    twoHours: 2,
                    threeHours: 3
                },
                res: {task: '', time: ''},
                temp: {task: '', time: ''},
                clearBtn: 'x',
                h: '',
                vis: false,
                newTaskLine: ''
            }
        },
        props: ['show', 'task'],
        components: {
            task: Task,
            duration: Time,
            res: Res,
            'task-time': TaskTime
        },
        methods: {
            drop: function () {
                // add values to results when dropped
                this.res.task = this.temp.task;
                if (this.temp.time !== '') {
                    this.res.time = Number(this.res.time);
                    this.res.time += Number(this.temp.time);
                }

                this.temp.time = '';

//                console.log('temp: ' + this.temp.task + this.temp.time);
//                console.log('res: ' + this.res.task + this.res.time);
            },

            getTask: function (val) {
                // add chosen task to temp map
                this.temp.task = val;
            },

            getTime: function (val) {
                // add chosen time to temp map
                this.temp.time = val;
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

        },

        computed: {
            results: function () {
                return this.res;
            },

            listTasks: function () {
                var arr = [];

                for (var key in this.tasks) {
                    arr.push(this.tasks[key]);
                }
                return arr;
            },

            onTasks: function () {
                return this.tasks;
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
    .archive,
    .tasks,
    .new-task,
    .task-time,
    .drag{
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
    .archive,
    .new-task {
        max-width: 240px;
    }


    .archive {
        background: indianred;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 4px;
        height: 34px;
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

    .task-time {
        height: 36px;
        border-color: green;
        min-width: 40px;
        width: auto;
        position: relative;

    }

    .res {
        display: flex;
        flex-direction: row;
        justify-content: center;

        margin: 4px 2px 0;
        padding: 0 6px;

        cursor: pointer;
    }

    .clear-btn {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        right: 0;
        top: 0;
        
        font-weight: bold;
        cursor: pointer;
        height: 100%;
        width: 20px;
    }

</style>