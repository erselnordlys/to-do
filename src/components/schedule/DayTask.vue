<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="task">
        {{tsk}}
    </div>
</template>

<script>

    export default {
        name: '',
        data () {
            return {}
        },
        props: ['tsk']
    }
</script>

<style scoped>

    #task {
        display: flex;
        align-items: center;
        justify-content: center;

        width: auto;
        /*max-width: 200px;*/

        height: 30px;
        /*border: 1px solid grey;*/
        border-radius: 3px;
        background: wheat;
        margin: auto 3px;
        padding: 0 6px;

        cursor: pointer;
    }
</style>