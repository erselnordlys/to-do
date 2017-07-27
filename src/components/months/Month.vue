<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div
            v-on:click="selectMonth"
            class="month"
            v-bind:class="{ selected : isSelected}"
    >
        {{ monthsNames[index].toUpperCase()}}
    </div>
</template>

<script>

    import Schedule from '../schedule/Schedule.vue';

    export default {
        name: 'Month',
        data () {
            return {
                monthsNames: {
                    0: 'january',
                    1: 'february',
                    2: 'march',
                    3: 'april',
                    4: 'may',
                    5: 'june',
                    6: 'july',
                    7: 'august',
                    8: 'september',
                    9: 'october',
                    10: 'november',
                    11: 'december'
                }
            }
        },
        props: ['index', 'isSelected'],
        methods: {
            change: function () {
                this.$emit('change');
            },

            selectMonth: function () {
                this.$emit('selectMonth', this.index);
            }
        },

        computed: {}
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
        margin-bottom: 0;
    }

    .month:hover {
        background-color: lightgray;
    }

    .selected {
        background-color: black !important;
        color: white;
    }

</style>