"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const outline_icons_1 = require("outline-icons");
function blockMenuItems() {
    return [
        {
            name: "heading",
            title: "Big heading",
            keywords: "h1 heading1 title",
            icon: outline_icons_1.Heading1Icon,
            shortcut: "^ ⇧ 1",
            attrs: { level: 1 },
        },
        {
            name: "heading",
            title: "Medium heading",
            keywords: "h2 heading2",
            icon: outline_icons_1.Heading2Icon,
            shortcut: "^ ⇧ 2",
            attrs: { level: 2 },
        },
        {
            name: "heading",
            title: "Small heading",
            keywords: "h3 heading3",
            icon: outline_icons_1.Heading3Icon,
            shortcut: "^ ⇧ 3",
            attrs: { level: 3 },
        },
        {
            name: "separator",
        },
        {
            name: "checkbox_list",
            title: "Todo list",
            icon: outline_icons_1.TodoListIcon,
            keywords: "checklist checkbox task",
            shortcut: "^ ⇧ 7",
        },
        {
            name: "bullet_list",
            title: "Bulleted list",
            icon: outline_icons_1.BulletedListIcon,
            shortcut: "^ ⇧ 8",
        },
        {
            name: "ordered_list",
            title: "Ordered list",
            icon: outline_icons_1.OrderedListIcon,
            shortcut: "^ ⇧ 9",
        },
        {
            name: "separator",
        },
        {
            name: "table",
            title: "Table",
            icon: outline_icons_1.TableIcon,
            attrs: { rowsCount: 3, colsCount: 3 },
        },
        {
            name: "blockquote",
            title: "Quote",
            icon: outline_icons_1.BlockQuoteIcon,
            shortcut: "⌘ ]",
            attrs: { level: 2 },
        },
        {
            name: "code_block",
            title: "Code block",
            icon: outline_icons_1.CodeIcon,
            shortcut: "^ ⇧ \\",
            keywords: "script",
        },
        {
            name: "hr",
            title: "Divider",
            icon: outline_icons_1.HorizontalRuleIcon,
            shortcut: "⌘ _",
            keywords: "horizontal rule break line",
        },
        {
            name: "image",
            title: "Image",
            icon: outline_icons_1.ImageIcon,
            keywords: "picture photo",
        },
    ];
}
exports.default = blockMenuItems;
//# sourceMappingURL=block.js.map