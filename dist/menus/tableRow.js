"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const outline_icons_1 = require("outline-icons");
function tableRowMenuItems(state, index) {
    return [
        {
            name: "addRowAfter",
            tooltip: "Insert row before",
            icon: outline_icons_1.InsertAboveIcon,
            attrs: { index: index - 1 },
            active: () => false,
            visible: index !== 0,
        },
        {
            name: "addRowAfter",
            tooltip: "Insert row after",
            icon: outline_icons_1.InsertBelowIcon,
            attrs: { index },
            active: () => false,
        },
        {
            name: "separator",
        },
        {
            name: "deleteRow",
            tooltip: "Delete row",
            icon: outline_icons_1.TrashIcon,
            active: () => false,
        },
    ];
}
exports.default = tableRowMenuItems;
//# sourceMappingURL=tableRow.js.map