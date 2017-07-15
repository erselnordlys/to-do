<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="day">
        <!--<button v-on:click="appendDay"> ADD </button>-->

        <num-of-day v-bind:num="num"></num-of-day>
    </div>
</template>

<script>

    import numOfDay from './NumOfDay.vue';
    export default {
        name: '',
        data () {
            return {
                items: []
            }
        },
        props: ['num', 'day-of-week'],
        components: {
            'num-of-day': numOfDay
        },
        methods: {
            appendDay: function () {
                for (var i = 1; i < 4; i++) {
                    this.items.push(i);
                }
            }
        }
    }
</script>

<style scoped>

    #day {
        width: 100%;
        border-bottom: 1px solid grey;
        height: 30px;

        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-items: flex-end;
    }

    #day:last-child {
        border-bottom: none;
    }
</style>