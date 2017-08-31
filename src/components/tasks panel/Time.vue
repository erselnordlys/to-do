<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="time">
        <div class="msg">{{msg}}</div><br>
        <div class="hour" v-for="item in durations"  draggable="true" v-on:drag="display(item)">{{ item + 'h' }}</div>
    </div>
</template>

<script>

    export default {
        name: 'time',
        data () {
            return {
                msg: 'How much time did it take?'
            }
        },
        props: ['durations'],
        methods: {
            display: function (time) {
                this.$emit('dragTime', time);
            }
        }
    }
</script>

<style scoped>

    #time {
        align-items: flex-start;
        background-color: #fff;
        display: flex;
        flex-direction: row;
        flex-grow: 0;
        flex-wrap: wrap;
        height: 75px;
        justify-content: center;
        margin: 0 0 10px;
        min-height: 30px;
        min-width: 140px;
        padding: 4px 0 8px;
        width: 100%;
    }

    .msg {
        width: 100%;
    }

    .hour {
        align-items: center;
        background-color: #cef5ed;
        display: flex;
        flex-direction: column;
        height: 30px;
        justify-content: center;
        width: 40px;
        margin: 3px;
    }
</style>