<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="day"
         @drop="append"
         >
        <div style="display:none">{{vis}}</div>
        <div class="num-of-day" v-bind:class="{ weekend: isWeekend }"> {{dayOfMonth + ' ' + dayOfWeek }}</div>
        <day-task
                class="task"
                v-if="vis"
                v-for="item in renderTask"
                v-bind:tsk="item"
                v-bind:id="getId"
                @dayTaskDrag="change">
        </day-task>


    </div>
</template>

<script>

    import DayTask from './DayTask.vue';

    export default {
        name: 'day',
        data () {
            return {
                constArrayOfTasks: {},
                final: {},
                arr: [1, 2, 3, 4, 5],
                todo: [],
            }
        },
        props: ['dayOfWeek', 'obj', 'dayOfMonth', 'isWeekend', 'sortedTasks', 'taskFromDB', 'selectedMonth'],
        components: {
            'day-task': DayTask,
        },

        methods: {
            append: function () {
                let appended = {};
                // fill tasks from obj
                if ((this.renderObject.task !== '') && (this.renderObject.time !== '')
                    && (this.renderObject.task !== undefined) && (this.renderObject.time !== undefined)) {

                    if (this.constArrayOfTasks[this.renderObject.task] !== undefined) {
                        // summarize stated time
                        this.constArrayOfTasks[this.renderObject.task] += this.renderObject.time;
                        appended[this.renderObject.task] += this.renderObject.time;

                    } else {
                        // give a time value
                        this.constArrayOfTasks[this.renderObject.task] = this.renderObject.time;
                        appended[this.renderObject.task] = this.renderObject.time;
                    }
                }
                this.final = {};
                this.final = this.constArrayOfTasks;

                // send appended tasks to schedule (database)
                this.sendDataToSchedule(appended);
            },

            sendDataToSchedule: function (local) {
                // send data to schedule
                let send = [];
                let day = this.dayOfMonth;
                for (let key in local) {
                    for (let i = 0; i < [this.final].length; i++) {
                        let obj = {};
                        obj.name = key;
                        obj.duration = this.final[key];
                        obj.day = day;
                        send.push(obj);
                    }
                }

                this.$emit('sendDataToSchedule', send);
            },

            change: function (val) {
               let arr = [this.final, this.dayOfMonth];
                this.$emit('change', arr);
            }
        },

        computed: {
            renderObject: function () {
                return this.obj;
            },

            putReceivedDataInDay: function () {
                let tasks = this.sortedTasks;
                let day = this.dayOfMonth;
                this.constArrayOfTasks = {};

                // iterate through task-objects array
                for (let i = 0; i < tasks.length; i++) {

                    // if day of task fits, record it to constArrayOfTasks
                    if (tasks[i].day == day) {
                            this.constArrayOfTasks[tasks[i].name] = tasks[i].duration;
                        }
                }

                // record tasks to final object to render it
                this.final = {};
                return this.final = this.constArrayOfTasks;
            },

            renderTask: function () {
                let arr = [];

                // read from final
                for (let key in this.final) {
                    arr.push(key + ' ' + this.final[key] + 'h');
                }
                return arr;
            },

            vis: function () {
                let data = this.putReceivedDataInDay;
                let task = this.renderTask;
                if ( ((data == undefined) || (data == '') || (data == null) )
                    &&  ( (task == undefined) || (task == '') || (task == null)) ) {
                    return false;
                } else {
                    return true;
                }
            },

            getId: function () {
                let d = new Date();
                let today = d.getDate();
                let month = d.getMonth();

                if ((today > this.dayOfMonth) || (month > this.selectedMonth))  {
                    return 'task'
                } else if ((today == this.dayOfMonth) && (month == this.selectedMonth)) {
                    return 'today'
                } else {
                    return 'plan'
                }
            }
        }
    }


</script>

<style scoped>

    #day {
        width: 100%;
        border-bottom: 1px solid #bebebe;
        color: #595959;
        min-height: 33px;

        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-end;
    }

    #day:last-child {
        border-bottom: none;
    }

    .num-of-day {
        height: 33px;
        width: 60px;

        color: #595959;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-items: flex-end;

        padding: 0 0 0 10px;
    }

    .weekend {
        border-left: 4px solid #d9a4a6;
        width: 56px;
        padding: 0 5px;

    }

    #day .task:last-child {
        margin-right: 10px;
    }

</style>