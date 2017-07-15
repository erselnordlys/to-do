<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="year">
        {{ year }}
    </div>
</template>

<script>

    export default {
        name: '',
        data () {
            return {}
        },
        props: ['year'],
        methods: {

            change: function () {
                this.$emit('change');
            }
        }
    }
</script>

<style scoped>

    #year {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid black;
        border-radius: 3px;
        width: 100px;
        height: 40px;

        margin-bottom: 5px;

        user-select: none;
        cursor: pointer;
    }

</style>