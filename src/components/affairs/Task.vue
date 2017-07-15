<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="task" draggable="true" v-on:drag="display">
        {{task}}
    </div>
</template>

<script>

    export default {
        name: '',
        data () {
            return {
                smth: this.task
            }
        },
        props: {
            task: String
        },
        methods: {
            drag: function (ev) {
                ev.dataTransfer.setData("text", ev.target.innerHTML);
                console.log('dragged' + ev.target.innerHTML);
            },

            display: function () {
//                console.log(event.target.innerHTML);
                this.$emit('dragTask', this.getTask);
            }
        },

        computed: {
            getTask :function () {
                return this.task;
            }
        }
    }
</script>

<style scoped>

    #task {
        display: flex;
        align-items: center;
        justify-content: center;

        width: auto;
        height: 30px;
        border: 1px solid grey;
        border-radius: 3px;
        background: lightpink;
        margin: 4px 2px 0;
        padding: 0 6px;

        cursor: pointer;
    }
</style>