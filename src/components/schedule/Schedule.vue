<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="schedule" v-if="ok">
        <day v-for="item in buildItems" v-bind:num="item">{{ }}</day>
    </div>
</template>

<script>
    import Day from './Day.vue';
    import Month from '../months/Month.vue';

    export default {
        name: 'Schedule',
        data () {
            return {
                items: [],
                numbers: [],
                daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
        }

        },
        methods: {},
        components: {
            day: Day
        },
        props: ['ok'],

        computed: {
            buildItems: function () {

                // add day number
                for (var i = 1; i < 32; i++) {
                    this.numbers.push(i);
                }

                var i = 0;
                var j = 0;

                // add days of week
                while (i < 31) {
                    j = j % this.daysOfWeek.length;

                    this.items.push(this.numbers[i] + this.daysOfWeek[j]);
                    i++;
                    j++;
                }

                return this.items;
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
        flex-grow: 0;
        min-width: 300px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        /*margin: 0 10px 0 0;*/

        border: 1px solid black;
        border-radius: 3px;
    }

    button {
        position: absolute;
        left: 50%;
    }

</style>