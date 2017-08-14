<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="day"
         @drop="append"
         >

        <div style="display:none">{{vis}}</div>
        <div class="num-of-day" v-bind:class="{ weekend: isWeekend }"> {{ dayOfMonth + ' ' + dayOfWeek }}</div>
        <day-task
                v-if="vis"
                class="task"
                v-for="item in renderTask"
                v-bind:tsk="item"
                @dayTaskDrag="change">
        </day-task>


    </div>
</template>

<script>

    import DayTask from './DayTask.vue';

    let main;
    export default main = {
        name: '',
        data () {
            return {
                constArrayOfTasks: {},
                final: {},
                arr: [1, 2, 3, 4, 5],
                todo: []
            }
        },
        props: ['dayOfWeek', 'obj', 'dayOfMonth', 'isWeekend', 'sortedTasks', 'taskFromDB'],
        components: {
            'day-task': DayTask
        },

        methods: {
            append: function () {
                let appended ={};
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
                let obj = {'val': val, 'arr': this.renderTask};
                this.$emit('change', obj);
            }

        },

        computed: {
            renderObject: function () {
                return this.obj;
            },

            putReceivedDataInDay: function () {
                let tasks = this.sortedTasks;
                let day = this.dayOfMonth;

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
            }
        }
    }


</script>

<style scoped>

    #day {
        width: 100%;
        border-bottom: 1px solid grey;
        height: 36px;

        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-items: flex-end;
    }

    .hovered {
        outline: dashed;
    }

    #day:last-child {
        border-bottom: none;
    }

    .num-of-day {
        height: inherit;
        width: 60px;
        background: whitesmoke;

        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-items: flex-end;

        padding: 0 5px;
        /*font-weight: bold;*/

    }

    .weekend {
        color: indianred;
    }

</style>