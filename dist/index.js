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
const prosemirror_dropcursor_1 = require("prosemirror-dropcursor");
const prosemirror_gapcursor_1 = require("prosemirror-gapcursor");
const prosemirror_view_1 = require("prosemirror-view");
const prosemirror_model_1 = require("prosemirror-model");
const prosemirror_inputrules_1 = require("prosemirror-inputrules");
const prosemirror_keymap_1 = require("prosemirror-keymap");
const prosemirror_commands_1 = require("prosemirror-commands");
const prosemirror_utils_1 = require("prosemirror-utils");
const styled_components_1 = __importStar(require("styled-components"));
const theme_1 = require("./theme");
const Flex_1 = __importDefault(require("./components/Flex"));
const FloatingToolbar_1 = __importDefault(require("./components/FloatingToolbar"));
const BlockMenu_1 = __importDefault(require("./components/BlockMenu"));
const ExtensionManager_1 = __importDefault(require("./lib/ExtensionManager"));
const ComponentView_1 = __importDefault(require("./lib/ComponentView"));
const Doc_1 = __importDefault(require("./nodes/Doc"));
const Text_1 = __importDefault(require("./nodes/Text"));
const Blockquote_1 = __importDefault(require("./nodes/Blockquote"));
const BulletList_1 = __importDefault(require("./nodes/BulletList"));
const CodeBlock_1 = __importDefault(require("./nodes/CodeBlock"));
const CodeFence_1 = __importDefault(require("./nodes/CodeFence"));
const CheckboxList_1 = __importDefault(require("./nodes/CheckboxList"));
const CheckboxItem_1 = __importDefault(require("./nodes/CheckboxItem"));
const Embed_1 = __importDefault(require("./nodes/Embed"));
const Heading_1 = __importDefault(require("./nodes/Heading"));
const HorizontalRule_1 = __importDefault(require("./nodes/HorizontalRule"));
const Image_1 = __importDefault(require("./nodes/Image"));
const ListItem_1 = __importDefault(require("./nodes/ListItem"));
const OrderedList_1 = __importDefault(require("./nodes/OrderedList"));
const Paragraph_1 = __importDefault(require("./nodes/Paragraph"));
const Table_1 = __importDefault(require("./nodes/Table"));
const TableCell_1 = __importDefault(require("./nodes/TableCell"));
const TableHeadCell_1 = __importDefault(require("./nodes/TableHeadCell"));
const TableRow_1 = __importDefault(require("./nodes/TableRow"));
const Bold_1 = __importDefault(require("./marks/Bold"));
const Code_1 = __importDefault(require("./marks/Code"));
const Highlight_1 = __importDefault(require("./marks/Highlight"));
const Italic_1 = __importDefault(require("./marks/Italic"));
const Link_1 = __importDefault(require("./marks/Link"));
const Strikethrough_1 = __importDefault(require("./marks/Strikethrough"));
const BlockMenuTrigger_1 = __importDefault(require("./plugins/BlockMenuTrigger"));
const History_1 = __importDefault(require("./plugins/History"));
const Keys_1 = __importDefault(require("./plugins/Keys"));
const Placeholder_1 = __importDefault(require("./plugins/Placeholder"));
const SmartText_1 = __importDefault(require("./plugins/SmartText"));
const TrailingNode_1 = __importDefault(require("./plugins/TrailingNode"));
const MarkdownPaste_1 = __importDefault(require("./plugins/MarkdownPaste"));
var server_1 = require("./server");
exports.schema = server_1.schema;
exports.parser = server_1.parser;
exports.serializer = server_1.serializer;
exports.theme = theme_1.light;
class RichMarkdownEditor extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            blockMenuOpen: false,
            blockMenuSearch: "",
        };
        this.value = () => {
            return this.serializer.serialize(this.view.state.doc);
        };
        this.handleChange = () => {
            if (this.props.onChange && !this.props.readOnly) {
                this.props.onChange(() => {
                    return this.value();
                });
            }
        };
        this.handleSave = () => {
            const { onSave } = this.props;
            if (onSave) {
                onSave({ done: false });
            }
        };
        this.handleSaveAndExit = () => {
            const { onSave } = this.props;
            if (onSave) {
                onSave({ done: true });
            }
        };
        this.handleOpenBlockMenu = (search) => {
            this.setState({ blockMenuOpen: true, blockMenuSearch: search });
        };
        this.handleCloseBlockMenu = () => {
            if (!this.state.blockMenuOpen)
                return;
            this.setState({ blockMenuOpen: false });
        };
        this.handleSelectRow = (index, state) => {
            this.view.dispatch(prosemirror_utils_1.selectRow(index)(state.tr));
        };
        this.handleSelectColumn = (index, state) => {
            this.view.dispatch(prosemirror_utils_1.selectColumn(index)(state.tr));
        };
        this.handleSelectTable = (state) => {
            this.view.dispatch(prosemirror_utils_1.selectTable(state.tr));
        };
        this.focusAtStart = () => {
            const selection = prosemirror_state_1.Selection.atStart(this.view.state.doc);
            const transaction = this.view.state.tr.setSelection(selection);
            this.view.dispatch(transaction);
            this.view.focus();
        };
        this.focusAtEnd = () => {
            const selection = prosemirror_state_1.Selection.atEnd(this.view.state.doc);
            const transaction = this.view.state.tr.setSelection(selection);
            this.view.dispatch(transaction);
            this.view.focus();
        };
        this.render = () => {
            const { dark, readOnly, style, tooltip, className, onKeyDown } = this.props;
            const theme = this.props.theme || (dark ? theme_1.dark : theme_1.light);
            return (React.createElement(Flex_1.default, { onKeyDown: onKeyDown, style: style, className: className, align: "flex-start", justify: "center", column: true },
                React.createElement(styled_components_1.ThemeProvider, { theme: theme },
                    React.createElement(React.Fragment, null,
                        React.createElement(StyledEditor, { readOnly: readOnly, ref: ref => (this.element = ref) }),
                        !readOnly && this.view && (React.createElement(React.Fragment, null,
                            React.createElement(FloatingToolbar_1.default, { view: this.view, commands: this.commands, onSearchLink: this.props.onSearchLink, onClickLink: this.props.onClickLink, tooltip: tooltip }),
                            React.createElement(BlockMenu_1.default, { view: this.view, commands: this.commands, isActive: this.state.blockMenuOpen, search: this.state.blockMenuSearch, onClose: this.handleCloseBlockMenu, uploadImage: this.props.uploadImage, onImageUploadStart: this.props.onImageUploadStart, onImageUploadStop: this.props.onImageUploadStop, onShowToast: this.props.onShowToast })))))));
        };
    }
    componentDidMount() {
        this.init();
        this.scrollToAnchor();
        if (this.props.readOnly)
            return;
        if (this.props.autoFocus) {
            this.focusAtEnd();
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.value && prevProps.value !== this.props.value) {
            const newState = this.createState(this.props.value);
            this.view.updateState(newState);
        }
        if (prevProps.readOnly !== this.props.readOnly) {
            this.view.update(Object.assign(Object.assign({}, this.view.props), { editable: () => !this.props.readOnly }));
        }
        if (prevProps.readOnly && !this.props.readOnly && this.props.autoFocus) {
            this.focusAtEnd();
        }
    }
    init() {
        this.extensions = this.createExtensions();
        this.nodes = this.createNodes();
        this.marks = this.createMarks();
        this.schema = this.createSchema();
        this.plugins = this.createPlugins();
        this.keymaps = this.createKeymaps();
        this.serializer = this.createSerializer();
        this.parser = this.createParser();
        this.inputRules = this.createInputRules();
        this.nodeViews = this.createNodeViews();
        this.view = this.createView();
        this.commands = this.createCommands();
    }
    createExtensions() {
        return new ExtensionManager_1.default([
            new Doc_1.default(),
            new Text_1.default(),
            new Paragraph_1.default(),
            new Blockquote_1.default(),
            new BulletList_1.default(),
            new CodeBlock_1.default(),
            new CodeFence_1.default(),
            new CheckboxList_1.default(),
            new CheckboxItem_1.default(),
            new Embed_1.default(),
            new ListItem_1.default(),
            new Heading_1.default({
                onShowToast: this.props.onShowToast,
                offset: this.props.headingsOffset,
            }),
            new HorizontalRule_1.default(),
            new Image_1.default({
                uploadImage: this.props.uploadImage,
                onImageUploadStart: this.props.onImageUploadStart,
                onImageUploadStop: this.props.onImageUploadStop,
                onShowToast: this.props.onShowToast,
            }),
            new Table_1.default(),
            new TableCell_1.default({
                onSelectTable: this.handleSelectTable,
                onSelectRow: this.handleSelectRow,
            }),
            new TableHeadCell_1.default({
                onSelectColumn: this.handleSelectColumn,
            }),
            new TableRow_1.default(),
            new Bold_1.default(),
            new Code_1.default(),
            new Highlight_1.default(),
            new Italic_1.default(),
            new Link_1.default({
                onClickLink: this.props.onClickLink,
                onClickHashtag: this.props.onClickHashtag,
            }),
            new Strikethrough_1.default(),
            new OrderedList_1.default(),
            new Placeholder_1.default({
                placeholder: this.props.placeholder,
            }),
            new History_1.default(),
            new SmartText_1.default(),
            new TrailingNode_1.default(),
            new MarkdownPaste_1.default(),
            new Keys_1.default({
                onSave: this.handleSave,
                onSaveAndExit: this.handleSaveAndExit,
                onCancel: this.props.onCancel,
            }),
            new BlockMenuTrigger_1.default({
                onOpen: this.handleOpenBlockMenu,
                onClose: this.handleCloseBlockMenu,
            }),
            ...this.props.extensions,
        ], this);
    }
    createPlugins() {
        return this.extensions.plugins;
    }
    createKeymaps() {
        return this.extensions.keymaps({
            schema: this.schema,
        });
    }
    createInputRules() {
        return this.extensions.inputRules({
            schema: this.schema,
        });
    }
    createNodeViews() {
        return this.extensions.extensions
            .filter((extension) => extension.component)
            .reduce((nodeViews, extension) => {
            const nodeView = (node, view, getPos, decorations) => {
                return new ComponentView_1.default(extension.component, {
                    editor: this,
                    extension,
                    node,
                    view,
                    getPos,
                    decorations,
                });
            };
            return Object.assign(Object.assign({}, nodeViews), { [extension.name]: nodeView });
        }, {});
    }
    createCommands() {
        return this.extensions.commands({
            schema: this.schema,
            view: this.view,
        });
    }
    createNodes() {
        return this.extensions.nodes;
    }
    createMarks() {
        return this.extensions.marks;
    }
    createSchema() {
        return new prosemirror_model_1.Schema({
            nodes: this.nodes,
            marks: this.marks,
        });
    }
    createSerializer() {
        return this.extensions.serializer();
    }
    createParser() {
        return this.extensions.parser({
            schema: this.schema,
        });
    }
    createState(value) {
        const doc = this.createDocument(value || this.props.defaultValue);
        return prosemirror_state_1.EditorState.create({
            schema: this.schema,
            doc,
            plugins: [
                ...this.plugins,
                ...this.keymaps,
                prosemirror_dropcursor_1.dropCursor(),
                prosemirror_gapcursor_1.gapCursor(),
                prosemirror_inputrules_1.inputRules({
                    rules: this.inputRules,
                }),
                prosemirror_keymap_1.keymap(prosemirror_commands_1.baseKeymap),
            ],
        });
    }
    createDocument(content) {
        return this.parser.parse(content);
    }
    createView() {
        const view = new prosemirror_view_1.EditorView(this.element, {
            state: this.createState(),
            editable: () => !this.props.readOnly,
            nodeViews: this.nodeViews,
            dispatchTransaction: transaction => {
                const { state, transactions } = this.view.state.applyTransaction(transaction);
                this.view.updateState(state);
                if (transactions.some(tr => tr.docChanged)) {
                    this.handleChange();
                }
                this.forceUpdate();
            },
        });
        return view;
    }
    scrollToAnchor() {
        const { hash } = window.location;
        if (!hash)
            return;
        try {
            const element = document.querySelector(hash);
            if (element)
                element.scrollIntoView({ behavior: "smooth" });
        }
        catch (err) {
            console.warn(`Attempted to scroll to invalid hash: ${hash}`, err);
        }
    }
}
RichMarkdownEditor.defaultProps = {
    defaultValue: "",
    placeholder: "Write something nice…",
    onImageUploadStart: () => {
    },
    onImageUploadStop: () => {
    },
    onClickLink: href => {
        window.open(href, "_blank");
    },
    extensions: [],
    tooltip: "span",
};
const StyledEditor = styled_components_1.default("div") `
  color: ${props => props.theme.text};
  background: ${props => props.theme.background};
  font-family: ${props => props.theme.fontFamily};
  font-weight: ${props => props.theme.fontWeight};
  font-size: 1em;
  line-height: 1.7em;
  width: 100%;

  .ProseMirror {
    position: relative;
    outline: none;
    word-wrap: break-word;
    white-space: pre-wrap;
    white-space: break-spaces;
    -webkit-font-variant-ligatures: none;
    font-variant-ligatures: none;
    font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
  }

  pre {
    white-space: pre-wrap;
  }

  li {
    position: relative;
  }

  img {
    max-width: 100%;
  }

  .image {
    text-align: center;

    img {
      pointer-events: ${props => (props.readOnly ? "initial" : "none")};
    }
  }

  .image.placeholder img {
    opacity: 0.5;
  }

  .ProseMirror-hideselection *::selection {
    background: transparent;
  }
  .ProseMirror-hideselection *::-moz-selection {
    background: transparent;
  }
  .ProseMirror-hideselection {
    caret-color: transparent;
  }

  .ProseMirror-selectednode {
    outline: 2px solid ${props => props.theme.selected};
  }

  /* Make sure li selections wrap around markers */

  li.ProseMirror-selectednode {
    outline: none;
  }

  li.ProseMirror-selectednode:after {
    content: "";
    position: absolute;
    left: -32px;
    right: -2px;
    top: -2px;
    bottom: -2px;
    border: 2px solid ${props => props.theme.selected};
    pointer-events: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 500;
    cursor: default;

    &:not(.placeholder):before {
      display: ${props => (props.readOnly ? "none" : "block")};
      position: absolute;
      font-family: ${props => props.theme.fontFamilyMono};
      color: ${props => props.theme.textSecondary};
      font-size: 13px;
      left: -24px;
    }
  }

  h1:not(.placeholder):before { content: "H1"; line-height: 3em; }
  h2:not(.placeholder):before { content: "H2"; line-height: 2.8em; }
  h3:not(.placeholder):before { content: "H3"; line-height: 2.3em; }
  h4:not(.placeholder):before { content: "H4"; line-height: 2.2em; }
  h5:not(.placeholder):before { content: "H5"; }
  h6:not(.placeholder):before { content: "H6"; }

  .heading-name {
    color: ${props => props.theme.text};

    &:hover {
      text-decoration: none;

      .heading-anchor {
        opacity: 1;
      }
    }
  }

  .with-emoji {
    margin-left: -1em;
  }

  .heading-anchor {
    opacity: 0;
    display: ${props => (props.readOnly ? "block" : "none")};
    color: ${props => props.theme.textSecondary};
    cursor: pointer;
    background: none;
    border: 0;
    outline: none;
    padding: 2px 12px 2px 4px;
    margin: 0;
    position: absolute;
    transition: opacity 100ms ease-in-out;
    font-family: ${props => props.theme.fontFamilyMono};
    font-size: 22px;
    left: -1.3em;

    &:focus,
    &:hover {
      color: ${props => props.theme.text};
    }
  }

  .placeholder {
    &:before {
      display: block;
      content: ${props => (props.readOnly ? "" : "attr(data-empty-text)")};
      pointer-events: none;
      height: 0;
      color: ${props => props.theme.placeholder};
    }
  }

  blockquote {
    border-left: 3px solid ${props => props.theme.quote};
    margin: 0;
    padding-left: 10px;
    font-style: italic;
  }

  b,
  strong {
    font-weight: 600;
  }

  p {
    position: relative;
    margin: 0;
  }

  a {
    color: ${props => props.theme.link};
  }

  a:hover {
    text-decoration: ${props => (props.readOnly ? "underline" : "none")};
  }

  ul,
  ol {
    margin: 0 0.1em;
    padding-left: 1em;

    ul,
    ol {
      margin: 0;
    }
  }

  ul.checkbox_list {
    list-style: none;
    padding-left: 0;
    margin-left: -4px;

    ul.checkbox_list {
      padding-left: 20px;
    }
  }

  ul.checkbox_list li.checked > span > p {
    color: ${props => props.theme.textSecondary};
    text-decoration: line-through;
  }

  ul.checkbox_list li input {
    pointer-events: ${props => (props.readOnly ? "none" : "initial")};
    opacity: ${props => (props.readOnly ? 0.75 : 1)};
    margin-right: 6px;
  }

  li p:first-child {
    display: inline;
    margin: 0;
  }

  hr {
    height: 0;
    border: 0;
    border-top: 1px solid ${props => props.theme.horizontalRule};
  }

  code {
    border-radius: 4px;
    border: 1px solid ${props => props.theme.codeBorder};
    padding: 3px 4px;
    font-family: "Source Code Pro", Menlo, monospace;
    font-size: 85%;
  }

  mark {
    border-radius: 1px;
    color: ${props => props.theme.black};
    background: ${props => props.theme.textHighlight};
  }

  .code-block {
    position: relative;

    select,
    button {
      display: none;
      position: absolute;
      z-index: 1;
      top: 4px;
      right: 4px;
    }

    &:hover {
      select {
        display: ${props => (props.readOnly ? "none" : "inline")};
      }
  
      button {
        display: ${props => (props.readOnly ? "inline" : "none")};
      }
    }
  }

  pre {
    display: block;
    overflow-x: auto;
    padding: 0.5em 1em;
    line-height: 1.4em;
    position: relative;
    background: ${props => props.theme.codeBackground};
    border-radius: 4px;
    border: 1px solid ${props => props.theme.codeBorder};

    -webkit-font-smoothing: initial;
    font-family: ${props => props.theme.fontFamilyMono}
    font-size: 13px;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
    color: ${props => props.theme.code};
    margin: 0;

    code {
      background: none;
      padding: 0;
      border: 0;
    }
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${props => props.theme.codeComment};
  }

  .token.punctuation {
    color: ${props => props.theme.codePunctuation};
  }

  .token.namespace {
    opacity: .7;
  }

  .token.operator,
  .token.boolean,
  .token.number {
    color: ${props => props.theme.codeNumber};
  }

  .token.property {
    color: ${props => props.theme.codeProperty};
  }

  .token.tag {
    color: ${props => props.theme.codeTag};
  }

  .token.string {
    color: ${props => props.theme.codeString};
  }

  .token.selector {
    color: ${props => props.theme.codeSelector};
  }

  .token.attr-name {
    color: ${props => props.theme.codeAttr};
  }

  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: ${props => props.theme.codeEntity};
  }

  .token.attr-value,
  .token.keyword,
  .token.control,
  .token.directive,
  .token.unit {
    color: ${props => props.theme.codeKeyword};
  }

  .token.function {
    color: ${props => props.theme.codeFunction};
  }

  .token.statement,
  .token.regex,
  .token.atrule {
    color: ${props => props.theme.codeStatement};
  }

  .token.placeholder,
  .token.variable {
    color: ${props => props.theme.codePlaceholder};
  }

  .token.deleted {
    text-decoration: line-through;
  }

  .token.inserted {
    border-bottom: 1px dotted ${props => props.theme.codeInserted};
    text-decoration: none;
  }

  .token.italic {
    font-style: italic;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.important {
    color: ${props => props.theme.codeImportant};
  }

  .token.entity {
    cursor: help;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 4px;
    margin-top: 1em;

    tr {
      position: relative;
      border-bottom: 1px solid ${props => props.theme.tableDivider};
    }

    th {
      background: ${props => props.theme.tableHeaderBackground};
    }

    td, th {
      position: relative;
      vertical-align: top;
      border: 1px solid ${props => props.theme.tableDivider};
      position: relative;
      padding: 4px 8px;
      text-align: left;
      min-width: 100px;
    }

    .selectedCell {
      background: ${props => props.readOnly ? "inherit" : props.theme.tableSelectedBackground};
    }

    .grip-column {
      cursor: pointer;
      position: absolute;
      top: -16px;
      left: 0;
      width: 100%;
      height: 12px;
      background: ${props => props.theme.tableDivider};
      border-bottom: 3px solid ${props => props.theme.background};
      display: ${props => (props.readOnly ? "none" : "block")};

      &:hover {
        background: ${props => props.theme.text};
      }
      &.first {
        border-top-left-radius: 3px;
      }
      &.last {
        border-top-right-radius: 3px;
      }
      &.selected {
        background: ${props => props.theme.tableSelected};
      }
    }

    .grip-row {
      cursor: pointer;
      position: absolute;
      left: -16px;
      top: 0;
      height: 100%;
      width: 12px;
      background: ${props => props.theme.tableDivider};
      border-right: 3px solid ${props => props.theme.background};
      display: ${props => (props.readOnly ? "none" : "block")};

      &:hover {
        background: ${props => props.theme.text};
      }
      &.first {
        border-top-left-radius: 3px;
      }
      &.last {
        border-bottom-left-radius: 3px;
      }
      &.selected {
        background: ${props => props.theme.tableSelected};
      }
    }

    .grip-table {
      cursor: pointer;
      background: ${props => props.theme.tableDivider};
      width: 13px;
      height: 13px;
      border-radius: 13px;
      border: 2px solid ${props => props.theme.background};
      position: absolute;
      top: -18px;
      left: -18px;
      display: ${props => (props.readOnly ? "none" : "block")};

      &:hover {
        background: ${props => props.theme.text};
      }
      &.selected {
        background: ${props => props.theme.tableSelected};
      }
    }
  }

  .scrollable-wrapper {
    position: relative;
    margin: 0.5em 0px;
  }

  .scrollable {
    overflow-y: hidden;
    overflow-x: scroll;
    padding-left: 1em;
    margin-left: -1em;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    transition: border 250ms ease-in-out 0s;
  }

  .scrollable-shadow {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -1em;
    width: 16px;
    transition: box-shadow 250ms ease-in-out;
    border: 0px solid transparent;
    border-left-width: 1em;
    pointer-events: none;

    &.left {
      box-shadow: 16px 0 16px -16px inset rgba(0,0,0,0.25);
      border-left: 1em solid ${props => props.theme.background};
    }

    &.right {
      right: 0;
      left: auto;
      box-shadow: -16px 0 16px -16px inset rgba(0,0,0,0.25);
    }
  }

  .block-menu-trigger {
    display: ${props => (props.readOnly ? "none" : "block")};
    height: 1em;
    color: ${props => props.theme.textSecondary};
    background: none;
    border-radius: 100%;
    font-size: 30px;
    position: absolute;
    transform: scale(0.9);
    transition: color 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275),
    transform 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    outline: none;
    border: 0;
    line-height: 1;
    margin-top: -6px;
    left: -34px;

    &:hover,
    &:focus {
      cursor: pointer;
      transform: scale(1);
      color: ${props => props.theme.text};
    }
  }

  .ProseMirror-gapcursor {
    display: none;
    pointer-events: none;
    position: absolute;
  }
  
  .ProseMirror-gapcursor:after {
    content: "";
    display: block;
    position: absolute;
    top: -2px;
    width: 20px;
    border-top: 1px solid ${props => props.theme.cursor};
    animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
  }
  
  @keyframes ProseMirror-cursor-blink {
    to {
      visibility: hidden;
    }
  }
  
  .ProseMirror-focused .ProseMirror-gapcursor {
    display: block;
  }
`;
exports.default = RichMarkdownEditor;
//# sourceMappingURL=index.js.map