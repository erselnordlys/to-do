<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="schedule" v-if="vis">
        <day
                v-bind:isWeekend="(item == 'sat') || ( item == 'sun')"
                v-bind:selectedMonth="selectedMonth"
                v-for="(item, index) in daysOfWeek"
                v-bind:dayOfWeek="item"
                v-bind:dayOfMonth="(index + 1)"
                v-bind:obj="receiveTaskTime"
                @change="dragDayTask"
                v-bind:sortedTasks="sortedTasks"
                @sendDataToSchedule="getFromDayAndPushData"
        >
        </day>


    </div>
</template>

<script>
    import Day from './Day.vue';
    import {todoRef} from '../../firebase-module';
    import {counterRef} from '../../firebase-module';


    let main;
    export default main = {
        name: 'Schedule',
        data () {
            return {
                weekDay: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
                startDayOfWeek: [6, 2, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4],
                newTask: {name: '', day: 0, month: 0, duration: 0}
            }
        },

        props: ['vis', 'receiveTaskTime', 'selectedMonth', 'sortedTasks'],

        methods: {
            dragDayTask: function (obj) {
                this.$emit('dragDayTask', obj);
            },

            getFromDayAndPushData: function (arr) {
                console.log(arr);

                for (let i = 0; i < arr.length; i++) {
                    this.newTask.name = arr[i].name;
                    this.newTask.duration = arr[i].duration;
                    this.newTask.month = this.selectedMonth;
                    this.newTask.day = arr[i].day;
                }
                console.log(this.newTask);
                todoRef.push(this.newTask);
            }
        },
        components: {
            day: Day
        },

        computed: {
            daysOfWeek: function () {
                let nums = [];

                // define the length of months
                let lengthOfMonth;
                if ([0, 2, 4, 6, 7, 9, 11].indexOf(this.selectedMonth) >= 0) {
                    lengthOfMonth = 31;
                } else if ([3, 5, 8, 10].indexOf(this.selectedMonth) >= 0) {
                    lengthOfMonth = 30;
                } else if (this.selectedMonth == 1) {
                    lengthOfMonth = 28;
                }

                // append days of week on each
                let j = this.startDayOfWeek[this.selectedMonth];
                for (let i = 0; i < lengthOfMonth; i++) {
                    nums.push(this.weekDay[j]);
                    j++;
                    j = j % this.weekDay.length;
                }

                return nums;
            }
        },

        firebase: {
                todo: {
                    source: todoRef
                }
        }
    }

</script>

<style scoped>

    #schedule {
        height: auto;
        min-height: 558px;
        max-width: 800px;
        width: auto;
        flex-grow: 1;
        min-width: 400px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        border: 1px solid black;
        border-radius: 3px;
    }

    button {
        position: absolute;
        left: 50%;
    }

</style>