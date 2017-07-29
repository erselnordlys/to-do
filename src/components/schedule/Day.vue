<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="day"
         @drop="append">
        <div class="num-of-day" v-bind:class="{ weekend: isWeekend }"> {{ dayOfMonth + ' ' + dayOfWeek }}</div>
        <day-task
                v-if="vis"
                class="task"
                v-for="item in renderTask"
                v-bind:tsk="item"
                @dayTaskDrag="change">
        </day-task>

        <!--{{ startAtDate }} | {{ endAtDate }}-->
        <div v-for="item in todo">{{item.date}}</div>
    </div>
</template>

<script>

    import DayTask from './DayTask.vue';
    import {todoRef} from '../../firebase-module';
    import {firebase} from '../../firebase-module';

    console.log(firebase);

    export default {
        name: '',
        data () {
            return {
                tasks: {},
                smth: {},
                arr: [1, 2, 3, 4, 5],
                vis: false,
                todo: []
            }
        },
        props: ['dayOfWeek', 'obj', 'dayOfMonth', 'allDayTasks', 'isWeekend', 'selectedMonth'],
        components: {
            'day-task': DayTask
        },

        methods: {
            append: function () {
                // fill tasks from obj
                if ((this.renderObject.task !== '') && (this.renderObject.time !== '')
                    && (this.renderObject.task !== undefined) && (this.renderObject.time !== undefined)) {

                    if (this.tasks[this.renderObject.task] !== undefined) {
                        // summarize stated time
                        this.tasks[this.renderObject.task] += this.renderObject.time;
                    } else {
                        // give a time value
                        this.tasks[this.renderObject.task] = this.renderObject.time;
                    }
                    this.vis = true;
                }


                this.smth = {};
                this.smth = this.tasks;
                console.log(this.tasks);

                console.log(this.renderTask);
            },

            change: function (val) {
                var obj = {'val': val, 'arr': this.renderTask};
                this.$emit('change', obj);
            }
        },

        computed: {
            renderObject: function () {
                return this.obj;
            },

            renderTask: function () {
                var arr = [];

                for (var key in this.smth) {
                    arr.push(key + ' ' + this.smth[key] + 'h');
                    return arr;
                }

            },

            startAtDate: function () {
                // january is 01
                if (this.selectedMonth < 9) {
                    return ('2017-0' + (this.selectedMonth + 1) + '-01');
                } else if (this.selectedMonth >= 9) {
                    return ('2017-' + (this.selectedMonth + 1) + '-01');
                }
            },
            endAtDate: function () {
                if (this.selectedMonth < 8) {
                    return ('2017-0' + (this.selectedMonth + 1) + '-31');
                } else if (this.selectedMonth == 11) {
                    return '2017-12-31';
                } else if (this.selectedMonth >= 8) {
                    return ('2017-' + (this.selectedMonth + 1) + '-31');
                }

            }
        }
        ,
        firebase: function () {
            return {
                todo: {
                    source: todoRef.orderByChild('date').startAt(this.startAtDate).endAt(this.endAtDate),
                    cancelCallback (err) {
                        console.log(err)
                    }
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