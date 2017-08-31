<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="delete">
        <div class="msg">{{ msg }}</div>
        <div class="button">{{symbol}}</div>

    </div>
</template>

<script>

    export default {
        name: '',
        data () {
            return {
                msg:'Drag here to delete',
                symbol: 'x'
            }
        }
    }
</script>

<style scoped>

    #delete {
        background-color: #fff;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        flex-wrap: wrap;
        min-width: 140px;
        max-width: 100%;
        flex-grow: 1;

        min-height: 30px;
        height: auto;
        /*margin: 0 5px 10px;*/
        width: 100%;
    }

    .msg {
        height: 30px;
        width: 100%;
    }

    .button {
        align-items: center;
        background-color: #e7767d;
        display: flex;
        justify-content: center;
        height: 50px;
        width: 100%;
    }
</style>