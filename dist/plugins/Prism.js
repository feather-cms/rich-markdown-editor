"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("refractor/core"));
const lodash_1 = require("lodash");
const prosemirror_state_1 = require("prosemirror-state");
const prosemirror_view_1 = require("prosemirror-view");
const prosemirror_utils_1 = require("prosemirror-utils");
function getDecorations({ doc, name }) {
    const decorations = [];
    const blocks = prosemirror_utils_1.findBlockNodes(doc).filter(item => item.node.type.name === name);
    function parseNodes(nodes, className = []) {
        return nodes.map(node => {
            const classes = [
                ...className,
                ...(node.properties ? node.properties.className : []),
            ];
            if (node.children) {
                return parseNodes(node.children, classes);
            }
            return {
                text: node.value,
                classes,
            };
        });
    }
    blocks.forEach(block => {
        let startPos = block.pos + 1;
        const language = block.node.attrs.language;
        if (!language || language === "none")
            return;
        const nodes = core_1.default.highlight(block.node.textContent, language);
        lodash_1.flattenDeep(parseNodes(nodes))
            .map(node => {
            const from = startPos;
            const to = from + node.text.length;
            startPos = to;
            return Object.assign(Object.assign({}, node), { from,
                to });
        })
            .forEach(node => {
            const decoration = prosemirror_view_1.Decoration.inline(node.from, node.to, {
                class: (node.classes || []).join(" "),
            });
            decorations.push(decoration);
        });
    });
    return prosemirror_view_1.DecorationSet.create(doc, decorations);
}
function Prism({ name, deferred = true }) {
    return new prosemirror_state_1.Plugin({
        key: new prosemirror_state_1.PluginKey("prism"),
        state: {
            init: (_, { doc }) => {
                if (deferred)
                    return;
                return getDecorations({ doc, name });
            },
            apply: (transaction, decorationSet, oldState, state) => {
                const deferredInit = !decorationSet;
                const nodeName = state.selection.$head.parent.type.name;
                const previousNodeName = oldState.selection.$head.parent.type.name;
                const codeBlockChanged = transaction.docChanged && [nodeName, previousNodeName].includes(name);
                if (deferredInit || codeBlockChanged) {
                    return getDecorations({ doc: transaction.doc, name });
                }
                return decorationSet.map(transaction.mapping, transaction.doc);
            },
        },
        props: {
            decorations(state) {
                return this.getState(state);
            },
        },
    });
}
exports.default = Prism;
//# sourceMappingURL=Prism.js.map