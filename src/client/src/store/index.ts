import { createStore } from "vuex";
import router from "../router";
import swal from "sweetalert";
import { login, register, logout, Credentials } from "../auth/authenticate";
import { User } from ".prisma/client";
import { Result, Err, Ok } from "sagittarius-server/src/utils/result";

export default createStore<{
  user: Result<User>;
}>({
  state: {
    user: Err(new Error("Not logged in")),
  },
  getters: {},
  mutations: {
    SET_USER(state, user: User) {
      state.user = Ok(user);
    },

    CLEAR_USER(state) {
      state.user = Err(new Error("Not logged in"));
    },
  },
  actions: {
    async login({ commit }, details: Credentials) {
      const { email, password } = details;

      const user = await login({ email, password });

      if (user.isErr) {
        swal("Error", user.error.message, "error");
        return;
      }

      commit("SET_USER", user.value);

      router.push("/");
    },

    async register({ commit }, details) {
      const { email, password } = details;

      const user = await register({ email, password });

      if (user.isErr) {
        swal("Error", user.error.message, "error");
        return;
      }

      commit("SET_USER", user.value);

      router.push("/");
    },

    async logout({ commit }) {
      await logout();

      commit("CLEAR_USER");

      router.push("/login");
    },

    fetchUser({ commit }) {
      // if
      // auth.onAuthStateChanged(async (user) => {
      //   if (user === null) {
      //     commit("CLEAR_USER");
      //   } else {
      //     commit("SET_USER", user);
      //
      //     if (router.currentRoute.value.path === "/login") {
      //       router.push("/");
      //     }
      //   }
      // });
      // if (user.isErr)
    },
  },
  modules: {},
});
