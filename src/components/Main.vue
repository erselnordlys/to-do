<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="main">
        {{orderedData}}
        <div style="display:none;">{{thisMonth}}</div>
        <months
                v-on:change="toggleBool"
                v-on:selectCurrentMonth="saveSelectedMonth"
                v-bind:selectedMonth="selectedMonth"
        >
        </months>

        <div v-if="!bool">choose the month</div>

        <div class="schedule"
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
                @changeDropped="dropIsFalse"
                v-bind:selectedMonth="selectedMonth"
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


    export default {
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
                selectedMonth: 0
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
                   this.dropped = true;
                } else {
                   this.dropped = false;
               }
                this.taskTimeReceived = { task: '', time: ''}
            },

            dropIsFalse: function () {
                this.dropped = false;
            },

            saveDayTask: function (obj) {
                this.dayTaskForDelete = obj;
            },

            saveSelectedMonth: function (month) {
                this.selectedMonth = month;
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
                            elem.name = data[key].name.toLowerCase();
                            elem.duration = data[key].duration;
                            elem.month = dBMonth;
                            elem.day = data[key].day;

                            sorted.push(elem);
                        }

                    }
                }

                return sorted;

            },

            orderedData: function () {
                let todo = this.todo;
                delete todo['.key'];
                for (let key in todo) {
                }
            },

            thisMonth: function () {
                let d = new Date();
                console.log(d.getMonth());
                return this.selectedMonth = d.getMonth();
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

        }
    }

</script>

<style scoped>

    #main {
        background: #efefef;
        color: #9e9e9e;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: row;
        width: 100%;
        height: 100%;
    }

    .schedule {
        max-width: 800px;
        display: flex;
        flex-grow: 1;

        min-width: 400px;
        width: auto;
        margin-left: 20px;
    }

</style>