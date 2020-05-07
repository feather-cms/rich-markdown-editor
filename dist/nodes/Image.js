"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const prosemirror_state_1 = require("prosemirror-state");
const prosemirror_inputrules_1 = require("prosemirror-inputrules");
const styled_components_1 = __importDefault(require("styled-components"));
const react_medium_image_zoom_1 = __importDefault(require("react-medium-image-zoom"));
const getDataTransferFiles_1 = __importDefault(require("../lib/getDataTransferFiles"));
const uploadPlaceholder_1 = __importDefault(require("../lib/uploadPlaceholder"));
const insertFiles_1 = __importDefault(require("../commands/insertFiles"));
const Node_1 = __importDefault(require("./Node"));
const IMAGE_INPUT_REGEX = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;
const uploadPlugin = options => new prosemirror_state_1.Plugin({
    props: {
        handleDOMEvents: {
            paste(view, event) {
                if (!view.props.editable)
                    return false;
                const files = Array.prototype.slice
                    .call(event.clipboardData.items)
                    .map(dt => dt.getAsFile())
                    .filter(file => file);
                if (files.length === 0)
                    return false;
                const { tr } = view.state;
                if (!tr.selection.empty) {
                    tr.deleteSelection();
                }
                const pos = tr.selection.from;
                insertFiles_1.default(view, event, pos, files, options);
                return true;
            },
            drop(view, event) {
                if (!view.props.editable)
                    return false;
                const files = getDataTransferFiles_1.default(event);
                if (files.length === 0)
                    return false;
                const { pos } = view.posAtCoords({
                    left: event.clientX,
                    top: event.clientY,
                });
                insertFiles_1.default(view, event, pos, files, options);
                return true;
            },
        },
    },
});
class Image extends Node_1.default {
    constructor() {
        super(...arguments);
        this.handleKeyDown = event => {
            if (event.key === "Enter") {
                event.preventDefault();
                return;
            }
        };
        this.handleBlur = ({ node, getPos }) => event => {
            const alt = event.target.innerText;
            const src = node.attrs.src;
            if (alt === node.attrs.alt)
                return;
            const { view } = this.editor;
            const { tr } = view.state;
            const pos = getPos();
            const transaction = tr.setNodeMarkup(pos, null, {
                src,
                alt,
            });
            view.dispatch(transaction);
        };
        this.component = options => {
            const { alt, src } = options.node.attrs;
            return (React.createElement("div", { className: "image", contentEditable: false },
                React.createElement(react_medium_image_zoom_1.default, { image: {
                        src,
                        alt,
                        style: {
                            maxWidth: "100%",
                            maxHeight: "75vh",
                        },
                    }, shouldRespectMaxDimension: true }),
                React.createElement(Caption, { onKeyDown: this.handleKeyDown, onBlur: this.handleBlur(options), tabIndex: -1, contentEditable: options.isEditable, suppressContentEditableWarning: true }, alt)));
        };
    }
    get name() {
        return "image";
    }
    get schema() {
        return {
            inline: true,
            attrs: {
                src: {},
                alt: {
                    default: null,
                },
            },
            content: "text*",
            marks: "",
            group: "inline",
            draggable: true,
            parseDOM: [
                {
                    tag: "div[class=image]",
                    getAttrs: (dom) => {
                        const img = dom.getElementsByTagName("img")[0];
                        const caption = dom.getElementsByTagName("p")[0];
                        return {
                            src: img.getAttribute("src"),
                            alt: caption.innerText,
                        };
                    },
                },
            ],
            toDOM: node => {
                return [
                    "div",
                    {
                        class: "image",
                    },
                    ["img", Object.assign(Object.assign({}, node.attrs), { contentEditable: false })],
                    ["p", { class: "caption" }, 0],
                ];
            },
        };
    }
    toMarkdown(state, node) {
        state.write("![" +
            state.esc((node.attrs.alt || "").replace("\n", "") || "") +
            "](" +
            state.esc(node.attrs.src) +
            ")");
    }
    parseMarkdown() {
        return {
            node: "image",
            getAttrs: token => ({
                src: token.attrGet("src"),
                alt: (token.children[0] && token.children[0].content) || null,
            }),
        };
    }
    commands({ type }) {
        return attrs => (state, dispatch) => {
            const { selection } = state;
            const position = selection.$cursor
                ? selection.$cursor.pos
                : selection.$to.pos;
            const node = type.create(attrs);
            const transaction = state.tr.insert(position, node);
            dispatch(transaction);
            return true;
        };
    }
    inputRules({ type }) {
        return [
            new prosemirror_inputrules_1.InputRule(IMAGE_INPUT_REGEX, (state, match, start, end) => {
                const [okay, alt, src] = match;
                const { tr } = state;
                if (okay) {
                    tr.replaceWith(start - 1, end, type.create({
                        src,
                        alt,
                    }));
                }
                return tr;
            }),
        ];
    }
    get plugins() {
        return [uploadPlaceholder_1.default, uploadPlugin(this.options)];
    }
}
exports.default = Image;
const Caption = styled_components_1.default.p `
  border: 0;
  display: block;
  font-size: 13px;
  font-style: italic;
  color: ${props => props.theme.textSecondary};
  padding: 2px 0;
  line-height: 16px;
  text-align: center;
  width: 100%;
  min-height: 1em;
  outline: none;
  background: none;
  resize: none;

  &:empty:not(:focus):before {
    color: ${props => props.theme.placeholder};
    content: "Write a caption";
  }
`;
//# sourceMappingURL=Image.js.map