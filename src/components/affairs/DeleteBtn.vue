<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div>
        {{msgMain}}
        <div id="delete">{{ msg }}</div>

    </div>
</template>

<script>

    export default {
        name: '',
        data () {
            return {
                msgMain:'Drag here to delete',
                msg: 'x'
            }
        }
    }
</script>

<style scoped>

    #delete {
        background: indianred;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 34px;

        flex-direction: row;
        flex-wrap: wrap;

        border: 1px solid black;
        border-radius: 3px;
        padding: 4px 4px 8px;
        min-width: 140px;
        width: auto;
        max-width: 100%;
        flex-grow: 0;


        min-height: 30px;
        margin: 0 5px 10px;

    }
</style>