<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">

    <div class="common">
        <div class="msg">{{ msg }} </div>
        <div class="task-time">
            <div class="res" v-if="vis" draggable="true" v-on:drag="change">{{ myObj.task + ' ' + myObj.time + h}}</div>
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
                clearBtn: 'x'
            }
        },
        props: {
            obj: {},
            show: true
        },

        methods: {
            clearRes: function () {
                this.myObj.task = '';
                this.myObj.time = '';
                this.$emit('clear');
            },

            change: function () {
                this.$emit('dragTaskTime', this.myObj);
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

                if ((this.myObj.time == '' && this.myObj.task == '') || this.myObj == '') {
                    return false;
                } else { return true }
            },

            myObj: function () {
                return this.obj;
            }

        }
    }
</script>

<style scoped>

    .common {
        align-items: flex-start;
        background-color: #fff;
        display: flex;
        flex-direction: row;
        flex-grow: 0;
        flex-wrap: wrap;
        justify-content: center;
        margin: 0 5px 10px 0;
        min-height: 100px;
        min-width: 140px;
        padding: 4px 0 8px;
        width: 100%;
    }

    .task-time {
        align-items: center;
        display: flex;
        justify-content: center;
        position: relative;
        width: 100%;
        margin-bottom: 10px;
    }
    .res {
        align-items: center;
        background: #8ce2d1;
        cursor: pointer;
        display: flex;
        justify-content: center;
        height: 30px;
        margin: 4px 2px 0;
        padding: 0 6px;
        width: auto;
    }

    .clear-btn {
        align-items: center;
        display: flex;
        justify-content: center;
        position: absolute;
        right: 0;
        font-weight: bold;
        cursor: pointer;
        height: 100%;
        width: 20px;
    }

</style>