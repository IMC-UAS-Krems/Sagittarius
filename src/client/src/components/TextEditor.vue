<template>
  <codemirror
    v-model="code"
    placeholder="Code goes here..."
    :autofocus="true"
    :style="{ 'font-size': '16px' }"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    @ready="log('ready', $event)"
    @change="log($event)"
    @focus="log('focus', $event)"
    @blur="log('blur', $event)"
  />
  <div id="nav">
    <div id="nav-left">
      <ul>
        <li @click="save">Save</li>
        <li @click="copy">Copy</li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
function save() {
  console.log("Text saved.");
}
function copy() {
  console.log("Coppied.");
}
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorSelection } from "@codemirror/state";
import { compile } from "../compile/compile";

export default {
  components: {
    Codemirror,
  },
  setup() {
    const code = `console.log('Hello, world!')`;
    const extensions = [javascript(), oneDark];
    return {
      code,
      extensions,
      // log: (...args: any[]) => {
      //   const [first, rest] = args;
      //   console.log(first);
      //   compile(rest);
      // },
      log: console.log,
      save,
      copy,
    };
  },
};
</script>
<style>
@import "./Editor.css";
</style>
