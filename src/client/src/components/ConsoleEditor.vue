<template>
    <editor-content :editor="editor" />
</template>

<script lang="ts" setup>
import { EditorContent } from "@tiptap/vue-3/src/EditorContent";
import TextEditor from "../models/TextEditor";

const editor = new TextEditor({
    editable: false,
    placeholder: "[DEMO]: Sample execution output.",
});
</script>
