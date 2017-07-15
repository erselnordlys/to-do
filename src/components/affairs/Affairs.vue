<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="affairs" v-if="show">


        <div class="row-group">

        <!--chose the day, list tasks-->
            <div class="column-group">

                <div> {{ msgTaskTime}}
                    <div class="task-time" @dragover.prevent @drop="drop">
                        <div class="res">{{ res.task + ' ' + res.time}}
                        </div>
                        <div class="clear-btn" v-on:click="clearRes"> {{ clearBtn }}</div>

                    </div>
                </div>


                <div class="tasks__msg">{{ msgTasks }}
                    <div  class="tasks">
                        <task @dragTask="getTask" v-bind:task="tasks.sport"></task>
                        <task @dragTask="getTask" v-bind:task="tasks.web"></task>
                        <task @dragTask="getTask" v-bind:task="tasks.study"></task>
                        <task @dragTask="getTask" v-bind:task="tasks.household"></task>
                        <task @dragTask="getTask" v-bind:task="tasks.therapy"></task>
                        <task @dragTask="getTask" v-bind:task="tasks.dayOff"></task>
                        <task @dragTask="getTask" v-bind:task="tasks.exams"></task>
                        <task @dragTask="getTask" v-bind:task="tasks.diploma"></task>
                        <task @dragTask="getTask" v-bind:task="tasks.bureaucratic"></task>

                    </div>
                </div>

            </div>

            <!--time, new task, archive-->
            <div class="column-group">
                <div class="time__msg">{{ msgTime }}
                    <div class="time">
                        <duration @dragTime="getTime" v-bind:hours="time.halfHour"></duration>
                        <duration @dragTime="getTime" v-bind:hours="time.hour"></duration>
                        <duration @dragTime="getTime" v-bind:hours="time.halfAndHour"></duration>
                        <duration @dragTime="getTime" v-bind:hours="time.twoHours"></duration>
                        <duration @dragTime="getTime" v-bind:hours="time.threeHours"></duration>
                    </div>
                </div>



                <div class="new-task__msg"> {{ msgNewTask}}
                    <div class="new-task"><input></div>
                </div>

                <div class="archive__msg">{{msgAchv}}
                    <div class="archive"> X </div>
                </div>

            </div>



        </div>


        <div class="results__msg"> {{ msgResults }}</div>
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
</template>

<script>

    import Task from './Task.vue';
    import Time from './Time.vue';
    import Res from './Results.vue';
    import Choose from './ChooseTheDay.vue';

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
                msgAchv: 'Send task to archive',
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
                    halfHour: '0,5h',
                    hour: '1h',
                    halfAndHour: '1,5h',
                    twoHours: '2h',
                    threeHours:'3h'
                },
                results: {},
                res: {task: '', time: ''},
                temp: {task: '', time: ''},
                clearBtn: ''
            }
        },
        props: ['show', 'task'],
        components: {
            task: Task,
            duration: Time,
            res: Res,
            choose: Choose
        },
        methods: {
            drop: function () {
                console.log(this.temp);
                this.res.task = this.temp.task;
                this.res.time = this.temp.time;
                console.log(this.res);

                this.clearBtn = 'x';
            },

            getTask: function (val) {
                this.temp.task = val;
                console.log(val);
            },

            getTime: function (val) {
                this.temp.time = val;
                console.log(val);
            },
            clearRes: function () {
                this.res = {task: '', time: ''};
                this.clearBtn = '';
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

    .new-task > input {
        width: 100%;
        height: 100%;
        padding: 0 10px;
        font-size: 18px;
        outline: none;
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