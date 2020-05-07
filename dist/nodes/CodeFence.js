"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("refractor/core"));
const bash_1 = __importDefault(require("refractor/lang/bash"));
const css_1 = __importDefault(require("refractor/lang/css"));
const clike_1 = __importDefault(require("refractor/lang/clike"));
const csharp_1 = __importDefault(require("refractor/lang/csharp"));
const java_1 = __importDefault(require("refractor/lang/java"));
const javascript_1 = __importDefault(require("refractor/lang/javascript"));
const json_1 = __importDefault(require("refractor/lang/json"));
const markup_1 = __importDefault(require("refractor/lang/markup"));
const php_1 = __importDefault(require("refractor/lang/php"));
const python_1 = __importDefault(require("refractor/lang/python"));
const powershell_1 = __importDefault(require("refractor/lang/powershell"));
const ruby_1 = __importDefault(require("refractor/lang/ruby"));
const typescript_1 = __importDefault(require("refractor/lang/typescript"));
const prosemirror_commands_1 = require("prosemirror-commands");
const prosemirror_inputrules_1 = require("prosemirror-inputrules");
const copy_to_clipboard_1 = __importDefault(require("copy-to-clipboard"));
const Prism_1 = __importDefault(require("../plugins/Prism"));
const Node_1 = __importDefault(require("./Node"));
class CodeBlock extends Node_1.default {
    constructor() {
        super();
        this.handleLanguageChange = event => {
            const { view } = this.editor;
            const { tr } = view.state;
            const element = event.target;
            const { top, left } = element.getBoundingClientRect();
            const result = view.posAtCoords({ top, left });
            const transaction = tr.setNodeMarkup(result.inside, null, {
                language: element.value,
            });
            view.dispatch(transaction);
        };
        [
            bash_1.default,
            css_1.default,
            clike_1.default,
            csharp_1.default,
            java_1.default,
            javascript_1.default,
            json_1.default,
            markup_1.default,
            php_1.default,
            python_1.default,
            powershell_1.default,
            ruby_1.default,
            typescript_1.default,
        ].forEach(core_1.default.register);
    }
    get languageOptions() {
        return Object.entries({
            none: "None",
            bash: "Bash",
            css: "CSS",
            clike: "C",
            csharp: "C#",
            markup: "HTML",
            java: "Java",
            javascript: "JavaScript",
            json: "JSON",
            php: "PHP",
            powershell: "Powershell",
            python: "Python",
            ruby: "Ruby",
            typescript: "TypeScript",
        });
    }
    get name() {
        return "code_fence";
    }
    get schema() {
        return {
            attrs: {
                language: {
                    default: "javascript",
                },
            },
            content: "text*",
            marks: "",
            group: "block",
            code: true,
            defining: true,
            draggable: false,
            parseDOM: [{ tag: "pre", preserveWhitespace: "full" }],
            toDOM: node => {
                const button = document.createElement("button");
                button.innerText = "Copy";
                button.type = "button";
                button.addEventListener("click", this.handleCopyToClipboard(node));
                const select = document.createElement("select");
                select.addEventListener("change", this.handleLanguageChange);
                this.languageOptions.forEach(([key, label]) => {
                    const option = document.createElement("option");
                    const value = key === "none" ? "" : key;
                    option.value = value;
                    option.innerText = label;
                    option.selected = node.attrs.language === value;
                    select.appendChild(option);
                });
                return [
                    "div",
                    { class: "code-block" },
                    ["div", { contentEditable: false }, select, button],
                    ["pre", ["code", { spellCheck: false }, 0]],
                ];
            },
        };
    }
    commands({ type }) {
        return () => prosemirror_commands_1.setBlockType(type);
    }
    keys({ type }) {
        return {
            "Shift-Ctrl-\\": prosemirror_commands_1.setBlockType(type),
        };
    }
    handleCopyToClipboard(node) {
        return () => {
            copy_to_clipboard_1.default(node.textContent);
        };
    }
    get plugins() {
        return [Prism_1.default({ name: this.name })];
    }
    inputRules({ type }) {
        return [prosemirror_inputrules_1.textblockTypeInputRule(/^```$/, type)];
    }
    toMarkdown(state, node) {
        state.write("```" + (node.attrs.language || "") + "\n");
        state.text(node.textContent, false);
        state.ensureNewLine();
        state.write("```");
        state.closeBlock(node);
    }
    get markdownToken() {
        return "fence";
    }
    parseMarkdown() {
        return {
            block: "code_block",
            getAttrs: tok => ({ language: tok.info }),
        };
    }
}
exports.default = CodeBlock;
//# sourceMappingURL=CodeFence.js.map