<template>
  <div id="nav">
    <div id="nav-left">
      <ul>
        <li class="noselect" @click="save">Save</li>
        <li class="noselect" @click="copy">Copy</li>
        <li class="noselect" @click="compile">Compile</li>
      </ul>
    </div>
  </div>
  <section class="basic-grid spaced">
    <div style="width: 25%" class="card">
      Smart Services Tulln<br /><br />
      &nbsp;&nbsp;&nbsp;&nbsp;Infrastructure<br /><br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Water<br /><br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Energy<br /><br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Environment<br /><br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Waste
      management<br /><br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Transportation<br /><br />
      &nbsp;&nbsp;&nbsp;&nbsp;Planning services<br /><br />
      &nbsp;&nbsp;&nbsp;&nbsp;Human services<br /><br />
      &nbsp;&nbsp;&nbsp;&nbsp;Business<br />
    </div>
    <div style="width: 50%; overflow: hidden" class="card">
      <codemirror
        v-model="code"
        placeholder="Code goes here..."
        :style="{ height: '80vh;', fontSize: '16pt' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="4"
        :extensions="extensions"
        @ready="ignore('ready', $event)"
        @change="change($event)"
        @focus="ignore('focus', $event)"
        @blur="ignore('blur', $event)"
      />
    </div>
    <div style="width: 25%" class="card">
      Inputs<br /><br />
      Outputs<br /><br />
      Deployments<br /><br />
      &nbsp;&nbsp;&nbsp;&nbsp;productDeployment<br /><br />
      &nbsp;&nbsp;&nbsp;&nbsp;testDeployment<br /><br />
    </div>
  </section>
</template>
<script lang="ts">
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDarkTheme } from "@codemirror/theme-one-dark";
import { compile } from "../compile/compile";
import { ref } from "vue";
import { ignore } from "../utils/ignore";
import { saveAs } from "file-saver";
// import { EditorSelection } from "@codemirror/state";
export default {
  components: {
    Codemirror,
  },
  setup() {
    const code = ref("");
    const extensions = [oneDarkTheme];
    return {
      /// Data
      code,
      extensions,
      /// Reactive Components
      change: (val: string) => {
        code.value = val;
      },
      /// Button Methods
      log: console.log,
      ignore: ignore,
      save: () => {
        console.log("Saved");
      },
      copy: () => {
        console.log("Copied");
      },
      compile: async () => {
        const result = await compile(code.value);
        if (result.isErr) {
          // Handle failure
          console.log(result.error);
        } else {
          // Handle success
          var blob = new Blob([result.value], {
            type: "text/plain;charset=utf-8;",
          });
          saveAs(blob, "output.py");
        }
      },
    };
  },
};
</script>
<style>
@import "./Editor.css";
</style>
