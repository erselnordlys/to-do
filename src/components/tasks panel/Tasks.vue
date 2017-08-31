<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="task">
        <div class="msg">{{msg}}</div>
        <div class="task-name" v-for="(item, index) in tasks"  draggable="true" v-on:drag="drag(item)">{{item}}</div>
    </div>
</template>

<script>

    export default {
        name: 'tasks',
        data () {
            return {
                smth: this.task,
                msg: 'What are your tasks?'
            }
        },
        props: ['tasks'],
        methods: {

            drag: function (task) {
                this.$emit('dragTask', task);
            }
        }
    }
</script>

<style scoped>

    #task {
        align-items: flex-start;
        background-color: #fff;
        display: flex;
        flex-direction: row;
        flex-grow: 0;
        flex-wrap: wrap;
        height: auto;
        justify-content: center;
        margin: 0 0 10px;
        max-width: 100%;
        min-height: 30px;
        min-width: 140px;
        padding: 4px 10px 8px;
        width: auto;
    }

    .msg {
        width: 100%;
    }

    .task-name {
        align-items: flex-start;
        background-color: #c8bed1;
        display: flex;
        flex-direction: column;
        height: 30px;
        justify-content: center;
        margin: 3px;
        padding: 0 10px;
        width: auto;
    }

</style>