<template>
    <div>
        <h1>TO-DO</h1>
        <h2>2017</h2>
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
    import {counterRef} from '../../firebase-module';

    var main;
    export default main = {
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
            },

            onError: function () {
                console.log('sss')
            }
        },
        computed: {
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