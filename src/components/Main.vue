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
                    console.log('all term go well');
                } else {
                   console.log('error');
               }
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