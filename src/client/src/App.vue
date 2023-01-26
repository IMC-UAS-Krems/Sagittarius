<template>
  <div id="nav" v-if="$store.state.user.isOk">
    <div>
      <img class="logo" src="./banner.svg"/>
    </div>
    <div id="nav-left" class="logo">
      <ul>
        <router-link to="/"><li>Home</li></router-link>
        <router-link to="/about"><li>About</li></router-link>
        <router-link to="/editor"><li>Editor</li></router-link>
      </ul>
    </div>
    <div style="cursor: pointer" id="nav-right" class="noselect">
      <ul>
        <li @click="$store.dispatch('logout')">Logout</li>
      </ul>
    </div>
  </div>
  <router-view />
</template>

<script lang="ts">
import { onBeforeMount } from "vue";
import { useStore } from "vuex";
import router from "./router";
import { User } from ".prisma/client";
import { Result } from "sagittarius-server/src/utils/result";

export default {
  setup() {
    const store = useStore<{ user: Result<User> }>();

    onBeforeMount(() => {
      if (store.state.user.isErr) {
        router.push("/login");
      } else {
        router.push("/");
      }
    });
  },
};
</script>
<style>
@import "./app.css";
</style>
