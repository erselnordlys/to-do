<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="day"
         @drop="append">
        <div class="num-of-day" v-bind:class="{ weekend: isWeekend }"> {{ dayOfMonth + ' ' + dayOfWeek }}</div>
        <day-task
                v-if="vis"
                class="task"
                v-for="item in renderTask"
                v-bind:tsk="item"
                @dayTaskDrag="change" >
        </day-task>

    </div>
</template>

<script>
    import DayTask from './DayTask.vue';
    import {todoRef} from '../../firebase-module';

    export default {
        name: '',
        data () {
            return {
                tasks: {},
                smth: {},
                arr: [1, 2, 3 ,4, 5],
                vis: false
            }
        },
        props: ['dayOfWeek', 'obj', 'dayOfMonth', 'allDayTasks', 'isWeekend'],
        components: {
            'day-task': DayTask
        },

        methods: {
            append: function () {
                // fill tasks from obj
                if ( (this.renderObject.task !== '') && (this.renderObject.time !== '')
                && (this.renderObject.task !== undefined) && (this.renderObject.time !== undefined)) {

                    if( this.tasks[this.renderObject.task] !== undefined) {
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
                    arr.push(key + ' ' +  this.smth[key] + 'h');
                }
//                var myObject = JSON.parse(this.allDayTasks);
//                console.log(this.allDayTasks);

//                for (var key in this.allDayTasks) {
//
//                    arr.push(myObject.name + ' ' + myObject.duration + 'h');
//                }
                return arr;
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
        font-weight: bold;

    }

    .weekend {
        color: indianred;
    }

</style>