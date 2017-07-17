<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">

        <div> {{ msg }}
            <div id="task-time">
                <div class="res" v-if="vis" draggable="true">{{ obj.task + ' ' + obj.time + h}}</div>
                <div class="clear-btn" v-if="vis" v-on:click="clearRes">{{ clearBtn }}</div>
            </div>
        </div>
</template>

<script>

    export default {
        name: '',
        data () {
            return {
                msg: 'Drag a new task here',
                clearBtn: 'x',
            }
        },
        props: ['obj'],

        methods: {

            // clear results by click on btn
            clearRes: function () {
                // hide clear btn
                this.obj.task = '';
                this.obj.time = '';

                this.$emit('clear');
            }
        },

        computed: {
            // show/hide h-letter
            h: function () {
                if (this.obj.time == '') {
                    return '';
                } else { return 'h'}
            },

            // show/hide clear button
            vis: function () {
                if (this.obj.time == '' && this.obj.task == '') {
                    return false;
                } else { return true}
            }
        }
    }
</script>

<style scoped>

    #task-time {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;

        border: 1px solid black;
        border-radius: 3px;
        padding: 4px 4px 8px;
        min-width: 140px;
        width: auto;
        max-width: 100%;
        flex-grow: 0;


        min-height: 30px;
        height: 36px;
        margin: 0 5px 10px;

        position: relative;
    }

    .res {
        display: flex;
        align-items: center;
        justify-content: center;

        width: auto;
        max-width: 200px;

        height: 30px;
        border: 1px solid grey;
        border-radius: 3px;
        background: #d4fac1;
        margin: 4px 2px 0;
        padding: 0 6px;

        cursor: pointer;
    }

    .clear-btn {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        right: 0;
        top: 0;

        font-weight: bold;
        cursor: pointer;
        height: 100%;
        width: 20px;
    }

</style>