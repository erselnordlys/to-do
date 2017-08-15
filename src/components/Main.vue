<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="main">

        <months
                v-on:change="toggleBool"
                v-on:selectCurrentMonth="saveSelectedMonth"
                v-bind:selectedMonth="selectedMonth"
        >
        </months>

        <div v-if="!bool">choose the month</div>

        <div
                @drop="dropTask"
                @dragover.prevent
                 >

                <schedule
                        @dragDayTask="saveDayTask"
                        v-bind:vis="bool"
                        v-bind:receiveTaskTime="forScheduleTaskTime"
                        v-bind:selectedMonth="selectedMonth"
                        v-bind:sortedTasks="sortedTasks"
                >
                </schedule>

        </div>

        <panel
                v-bind:show="bool"
                v-bind:vals="dropped"
                v-on:dragTaskTime="saveTaskTime"
                v-bind:taskToDelete="renderDayTaskForDelete">
        </panel>
    </div>
</template>

<script>

    import months from './months/Months.vue';
    import schedule from './schedule/Schedule.vue';
    import TasksPanel from './tasks panel/Tasks-Panel.vue';
    import {db} from '../firebase-module';
    import {todoRef} from '../firebase-module';


    let main;
    export default main = {
        name: '',
        data () {
            return {
                bool: true,
                dropped: false,
                taskTimeReceived: {
                    task: '',
                    time: ''
                },
                dayTaskForDelete: {},
                selectedMonth: 3
            }
        },
        props: {
            receivedData: ''
        },
        components: {
            months: months,
            schedule: schedule,
            panel: TasksPanel
        },
        methods: {
            toggleBool: function () {
                this.bool = true;
            },

            saveTaskTime: function (val) {
                this.taskTimeReceived = val;
            },

            dropTask: function () {

               if (this.taskTimeReceived.task !== undefined && this.taskTimeReceived.time !== undefined
                    && this.taskTimeReceived.task !== '' && this.taskTimeReceived.time !== '') {
                   console.log('drop occured');
                   this.dropped = true;
                } else {
                   console.log('error');
                   this.dropped = false;
               }

               console.log(this.dropped);

                this.taskTimeReceived = { task: '', time: ''}
            },

            saveDayTask: function (obj) {
                this.dayTaskForDelete = obj;
            },

            saveSelectedMonth: function (month) {
                this.selectedMonth = month;
                console.log("selected month: " + this.selectedMonth)
            }

        },
        computed: {
            forScheduleTaskTime: function () {
                return this.taskTimeReceived;
            },

            renderDayTaskForDelete: function () {
                return this.dayTaskForDelete;
            },


            sortedTasks: function () {
                let data = this.todo;
                let size = Object.keys(data).length;
                let month = this.selectedMonth;
                let sorted = [];

                for (let key in data) {
                    if (data[key].hasOwnProperty('month')) {

                        let dBMonth = data[key].month;
                        if (dBMonth == month) {
                            let elem = {};
                            elem.name = data[key].name;
                            elem.duration = data[key].duration;
                            elem.month = dBMonth;
                            elem.day = data[key].day;

                            sorted.push(elem);
                        }

                    }
                }

                return sorted;

            }
        },

        firebase () {
            return {
                todo: {
                    source: todoRef,
                    asObject: true,
                    cancelCallback: function () {
                        console.log('error')
                    }
                }
            }

        },
    }

</script>

<style scoped>

    #main {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
</style>