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
const react_portal_1 = require("react-portal");
const styled_components_1 = __importDefault(require("styled-components"));
const lodash_1 = require("lodash");
const tableCol_1 = __importDefault(require("../menus/tableCol"));
const tableRow_1 = __importDefault(require("../menus/tableRow"));
const table_1 = __importDefault(require("../menus/table"));
const formatting_1 = __importDefault(require("../menus/formatting"));
const LinkEditor_1 = __importDefault(require("./LinkEditor"));
const Menu_1 = __importDefault(require("./Menu"));
const isMarkActive_1 = __importDefault(require("../queries/isMarkActive"));
const getMarkRange_1 = __importDefault(require("../queries/getMarkRange"));
const isNodeActive_1 = __importDefault(require("../queries/isNodeActive"));
const getColumnIndex_1 = __importDefault(require("../queries/getColumnIndex"));
const getRowIndex_1 = __importDefault(require("../queries/getRowIndex"));
const SSR = typeof window === "undefined";
const menuRef = React.createRef();
function calculatePosition(props) {
    const { view } = props;
    const { selection } = view.state;
    if (!selection ||
        !menuRef.current ||
        selection.empty ||
        selection.node ||
        SSR) {
        return {
            left: -1000,
            top: 0,
            offset: 0,
        };
    }
    const startPos = view.coordsAtPos(selection.$from.pos);
    const endPos = view.coordsAtPos(selection.$to.pos);
    const isColSelection = selection.isColSelection && selection.isColSelection();
    const isRowSelection = selection.isRowSelection && selection.isRowSelection();
    if (isRowSelection) {
        endPos.left = startPos.left + 12;
    }
    else if (isColSelection) {
        const { node: element } = view.domAtPos(selection.$from.pos);
        const { width } = element.getBoundingClientRect();
        endPos.left = startPos.left + width;
    }
    const halfSelection = Math.abs(endPos.left - startPos.left) / 2;
    const centerOfSelection = startPos.left + halfSelection;
    const { offsetWidth, offsetHeight } = menuRef.current;
    const margin = 12;
    const left = Math.min(window.innerWidth - offsetWidth - margin, Math.max(margin, centerOfSelection - offsetWidth / 2));
    const top = Math.min(window.innerHeight - offsetHeight - margin, Math.max(margin, startPos.top - offsetHeight));
    const offset = left - (centerOfSelection - offsetWidth / 2);
    return {
        left: left + window.scrollX,
        top: top + window.scrollY,
        offset,
    };
}
class FloatingToolbar extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            left: 0,
            top: 0,
            offset: 0,
        };
    }
    componentDidUpdate() {
        const newState = calculatePosition(this.props);
        if (!lodash_1.isEqual(newState, this.state)) {
            this.setState(newState);
        }
    }
    componentDidMount() {
        this.setState(calculatePosition(this.props));
    }
    render() {
        const { view } = this.props;
        const { state } = view;
        const { selection } = state;
        const isActive = !selection.empty;
        const isCodeSelection = isNodeActive_1.default(state.schema.nodes.code_block)(state);
        if (isCodeSelection) {
            return null;
        }
        const colIndex = getColumnIndex_1.default(state.selection);
        const rowIndex = getRowIndex_1.default(state.selection);
        const isTableSelection = colIndex !== undefined && rowIndex !== undefined;
        const link = isMarkActive_1.default(state.schema.marks.link)(state);
        const range = getMarkRange_1.default(selection.$from, state.schema.marks.link);
        let items = [];
        if (isTableSelection) {
            items = table_1.default();
        }
        else if (colIndex !== undefined) {
            items = tableCol_1.default(state, colIndex);
        }
        else if (rowIndex !== undefined) {
            items = tableRow_1.default(state, rowIndex);
        }
        else {
            items = formatting_1.default(state);
        }
        if (!items.length) {
            return null;
        }
        return (React.createElement(react_portal_1.Portal, null,
            React.createElement(Wrapper, { active: isActive, ref: menuRef, top: this.state.top, left: this.state.left, offset: this.state.offset }, link && range ? (React.createElement(LinkEditor_1.default, Object.assign({ mark: range.mark, from: range.from, to: range.to }, this.props))) : (React.createElement(Menu_1.default, Object.assign({ items: items }, this.props))))));
    }
}
exports.default = FloatingToolbar;
const Wrapper = styled_components_1.default.div `
  padding: 8px 16px;
  position: absolute;
  z-index: ${props => {
    return props.theme.zIndex + 100;
}};
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  opacity: 0;
  background-color: ${props => props.theme.toolbarBackground};
  border-radius: 4px;
  transform: scale(0.95);
  transition: opacity 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
    transform 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transition-delay: 150ms;
  line-height: 0;
  height: 40px;
  box-sizing: border-box;
  pointer-events: none;
  white-space: nowrap;

  &::before {
    content: "";
    display: block;
    width: 24px;
    height: 24px;
    transform: translateX(-50%) rotate(45deg);
    background: ${props => props.theme.toolbarBackground};
    border-radius: 3px;
    z-index: -1;
    position: absolute;
    bottom: -2px;
    left: calc(50% - ${props => props.offset || 0}px);
  }

  * {
    box-sizing: border-box;
  }

  ${({ active }) => active &&
    `
    transform: translateY(-6px) scale(1);
    pointer-events: all;
    opacity: 1;
  `};

  @media print {
    display: none;
  }
`;
//# sourceMappingURL=FloatingToolbar.js.map