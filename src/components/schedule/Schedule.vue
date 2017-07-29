<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="schedule" v-if="vis">

        <day
                v-bind:selectedMonth="selectedMonth"
                v-bind:isWeekend="(item == 'sat') || ( item == 'sun')"
                v-bind:allDayTasks="wholeData"
                v-for="(item, index) in daysOfWeek"
                v-bind:dayOfWeek="item"
                v-bind:dayOfMonth="(index + 1)"
                v-bind:obj="receiveTaskTime"
                @change="dragDayTask">
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
        methods: {
            dragDayTask: function (obj) {
                this.$emit('dragDayTask', obj);
            }
        },
        components: {
            day: Day
        },
        props: ['vis', 'receiveTaskTime','wholeData', 'selectedMonth'],

        computed: {
            daysOfWeek: function () {
                var nums = [];

                var lengthOfMonth;
                if ( [0, 2, 4, 6, 7, 9, 11].indexOf(this.selectedMonth) >= 0 ) {
                    lengthOfMonth = 31;
                 } else if ([3, 5, 8 , 10].indexOf(this.selectedMonth) >= 0) {
                    lengthOfMonth = 30;
                } else if ( this.selectedMonth == 1 ) {
                    lengthOfMonth = 28;
                }

                var j = 5;
                for (var i = 0; i < lengthOfMonth; i++) {
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