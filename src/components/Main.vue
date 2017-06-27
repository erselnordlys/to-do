<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="main">
        <years></years>
        <months v-on:changeIt="toggleBool(showMonth)" v-bind:ok="bool"></months>
        <schedule v-bind:ok="bool"></schedule>
    </div>
</template>

<script>

    import months from './Months.vue';
    import schedule from './Schedule.vue';
    import Years from './Years.vue';

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
            years: Years,
        },
        methods: {
            toggleBool: function (m) {
                this.bool = true;
                console.log(m);
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