<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div id="app">
	<!--<h1>TO-DO</h1>-->

	<my-main></my-main>
  </div>
</template>

<script>
    import Main from './components/Main.vue';

    export default {
        name: 'app',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        components: {
            'my-main': Main
        }
    }
</script>

<style>

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
        align-items: center;
        width: 100%;

	}

	h1, h2 {
		font-weight: normal;
        margin: 0 0 10px;
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
