<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="day" @drop="msg">
        <div class="num-of-day"> {{ index + days}}</div>
    </div>
</template>

<script>

    export default {
        name: '',
        data () {
            return {
            }
        },
        props: ['days', 'obj', 'index'],
        components: {
        },
        methods: {
            pass: function () {
                this.$emit('pass');
            },
            msg: function () {
                console.log('msg');
            }
        },

        computed: {}
    }
</script>

<style scoped>

    #day {
        width: 100%;
        border-bottom: 1px solid grey;
        height: 30px;

        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-items: flex-end;

        background: wheat;
    }

    #day:last-child {
        border-bottom: none;
    }

    .num-of-day {
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