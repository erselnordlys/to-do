<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="month" v-bind:class="nam" v-on:click="change">
        {{ nam.toUpperCase() }}
        <!--{{clicked}}-->
    </div>
</template>

<script>

    import Schedule from './Schedule.vue';

    export default {
        name: 'Month',
        data () {
            return {
            }
        },
        props: ['nam', 'clicked'],
        methods: {

            change: function () {
                this.$emit('change');
            }
        }
    }
</script>

<style scoped>
    .month {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid black;
        border-radius: 3px;
        width: 100px;
        height: 40px;

        margin-bottom: 5px;

        user-select: none;
        cursor: pointer;
    }
    .month:last-child {
        margin-bottom: 0px;
    }
</style>