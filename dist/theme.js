"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors = {
    almostBlack: "#181A1B",
    lightBlack: "#2F3336",
    almostWhite: "#E6E6E6",
    white: "#FFF",
    white10: "rgba(255, 255, 255, 0.1)",
    black: "#000",
    black10: "rgba(0, 0, 0, 0.1)",
    primary: "#1AB6FF",
    greyLight: "#F4F7FA",
    grey: "#E8EBED",
    greyMid: "#C5CCD3",
    greyDark: "#DAE1E9",
};
exports.base = Object.assign(Object.assign({}, colors), { fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen, Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif", fontFamilyMono: "'SFMono-Regular',Consolas,'Liberation Mono', Menlo, Courier,monospace", fontWeight: 400, zIndex: 100, link: colors.primary, placeholder: "#B1BECC", textSecondary: "#4E5C6E", textLight: colors.white, textHighlight: "#b3e7ff", selected: colors.primary, codeComment: "#6a737d", codePunctuation: "#5e6687", codeNumber: "#d73a49", codeProperty: "#c08b30", codeTag: "#3d8fd1", codeString: "#032f62", codeSelector: "#6679cc", codeAttr: "#c76b29", codeEntity: "#22a2c9", codeKeyword: "#d73a49", codeFunction: "#6f42c1", codeStatement: "#22a2c9", codePlaceholder: "#3d8fd1", codeInserted: "#202746", codeImportant: "#c94922" });
exports.light = Object.assign(Object.assign({}, exports.base), { background: colors.white, text: colors.almostBlack, code: colors.lightBlack, cursor: colors.black, divider: colors.greyMid, toolbarBackground: colors.lightBlack, toolbarInput: colors.white10, toolbarItem: colors.white, blockToolbarBackground: colors.white, blockToolbarTrigger: colors.greyMid, blockToolbarTriggerIcon: colors.white, blockToolbarItem: colors.almostBlack, tableDivider: colors.greyMid, tableSelected: colors.primary, tableSelectedBackground: "#E5F7FF", quote: colors.greyDark, codeBackground: colors.greyLight, codeBorder: colors.grey, horizontalRule: colors.greyMid, imageErrorBackground: colors.greyLight });
exports.dark = Object.assign(Object.assign({}, exports.base), { background: colors.almostBlack, text: colors.almostWhite, code: colors.almostWhite, cursor: colors.white, divider: "#4E5C6E", placeholder: "#52657A", toolbarBackground: colors.white, toolbarInput: colors.black10, toolbarItem: colors.lightBlack, blockToolbarBackground: colors.almostBlack, blockToolbarTrigger: colors.almostWhite, blockToolbarTriggerIcon: colors.almostBlack, blockToolbarItem: colors.lightBlack, tableDivider: colors.lightBlack, tableSelected: colors.primary, tableSelectedBackground: "#002333", quote: colors.greyDark, codeBackground: colors.almostBlack, codeBorder: colors.lightBlack, codeString: "#3d8fd1", horizontalRule: colors.lightBlack, imageErrorBackground: "rgba(0, 0, 0, 0.5)" });
exports.default = exports.light;
//# sourceMappingURL=theme.js.map