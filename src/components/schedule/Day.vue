<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="day" @drop="append">
        <div class="num-of-day"> {{ index + days }}</div>
        <day-task v-if="vis" class="task" v-for="item in renderTask" v-bind:tsk="item"></day-task>

    </div>
</template>

<script>
    import DayTask from './DayTask.vue';
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
        props: ['days', 'obj', 'index'],
        components: {
            'day-task': DayTask
        },

        methods: {
            append: function () {
                console.log(this.renderObject);

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

        padding-left: 10px;
    }
</style>