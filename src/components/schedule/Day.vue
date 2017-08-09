<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="day"
         @drop="append"
         >

        {{vis}}
        <!--{{putReceivedDataInDay}}-->
        <div class="num-of-day" v-bind:class="{ weekend: isWeekend }"> {{ dayOfMonth + ' ' + dayOfWeek }}</div>
        <day-task
                v-if="vis"
                class="task"
                v-for="item in renderTask"
                v-bind:tsk="item"
                @dayTaskDrag="change">
        </day-task>


        <!--v-for="item in renderTask"-->

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
//                vis: true,
                todo: [],
                x: ''
            }
        },
        props: ['dayOfWeek', 'obj', 'dayOfMonth', 'isWeekend', 'sortedTasks', 'taskFromDB'],
        components: {
            'day-task': DayTask
        },

        methods: {
            append: function () {
                // fill tasks from obj
                if ((this.renderObject.task !== '') && (this.renderObject.time !== '')
                    && (this.renderObject.task !== undefined) && (this.renderObject.time !== undefined)) {

                    if (this.constArrayOfTasks[this.renderObject.task] !== undefined) {
                        // summarize stated time
                        this.constArrayOfTasks[this.renderObject.task] += this.renderObject.time;
                    } else {
                        // give a time value
                        this.constArrayOfTasks[this.renderObject.task] = this.renderObject.time;
                    }
//                    this.vis = true;
                }


                this.final = {};
                this.final = this.constArrayOfTasks;
                console.log(this.dayOfMonth);
                console.log(this.constArrayOfTasks);

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

            putReceivedDataInDay: function () {
                let tasks = this.sortedTasks;
                let day = this.dayOfMonth;
                for (let key in tasks) {
                    if (tasks[key].day == day) {

                        if (this.constArrayOfTasks[tasks[key].name] !== undefined) {
                            // summarize stated time
                            this.constArrayOfTasks[tasks[key].name] += tasks[key].duration;
                        } else {
                            // give a time value
                            this.constArrayOfTasks[tasks[key].name] = tasks[key].duration;
                        }

                        this.final = {};
                       return this.final = this.constArrayOfTasks;
//                        return this.final[tasks[key].name] = tasks[key].duration;
                    }
                }
            },

            renderTask: function () {
                let arr = [];

                // read from final
                for (let key in this.final) {
                    console.log('push');
                    arr.push(key + ' ' + this.final[key] + 'h');
                }

                    console.log(this.final);
                        return arr;
            },

            vis: function () {
                let data = this.putReceivedDataInDay;
                let task = this.renderTask;
                console.log(task);
                if ( ((data == undefined) || (data == '') || (data == null) )
                    &&  ( (task == undefined) || (task == '') || (task == null)) ) {
                    console.log('it will be false');
                    return false;
                } else {
                    console.log('it will be true');

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