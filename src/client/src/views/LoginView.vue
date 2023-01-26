<template>
  <main class="login">
    <section class="forms">
      <!-- 	Register form is disabled for the moment, 
					accounts will be created manually from the Firebase console
					[TODO]: Maybe a CLI app to create new accounts?
			-->
      <!--
				<form class="register" @submit.prevent="register">
				<h2>Register</h2>
				<input 
					type="email" 
					placeholder="Email"
					v-model="register_form.email" />
				<input 
					type="password" 
					placeholder="Password" 
					v-model="register_form.password" />
				<input 
					type="submit" 
					value="Register" />
			</form>
			-->
      <form class="login" @submit.prevent="login">
        <h2>
          <img style="width: 400px;  margin-top: -7%; -webkit-user-drag: none" src="./banner.svg">
        </h2>
        <input type="email" placeholder="Email" v-model="login_form.email" />
        <input
          type="password"
          placeholder="Password"
          v-model="login_form.password"
        />
        <p class="login-error-msg"></p>
        <input type="submit" value="Login" />
      </form>
    </section>
  </main>
</template>

<script lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const login_form = ref({});
    const register_form = ref({});
    const store = useStore();

    const login = () => {
      store.dispatch("login", login_form.value);
    };

    const register = () => {
      store.dispatch("register", register_form.value);
    };

    return {
      login_form,
      register_form,
      login,
      register,
    };
  },
};
</script>

<style>
/*.logo-wrapper {
  background: transparent url(./LogoCompleto_Blu.svg) no-repeat center center;
}*/

.error-msg {
  display: block;
  margin-bottom: 1rem;
  color: #c41616;
}

.forms {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #dadada;
  display: flex;
  min-height: 100vh;
}

form {
  flex: 1 1 0%;
  padding: 8rem 1rem 1rem;
}

form.register {
  color: #fff;
  background-color: rgb(245, 66, 101);
  background-image: linear-gradient(
    to bottom right,
    rgb(245, 66, 101) 0%,
    rgb(189, 28, 60) 100%
  );
}

h2 {
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 4rem;
}

input {
  appearance: none;
  border: none;
  outline: none;
  background: none;

  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-size: 19px;
  margin-bottom: 2rem;
  padding: 0.5rem 0rem;
  transition: 0.5s;
}

input:hover {
  font-size: 18px;
}

input:not([type="submit"]) {
  opacity: 0.8;
  transition: 0.4s;
}

input:focus:not([type="submit"]) {
  opacity: 1;
}

input::placeholder {
  color: inherit;
}

form.register input:not([type="submit"]) {
  color: #020205;
  border-bottom: 1px solid #020205;
}

form.login input:not([type="submit"]) {
  color: #dadada;
  border-bottom: 1px solid #dadada;
}

form.login input[type="submit"] {
  border-color: #020205;
  background-color: #fafafa;
  color: #020205;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.4rem;
  cursor: pointer;
  text-transform: uppercase;
  transition: 0.2s;
}
form.login input[type="submit"]:hover {
  background-color: #020205;
  color: #fafafa;
}

form.register input[type="submit"] {
  background-color: #fafafa;
  color: rgb(245, 66, 101);
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
}
</style>
