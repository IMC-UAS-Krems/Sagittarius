import { Editor } from "@tiptap/vue-3/src/Editor";
import { StarterKit } from "@tiptap/starter-kit/src/starter-kit";
import { Transaction } from "prosemirror-state";

interface EditorOptions {
    editable: boolean;
    placeholder?: string;
    callback?: () => void;
}

export default class TextEditor extends Editor {
    constructor(
        {
            editable,
            placeholder = "<p>I'm running Tiptap with Vue.js. 🎉</p>",
            callback,
        }: EditorOptions,
        ...args: object[]
    ) {
        super({
            content: placeholder,
            extensions: [StarterKit],
            editable: editable,
            onUpdate: (props: { editor: object; transaction: Transaction }) => {
                console.log("TextEditor: onUpdate:", props.editor, props.transaction);
                callback && callback();
            },
            ...args,
        });
    }
}
