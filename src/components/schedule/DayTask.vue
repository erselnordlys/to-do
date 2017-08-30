<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div draggable="true" @drag="dragged" class="task">
        {{tsk}}
    </div>
</template>

<script>

    export default {
        name: '',
        data () {
            return {}
        },
        props: ['tsk'],

        methods:  {
            dragged: function () {
                this.$emit('dayTaskDrag');

            }
        }
    }
</script>

<style scoped>

    .task {
        display: flex;
        align-items: center;
        justify-content: center;
        width: auto;
        height: 30px;
        border-radius: 3px;
        color: #595959;

        font-size: 15px;
        background: white;
        margin: auto 3px;
        padding: 0 6px;
        cursor: pointer;
    }

    #task {
        background: #c8c8c8;
    }

    #plan {
        height: 25px;
        border: 2px dashed #47d9c4;
    }

    #today {
        background: #c9bade;
    }
</style>