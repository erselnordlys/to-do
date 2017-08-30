<template>
    <div id="common">
        <div class="logo">
            <h1>TO-DO</h1>
            <h2>2017</h2>
        </div>
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
    #common {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        max-width: 220px;
        min-width: 120px;
    }
    #months {
        margin: 20px 0 10px -20px;
        width: auto;
    }

    .logo {
        align-items: flex-end;
        color: #595959;
        display: flex;
        justify-content: flex-start;
        background-color: #fff;
        flex-direction: column;
        margin-left: -20px;
        padding-right: 20px;
        width: auto;
    }

</style>