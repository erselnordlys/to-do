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
                        v-bind:wholeData="receivedData"
                        v-bind:receiveTaskTime="forScheduleTaskTime"
                        v-bind:selectedMonth="selectedMonth"
                >
                </schedule>
        </div>

        <affairs
                v-bind:show="bool"
                v-bind:vals="dropped"
                v-on:dragTaskTime="saveTaskTime"
                v-bind:deleteDT="renderDayTaskForDelete">
        </affairs>
    </div>
</template>

<script>

    import months from './months/Months.vue';
    import schedule from './schedule/Schedule.vue';
    import Affairs from './affairs/Affairs.vue';

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

                selectedMonth: 6
            }
        },
        props: {
            receivedData: ''
        },
        components: {
            months: months,
            schedule: schedule,
            affairs: Affairs
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
//                console.log(this.renderDayTaskForDelete);

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
            }
        }
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