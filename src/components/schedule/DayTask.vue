<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="task" draggable="true" @drag="dragged">
        {{tsk}}
    </div>
</template>

<script>

    export default {
        name: '',
        data () {
            return {}
        },
        props: ['tsk'],

        methods:  {
            dragged: function () {
                this.$emit('dayTaskDrag');

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
        border-radius: 3px;
        background: lightgray;
        margin: auto 3px;
        padding: 0 6px;

        cursor: pointer;
    }
</style>