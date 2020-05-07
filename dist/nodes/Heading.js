"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emoji_regex_1 = __importDefault(require("emoji-regex"));
const prosemirror_state_1 = require("prosemirror-state");
const copy_to_clipboard_1 = __importDefault(require("copy-to-clipboard"));
const prosemirror_view_1 = require("prosemirror-view");
const prosemirror_inputrules_1 = require("prosemirror-inputrules");
const prosemirror_commands_1 = require("prosemirror-commands");
const backspaceToParagraph_1 = __importDefault(require("../commands/backspaceToParagraph"));
const toggleBlockType_1 = __importDefault(require("../commands/toggleBlockType"));
const headingToSlug_1 = __importDefault(require("../lib/headingToSlug"));
const Node_1 = __importDefault(require("./Node"));
class Heading extends Node_1.default {
    constructor() {
        super(...arguments);
        this.handleCopyLink = () => {
            return event => {
                const slug = `#${event.target.parentElement.parentElement.name}`;
                copy_to_clipboard_1.default(window.location.href + slug);
                if (this.options.onShowToast) {
                    this.options.onShowToast("Link copied to clipboard");
                }
            };
        };
    }
    get name() {
        return "heading";
    }
    get defaultOptions() {
        return {
            levels: [1, 2, 3, 4],
        };
    }
    get schema() {
        return {
            attrs: {
                level: {
                    default: 1,
                },
            },
            content: "inline*",
            group: "block",
            defining: true,
            draggable: false,
            parseDOM: this.options.levels.map(level => ({
                tag: `h${level}`,
                attrs: { level },
            })),
            toDOM: node => {
                const button = document.createElement("button");
                button.innerText = "#";
                button.type = "button";
                button.className = "heading-anchor";
                button.addEventListener("click", this.handleCopyLink());
                return [
                    `h${node.attrs.level + (this.options.offset || 0)}`,
                    button,
                    ["span", 0],
                ];
            },
        };
    }
    toMarkdown(state, node) {
        state.write(state.repeat("#", node.attrs.level) + " ");
        state.renderInline(node);
        state.closeBlock(node);
    }
    parseMarkdown() {
        return {
            block: "heading",
            getAttrs: (token) => ({
                level: +token.tag.slice(1),
            }),
        };
    }
    commands({ type, schema }) {
        return (attrs) => {
            return toggleBlockType_1.default(type, schema.nodes.paragraph, attrs);
        };
    }
    keys({ type }) {
        const options = this.options.levels.reduce((items, level) => (Object.assign(Object.assign({}, items), {
            [`Shift-Ctrl-${level}`]: prosemirror_commands_1.setBlockType(type, { level }),
        })), {});
        return Object.assign(Object.assign({}, options), { Backspace: backspaceToParagraph_1.default(type) });
    }
    get plugins() {
        return [
            new prosemirror_state_1.Plugin({
                props: {
                    decorations: state => {
                        const { doc } = state;
                        const decorations = [];
                        const index = 0;
                        doc.descendants((node, pos) => {
                            if (node.type.name !== this.name)
                                return;
                            if (node.attrs.level === 1) {
                                const regex = emoji_regex_1.default();
                                const text = node.textContent;
                                const matches = regex.exec(text);
                                const firstEmoji = matches ? matches[0] : null;
                                const startsWithEmoji = firstEmoji && text.startsWith(firstEmoji);
                                decorations.push(prosemirror_view_1.Decoration.node(pos, pos + node.nodeSize, {
                                    class: startsWithEmoji ? "with-emoji" : undefined,
                                }));
                            }
                            decorations.push(prosemirror_view_1.Decoration.node(pos, pos + node.nodeSize, {
                                name: headingToSlug_1.default(node, index),
                                class: "heading-name",
                                nodeName: "a",
                            }));
                        });
                        return prosemirror_view_1.DecorationSet.create(doc, decorations);
                    },
                },
            }),
        ];
    }
    inputRules({ type }) {
        return this.options.levels.map(level => prosemirror_inputrules_1.textblockTypeInputRule(new RegExp(`^(#{1,${level}})\\s$`), type, () => ({
            level,
        })));
    }
}
exports.default = Heading;
//# sourceMappingURL=Heading.js.map