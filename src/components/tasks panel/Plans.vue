<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="plans">
        {{planName}}
    </div>
</template>

<script>

    export default {
        name: 'plans',
        props: ['planName']
    }
</script>

<style scoped>

    #plans {
        display: flex;
        flex-direction: column;
        justify-content: center;

        width: auto;
        height: 30px;
        border-radius: 3px;
        margin: 4px 2px 0;
        padding: 0 6px;

        cursor: pointer;
    }
</style>