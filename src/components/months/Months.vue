<template>
    <div>
        <h1>TO-DO</h1>

        <ul id="months">
            <month v-bind:nam="names[0]" v-on:change="changeIt" v-bind:clicked="ok"></month>
            <month v-bind:nam="names[1]" v-on:change="changeIt" v-bind:clicked="ok"> </month>
            <month v-bind:nam="names[2]" v-on:change="changeIt" v-bind:clicked="ok"></month>
            <month v-bind:nam="names[3]" v-on:change="changeIt" v-bind:clicked="ok"></month>
            <month v-bind:nam="names[4]" v-on:change="changeIt" v-bind:clicked="ok" class="current"></month>
            <month v-bind:nam="names[5]" v-on:change="changeIt" v-bind:clicked="ok"></month>
            <month v-bind:nam="names[6]" v-on:change="changeIt" v-bind:clicked="ok"></month>
            <month v-bind:nam="names[7]" v-on:change="changeIt" v-bind:clicked="ok"></month>
            <month v-bind:nam="names[8]" v-on:change="changeIt" v-bind:clicked="ok"></month>
            <month v-bind:nam="names[9]" v-on:change="changeIt" v-bind:clicked="ok"></month>
            <month v-bind:nam="names[10]" v-on:change="changeIt" v-bind:clicked="ok"></month>
            <month v-bind:nam="names[11]" v-on:change="changeIt" v-bind:clicked="ok"></month>
        </ul>
    </div>
</template>

<script>

    import month from './Month.vue';

    export default {
        name: 'Months',
        data () {
            return {
                msg: 'fff',
                names: {
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
                },
                index: 0
            }
        },
        components: {
            month: month
        },
        props: ['ok', 'nam'],
        methods: {
            changeIt: function () {
                this.$emit('changeIt');
            }
        },
        computed: {
            monthName: function (index) {
                return this.names[index];
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