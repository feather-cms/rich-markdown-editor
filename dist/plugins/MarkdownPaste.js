"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prosemirror_state_1 = require("prosemirror-state");
const prosemirror_commands_1 = require("prosemirror-commands");
const Extension_1 = __importDefault(require("../lib/Extension"));
const isUrl_1 = __importDefault(require("../lib/isUrl"));
class MarkdownPaste extends Extension_1.default {
    get name() {
        return "markdown-paste";
    }
    get plugins() {
        return [
            new prosemirror_state_1.Plugin({
                props: {
                    handlePaste: (view, event) => {
                        if (!view.props.editable)
                            return;
                        const text = event.clipboardData.getData("text/plain");
                        const html = event.clipboardData.getData("text/html");
                        const { state, dispatch } = view;
                        if (isUrl_1.default(text)) {
                            if (!state.selection.empty) {
                                prosemirror_commands_1.toggleMark(this.editor.schema.marks.link, { href: text })(state, dispatch);
                                return true;
                            }
                            const component = this.editor.props.getLinkComponent(text);
                            if (component) {
                                this.editor.commands.embed({
                                    href: text,
                                    component,
                                });
                                return true;
                            }
                        }
                        if (text.length === 0 || html)
                            return false;
                        event.preventDefault();
                        const paste = this.editor.parser.parse(text);
                        let slice = paste.slice(0);
                        try {
                            if (!slice.content.firstChild.textContent) {
                                slice = slice.removeBetween(0, 2);
                            }
                            else {
                                slice = slice.removeBetween(5, slice.size);
                            }
                        }
                        catch (err) {
                            console.error(err);
                        }
                        const transaction = view.state.tr.replaceSelection(slice);
                        view.dispatch(transaction);
                        return true;
                    },
                },
            }),
        ];
    }
}
exports.default = MarkdownPaste;
//# sourceMappingURL=MarkdownPaste.js.map