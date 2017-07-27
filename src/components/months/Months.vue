<template>
    <div>
        <h1>TO-DO</h1>

        <ul id="months">
            <month 
                    v-for="index in 12"
                    v-bind:index="index - 1"
                    v-on:selectMonth="selectCurrentMonth"
                    v-bind:isSelected="index - 1 == selectedMonth"
            >
            </month>

        </ul>
    </div>
</template>

<script>


    import month from './Month.vue';

    export default {
        name: 'Months',
        data () {
            return {
                bool: false
            }
        },
        components: {
            month: month
        },
        props: ['ok', 'nam', 'selectedMonth'],
        methods: {
            selectCurrentMonth: function (month) {
                this.$emit('selectCurrentMonth', month)
            }
        },
        computed: {
            curMonth: function () {
                return a;
            }
        }
    }

</script>

<style scoped>
    #months {
        margin: 0 10px;
    }

    .current {
        background-color: lightgray;
    }


</style>