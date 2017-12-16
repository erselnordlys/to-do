<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="auth">

        <input class="email" v-model="email">
        <input class="password" v-model="password">
        <input class="confirm-password" v-model="confirmPassword">
    </div>
</template>

<script>
    import {db} from '../firebase-module';

    export default {
        name: 'Auth',
        data () {
            return {
                email: '',
                password: '',
                confirmPassword: '',
                wantsToSignUp: false,
                errorMessage: ''
            }
        },

        methods: {
            signUpWithPassword() {
                if (this.password === this.confirmPassword) {
                    firebase.auth.createUserWithEmailAndPassword(this.email, this.password)
                        .then(() => this.signInWithPassword())
                        .catch((error) => {
                            this.errorMessage = error.message
                        });
                }
            }
        },

        firebase () {
            return {
                todo: {
                    source: todoRef,
                    asObject: true,
                    cancelCallback: function () {
                        console.log('error')
                    }
                }
            }

        }
    }
</script>

<style scoped>

    #auth {
        background-color: white;
        height: 100%;
        opacity: 0.3;
        width: 100%;
    }
</style>