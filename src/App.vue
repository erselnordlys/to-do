<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="app">

        <my-main v-bind:receivedData="todo"></my-main>
    </div>
</template>

<script>



    import {todoRef} from './firebase-module';

    import Main from './components/Main.vue';

    export default {
        name: 'app',
        data () {
            return {
                todo: []
            }
        },
        components: {
            'my-main': Main
        },
        firebase: {
            todo: {
                source: todoRef.orderByChild('duration'),
                cancelCallback (err) {
                    console.log(err)
                }
            }
        },

        computed: {
            task: function () {
                return this.todo;
            }
        }
    }

</script>

<style>
    html,
    body {
        background-color: #efefef;
        height: 100%;
        margin-bottom: 0;
        max-height: 100%;
        overflow: hidden;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: auto;
        max-height: 100%;
        align-items: center;
        width: 100%;
    }

    h1, h2 {
        font-weight: normal;
        margin: 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>