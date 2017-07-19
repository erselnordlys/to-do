<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="main">

        <!--{{taskTimeReceived}}-->
        <months v-on:changeIt="toggleBool(showMonth)" v-bind:ok="bool"></months>
        <div v-if="!bool">choose the month</div>

        <div @drop="drop" @dragover.prevent>
            <schedule v-bind:ok="bool" v-bind:receiveTaskTime="forScheduleTaskTime"></schedule>
        </div>

        <affairs v-bind:show="bool" v-on:dragTaskTime="saveTaskTime"></affairs>
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

                taskTimeReceived: {},
                forScheduleTaskTime: ''
            }
        },
        props: {
        },
        components: {
            months: months,
            schedule: schedule,
            affairs: Affairs
        },
        methods: {
            toggleBool: function (m) {
                this.bool = true;
            },

            show: function () {
                this.$emit('show')
            },

            saveTaskTime: function (val) {
                this.taskTimeReceived = val;
            },

            drop: function () {
                // use value only with task and time
                if (this.taskTimeReceived.task !== '' && this.taskTimeReceived.time > 0) {
                    this.forScheduleTaskTime = this.taskTimeReceived;
                }
            }
        },
        computed: {
            showMonth: function () {
                return months.data().msg;
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