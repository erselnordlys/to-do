<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="schedule" v-if="vis">
        <!--{{receiveTaskTime}}-->
        <day
                v-for="(item, index) in numbers"
                v-bind:days="item"
                v-bind:index="(index +1)"
                v-bind:obj="receiveTaskTime">
        </day>

    </div>
</template>

<script>
    import Day from './Day.vue';

    export default {
        name: 'Schedule',
        data () {
            return {
                weekDay: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
            }
        },
        methods: {},
        components: {
            day: Day
        },
        props: ['vis', 'receiveTaskTime'],

        computed: {
            numbers: function () {
                var nums = [];
                var j = 5;
                for (var i = 1; i < 32; i++) {
                    nums.push(this.weekDay[j]);
                    j++;
                    j = j % this.weekDay.length;
                }
                return nums;
            }
        }
    }
</script>

<style scoped>

    #schedule {
        height: auto;
        min-height: 558px;
        max-width: 800px;
        width: auto;
        flex-grow: 1;
        min-width: 400px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        border: 1px solid black;
        border-radius: 3px;
    }

    button {
        position: absolute;
        left: 50%;
    }

</style>