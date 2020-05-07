"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
const styled_components_1 = __importDefault(require("styled-components"));
const outline_icons_1 = require("outline-icons");
function LinkSearchResult(_a) {
    var { title } = _a, rest = __rest(_a, ["title"]);
    return (React.createElement(ListItem, Object.assign({}, rest),
        React.createElement("i", null,
            React.createElement(outline_icons_1.NextIcon, { light: true })),
        title));
}
const ListItem = styled_components_1.default.li `
  display: flex;
  align-items: center;
  height: 28px;
  padding: 6px 8px 6px 0;
  color: ${props => props.theme.toolbarItem};
  font-family: ${props => props.theme.fontFamily};
  font-size: 15px;
  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;

  i {
    visibility: ${props => (props.selected ? "visible" : "hidden")};
  }

  &:hover,
  &:focus,
  &:active {
    font-weight: 500;
    outline: none;

    i {
      visibility: visible;
    }
  }
`;
exports.default = LinkSearchResult;
//# sourceMappingURL=LinkSearchResult.js.map