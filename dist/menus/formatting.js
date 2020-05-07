"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const outline_icons_1 = require("outline-icons");
const prosemirror_tables_1 = require("prosemirror-tables");
const isInList_1 = __importDefault(require("../queries/isInList"));
const isMarkActive_1 = __importDefault(require("../queries/isMarkActive"));
const isNodeActive_1 = __importDefault(require("../queries/isNodeActive"));
function formattingMenuItems(state) {
    const { schema } = state;
    const isTable = prosemirror_tables_1.isInTable(state);
    const isList = isInList_1.default(state);
    const allowBlocks = !isTable && !isList;
    return [
        {
            name: "strong",
            tooltip: "Bold",
            icon: outline_icons_1.BoldIcon,
            active: isMarkActive_1.default(schema.marks.strong),
        },
        {
            name: "em",
            tooltip: "Italic",
            icon: outline_icons_1.ItalicIcon,
            active: isMarkActive_1.default(schema.marks.em),
        },
        {
            name: "strikethrough",
            tooltip: "Strikethrough",
            icon: outline_icons_1.StrikethroughIcon,
            active: isMarkActive_1.default(schema.marks.strikethrough),
        },
        {
            name: "code_inline",
            tooltip: "Code",
            icon: outline_icons_1.CodeIcon,
            active: isMarkActive_1.default(schema.marks.code_inline),
        },
        {
            name: "separator",
            visible: allowBlocks,
        },
        {
            name: "heading",
            tooltip: "Heading",
            icon: outline_icons_1.Heading1Icon,
            active: isNodeActive_1.default(schema.nodes.heading, { level: 1 }),
            attrs: { level: 1 },
            visible: allowBlocks,
        },
        {
            name: "heading",
            tooltip: "Subheading",
            icon: outline_icons_1.Heading2Icon,
            active: isNodeActive_1.default(schema.nodes.heading, { level: 2 }),
            attrs: { level: 2 },
            visible: allowBlocks,
        },
        {
            name: "blockquote",
            tooltip: "Quote",
            icon: outline_icons_1.BlockQuoteIcon,
            active: isNodeActive_1.default(schema.nodes.blockquote),
            attrs: { level: 2 },
            visible: allowBlocks,
        },
        {
            name: "separator",
        },
        {
            name: "link",
            tooltip: "Create link",
            icon: outline_icons_1.LinkIcon,
            active: isMarkActive_1.default(schema.marks.link),
            attrs: { href: "" },
        },
    ];
}
exports.default = formattingMenuItems;
//# sourceMappingURL=formatting.js.map