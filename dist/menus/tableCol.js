"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const outline_icons_1 = require("outline-icons");
const isNodeActive_1 = __importDefault(require("../queries/isNodeActive"));
function tableColMenuItems(state, index) {
    const { schema } = state;
    return [
        {
            name: "setColumnAttr",
            tooltip: "Align left",
            icon: outline_icons_1.AlignLeftIcon,
            attrs: { index, alignment: "left" },
            active: isNodeActive_1.default(schema.nodes.th, {
                colspan: 1,
                rowspan: 1,
                alignment: "left",
            }),
        },
        {
            name: "setColumnAttr",
            tooltip: "Align center",
            icon: outline_icons_1.AlignCenterIcon,
            attrs: { index, alignment: "center" },
            active: isNodeActive_1.default(schema.nodes.th, {
                colspan: 1,
                rowspan: 1,
                alignment: "center",
            }),
        },
        {
            name: "setColumnAttr",
            tooltip: "Align right",
            icon: outline_icons_1.AlignRightIcon,
            attrs: { index, alignment: "right" },
            active: isNodeActive_1.default(schema.nodes.th, {
                colspan: 1,
                rowspan: 1,
                alignment: "right",
            }),
        },
        {
            name: "separator",
        },
        {
            name: "addColumnBefore",
            tooltip: "Insert column before",
            icon: outline_icons_1.InsertLeftIcon,
            active: () => false,
        },
        {
            name: "addColumnAfter",
            tooltip: "Insert column after",
            icon: outline_icons_1.InsertRightIcon,
            active: () => false,
        },
        {
            name: "separator",
        },
        {
            name: "deleteColumn",
            tooltip: "Delete column",
            icon: outline_icons_1.TrashIcon,
            active: () => false,
        },
    ];
}
exports.default = tableColMenuItems;
//# sourceMappingURL=tableCol.js.map