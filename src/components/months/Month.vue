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
        background-color:#526e83;
        color: white;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-bottom: 5px;
        height: 40px;
        user-select: none;
        cursor: pointer;
        padding-right: 20px;

    }


    .month:last-child {
    }

    .month:hover {
        background-color: #385368;
    }

    .selected {
        background-color: #ff8789 !important;
    }


</style>