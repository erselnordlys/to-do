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
    import {db} from '../../firebase-module';


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
            dragDayTask: function (arr) {

                let pass = {
                    name: '',
                    duration: 0,
                    day: arr[1],
                    month: this.selectedMonth
                };

                for (let key in arr[0]) {
                    pass.name = key;
                    pass.duration = arr[0][key];
                }
                this.$emit('dragDayTask', pass);
            },

            getFromDayAndPushData: function (arr) {

                // if received arr is not empty
                if (arr[0] !== undefined) {

                    //gather new task
                    this.newTask.name = arr[0].name;
                    this.newTask.duration = arr[0].duration;
                    this.newTask.month = this.selectedMonth;
                    this.newTask.day = arr[0].day;

                    let child = '';

                    // founding requested task in db
                    for (let key in this.todo) {

                        // if task already exists and should be updated
                        if ((this.todo[key].day == arr[0].day) && (this.todo[key].name == arr[0].name)) {
                            child = this.todo[key]['.key'];
                            db.ref('todo/' + child).set(this.newTask);
                        }
                    }

                    // if new task should be crated
                    if (child == '') {
                        todoRef.push(this.newTask);
                    }
                }
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

        firebase () {
                return {
                    todo: {
                        source: todoRef
                    }
                }
        }
    }

</script>

<style scoped>

    #schedule {
        background-color: #fff;
        color: #9e9e9e;
        width: 100%;
        min-width: 400px;

        height: 700px;
        max-height: 90%;
        min-height: 600px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        overflow: scroll;
    }

    button {
        position: absolute;
        left: 50%;
    }

</style>