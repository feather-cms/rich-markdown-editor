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
const prosemirror_utils_1 = require("prosemirror-utils");
const outline_icons_1 = require("outline-icons");
const styled_components_1 = __importStar(require("styled-components"));
const isUrl_1 = __importDefault(require("../lib/isUrl"));
const Flex_1 = __importDefault(require("./Flex"));
const ToolbarButton_1 = __importDefault(require("./ToolbarButton"));
const LinkSearchResult_1 = __importDefault(require("./LinkSearchResult"));
class LinkEditor extends React.Component {
    constructor() {
        super(...arguments);
        this.discardInputValue = false;
        this.initialValue = this.props.mark.attrs.href;
        this.state = {
            selectedIndex: -1,
            value: this.props.mark.attrs.href,
            results: [],
        };
        this.componentWillUnmount = () => {
            if (this.discardInputValue) {
                return;
            }
            let href = (this.state.value || "").trim();
            if (!href) {
                return this.handleRemoveLink();
            }
            if (!isUrl_1.default(href) && !href.startsWith("/")) {
                href = `https://${href}`;
            }
            this.save(href);
        };
        this.save = (href) => {
            this.discardInputValue = true;
            const { from, to } = this.props;
            const { state, dispatch } = this.props.view;
            const markType = state.schema.marks.link;
            dispatch(state.tr
                .removeMark(from, to, markType)
                .addMark(from, to, markType.create({ href })));
        };
        this.handleKeyDown = (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                if (this.state.selectedIndex >= 0) {
                    this.save(this.state.results[this.state.selectedIndex].url);
                }
                this.moveSelectionToEnd();
                return;
            }
            if (event.key === "Escape") {
                event.preventDefault();
                if (this.initialValue) {
                    this.setState({ value: this.initialValue }, this.moveSelectionToEnd);
                }
                else {
                    this.handleRemoveLink();
                }
                return;
            }
            if (event.key === "ArrowUp") {
                event.preventDefault();
                event.stopPropagation();
                const prevIndex = this.state.selectedIndex - 1;
                this.setState({
                    selectedIndex: Math.max(0, prevIndex),
                });
            }
            if (event.key === "ArrowDown" || event.key === "Tab") {
                event.preventDefault();
                event.stopPropagation();
                const total = this.state.results.length - 1;
                const nextIndex = this.state.selectedIndex + 1;
                this.setState({
                    selectedIndex: Math.min(nextIndex, total),
                });
            }
        };
        this.handleChange = async (event) => {
            const value = event.target.value.trim();
            const looksLikeUrl = isUrl_1.default(value);
            this.setState({
                value,
                results: looksLikeUrl ? [] : this.state.results,
                selectedIndex: -1,
            });
            if (value && !looksLikeUrl && this.props.onSearchLink) {
                try {
                    const results = await this.props.onSearchLink(value);
                    this.setState({ results });
                }
                catch (error) {
                    console.error(error);
                }
            }
            else {
                this.setState({ results: [] });
            }
        };
        this.handleOpenLink = (event) => {
            const { href } = this.props.mark.attrs;
            event.preventDefault();
            this.props.onClickLink(href);
        };
        this.handleRemoveLink = () => {
            this.discardInputValue = true;
            const { from, to, mark } = this.props;
            const { state, dispatch } = this.props.view;
            dispatch(state.tr.removeMark(from, to, mark));
        };
        this.handleSearchResultClick = (url) => event => {
            event.preventDefault();
            this.save(url);
            this.moveSelectionToEnd();
        };
        this.moveSelectionToEnd = () => {
            const { to, view } = this.props;
            const { state, dispatch } = view;
            dispatch(prosemirror_utils_1.setTextSelection(to)(state.tr));
            view.focus();
        };
    }
    render() {
        const { mark } = this.props;
        const Tooltip = this.props.tooltip;
        const showResults = this.state.results.length > 0;
        return (React.createElement(Wrapper, null,
            React.createElement(Input, { value: this.state.value, placeholder: "Search or paste a link\u2026", onKeyDown: this.handleKeyDown, onChange: this.handleChange, autoFocus: mark.attrs.href === "" }),
            React.createElement(ToolbarButton_1.default, { onClick: this.handleOpenLink, disabled: !this.state.value },
                React.createElement(Tooltip, { tooltip: "Open link", placement: "top" },
                    React.createElement(outline_icons_1.OpenIcon, { color: this.props.theme.toolbarItem }))),
            React.createElement(ToolbarButton_1.default, { onClick: this.handleRemoveLink },
                React.createElement(Tooltip, { tooltip: "Remove link", placement: "top" },
                    React.createElement(outline_icons_1.TrashIcon, { color: this.props.theme.toolbarItem }))),
            showResults && (React.createElement(SearchResults, null, this.state.results.map((result, index) => (React.createElement(LinkSearchResult_1.default, { key: result.url, title: result.title, onClick: this.handleSearchResultClick(result.url), selected: index === this.state.selectedIndex })))))));
    }
}
const Wrapper = styled_components_1.default(Flex_1.default) `
  margin-left: -8px;
  margin-right: -8px;
  min-width: 300px;
`;
const SearchResults = styled_components_1.default.ol `
  background: ${props => props.theme.toolbarBackground};
  position: absolute;
  top: 100%;
  width: 100%;
  height: auto;
  left: 0;
  padding: 8px;
  margin: 0;
  margin-top: -3px;
  margin-bottom: 0;
  border-radius: 0 0 4px 4px;
`;
const Input = styled_components_1.default.input `
  font-size: 15px;
  background: ${props => props.theme.toolbarInput};
  color: ${props => props.theme.toolbarItem};
  border-radius: 2px;
  padding: 4px 8px;
  border: 0;
  margin: 0;
  outline: none;
  flex-grow: 1;
`;
exports.default = styled_components_1.withTheme(LinkEditor);
//# sourceMappingURL=LinkEditor.js.map