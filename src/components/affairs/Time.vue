<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="time" draggable="true" v-on:drag="display">
        {{ hours + 'h' }}
    </div>
</template>

<script>

    export default {
        name: '',
        data () {
            return {}
        },
        props: ['hours'],
        methods: {
            display: function () {
//                console.log(event.target.innerHTML);
                this.$emit('dragTime', this.getTime);
            }
        },

        computed: {
            getTime :function () {
                return this.hours;
            }
        }
    }
</script>

<style scoped>

    #time {
        display: flex;
        align-items: center;
        justify-content: center;

        width: auto;
        max-width: 200px;

        height: 30px;
        border: 1px solid grey;
        border-radius: 3px;
        background: lightblue;
        margin: 4px 2px 0;
        padding: 0 6px;

        cursor: pointer;
    }
</style>