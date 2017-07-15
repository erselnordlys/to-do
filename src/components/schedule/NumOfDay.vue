<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="num">
    {{ num }}
    </div>
</template>

<script>

    export default {
        name: '',
        data () {
            return {
            }
        },
        methods: {},
        props: ['num']
    }
</script>

<style scoped>
    #num {
        height: 30px;
        width: 60px;
        background: whitesmoke;

        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-items: flex-end;

        padding-left: 10px;
    }
</style>