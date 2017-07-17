<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="main">

        <months v-on:changeIt="toggleBool(showMonth)" v-bind:ok="bool"></months>
        <div v-if="!bool">choose the month</div>
        <schedule v-bind:ok="bool"></schedule>
        <affairs v-bind:show="bool"></affairs>
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
                bool: false
            }
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