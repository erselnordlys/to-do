<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="main">

        <!--{{taskTimeReceived}}-->
        <months
                v-on:changeIt="toggleBool"
                v-bind:ok="bool">
        </months>

        <div v-if="!bool">choose the month</div>

        <div
                @drop="dropTask"
                @dragover.prevent>

                <schedule
                        v-bind:vis="bool"
                        v-bind:receiveTaskTime="forScheduleTaskTime">
                </schedule>
        </div>

        <affairs
                v-bind:show="bool"
                v-bind:vals="dropped"
                v-on:dragTaskTime="saveTaskTime">
        </affairs>
    </div>
</template>

<script>

//    v-bind:receiveTaskTime="taskTimeForSchedule"

    import months from './months/Months.vue';
    import schedule from './schedule/Schedule.vue';
    import Affairs from './affairs/Affairs.vue';

    export default {
        name: '',
        data () {
            return {
                bool: false,
                dropped: true,
                taskTimeReceived: {
                    task: '',
                    time: ''
                }
            }
        },
        props: {},
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
                   this.dropped = false;
                } else {
                   console.log('error');
                   this.dropped = true;
               }

               console.log(this.dropped);

                this.taskTimeReceived = { task: '', time: ''}
            },

            alert: function () {
                console.log('drop');
            }
        },
        computed: {
            showMonth: function () {
                return months.data().msg;
            },

            forScheduleTaskTime: function () {
                return this.taskTimeReceived;
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