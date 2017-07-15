<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="years">
        <year v-bind:year="yearsMap[2018]"></year>
        <year v-bind:year="yearsMap[2017]"></year>
        <year v-bind:year="yearsMap[2016]"></year>
    </div>
</template>

<script>

    import Year from './Year.vue';

    export default {
        name: '',
        data () {
            return {
                yearsMap: {
                    '2016': 2016,
                    '2017': 2017,
                    '2018': 2018
                }
            }
        },
        components: {
            year: Year
        }
    }
</script>

<style>

</style>