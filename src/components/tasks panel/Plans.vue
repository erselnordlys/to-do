<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="plans">
        <div class="msg">{{planMsg}}</div>
        <div class="plan-name" v-for="item in allPlans">{{item}}</div>

    </div>
</template>

<script>

    export default {
        name: 'plans',
        data () {
            return {
             planMsg: 'Your plans this month:'
            }
        },
        props: ['allPlans']
    }
</script>

<style scoped>

    #plans {
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
        padding: 4px 10px 8px 10px;
        width: 100%;
    }

    .msg {
        width: 100%;
        margin-bottom: 10px;
    }
    .plan-name {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 10px;
        width: 100%;
    }
</style>