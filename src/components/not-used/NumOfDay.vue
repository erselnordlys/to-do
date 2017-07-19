<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="num">
        <div class="num">{{ num }}
        </div>

        <div class="task">
        </div>
    </div>
</template>

<script>

    export default {
        name: '',
        data () {
            return {
            }
        },
        methods: {
            get: function () {
                this.$emit('get');
                console.log('get');
            }
        },
        props: ['num', 'task']
    }
</script>

<style scoped>
    .num {
        height: 30px;
        width: 60px;
        background: whitesmoke;

        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-items: flex-end;

        padding-left: 10px;
    }

    .task {
        width: 60px;
    }
</style>