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
const react_dom_1 = __importDefault(require("react-dom"));
const styled_components_1 = require("styled-components");
const theme_1 = require("../theme");
class ComponentView {
    constructor(component, { editor, extension, node, view, getPos, decorations }) {
        this.isSelected = false;
        this.component = component;
        this.editor = editor;
        this.extension = extension;
        this.getPos = getPos;
        this.decorations = decorations;
        this.node = node;
        this.view = view;
        this.containerElement = node.type.spec.inline
            ? document.createElement("span")
            : document.createElement("div");
        this.contentElement = node.type.spec.inline
            ? document.createElement("span")
            : document.createElement("div");
        this.renderElement();
        this.dom = this.containerElement;
        this.contentDOM = this.contentElement;
    }
    renderElement() {
        const { dark } = this.editor.props;
        const theme = this.editor.props.theme || (dark ? theme_1.dark : theme_1.light);
        const children = this.component({
            theme,
            node: this.node,
            isSelected: this.isSelected,
            isEditable: this.view.editable,
            getPos: this.getPos,
            innerRef: node => {
                if (node && this.contentDOM && !node.contains(this.contentDOM)) {
                    node.appendChild(this.contentDOM);
                }
            },
        });
        react_dom_1.default.render(React.createElement(styled_components_1.ThemeProvider, { theme: theme }, children), this.containerElement);
    }
    update(node) {
        if (node.type !== this.node.type) {
            return false;
        }
        this.node = node;
        this.renderElement();
        return true;
    }
    selectNode() {
        if (this.view.editable) {
            this.isSelected = true;
            this.renderElement();
        }
    }
    deselectNode() {
        if (this.view.editable) {
            this.isSelected = false;
            this.renderElement();
        }
    }
    stopEvent() {
        return true;
    }
    destroy() {
        react_dom_1.default.unmountComponentAtNode(this.containerElement);
        this.containerElement = null;
        this.contentElement = null;
    }
    ignoreMutation() {
        return true;
    }
}
exports.default = ComponentView;
//# sourceMappingURL=ComponentView.js.map