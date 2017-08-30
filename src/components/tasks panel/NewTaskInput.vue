<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="newTask">
        <div class="msg">{{msg}}</div>
        <input
                v-model="newTaskLine"
                v-on:keyup.enter="addNewTask"
        />
    </div>
</template>

<script>

    import {db} from '../../firebase-module';

    export default {
        name: 'newTaskInput',
        data () {
            return {
                newTaskLine: '',
                msg: 'Add a new task in list:'
            }
        },
        methods: {
            addNewTask: function() {
                if (this.newTaskLine.length > 0) {
                    db.ref('stated-data/tasks').push(this.newTaskLine.toLowerCase());
                    this.newTaskLine = '';
                }
            }
        }
    }
</script>

<style scoped>

    #newTask {
        background-color: #fff;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        flex-wrap: wrap;
        min-width: 140px;
        width: auto;
        max-width: 100%;
        flex-grow: 1;

        min-height: 30px;
        height: auto;
        margin: 0 5px 10px;
    }

    .msg {
        width: 100%;
    }

    input {
        align-items: flex-start;
        background-color: #e6e5c9;
        border: none;
        color: #595959;
        display: flex;
        flex-direction: column;
        font-size: 18px;
        outline: none;
        justify-content: center;
        margin: 3px;
        padding: 5px 10px;
        width: 100%;
    }
</style>