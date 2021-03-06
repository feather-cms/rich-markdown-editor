"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CHECKBOX_REGEX = /\[(X|\s|_|-)\](\s(.*))?/i;
function matches(token) {
    return token.content.match(CHECKBOX_REGEX);
}
function isInline(token) {
    return token.type === "inline";
}
function isParagraph(token) {
    return token.type === "paragraph_open";
}
function looksLikeChecklist(tokens, index) {
    return (isInline(tokens[index]) &&
        isParagraph(tokens[index - 1]) &&
        matches(tokens[index]));
}
function markdownItCheckbox(md) {
    md.core.ruler.after("inline", "checkboxes", state => {
        const tokens = state.tokens;
        for (let i = tokens.length - 1; i > 0; i--) {
            const matches = looksLikeChecklist(tokens, i);
            if (matches) {
                const value = matches[1];
                const label = matches[3];
                const checked = value.toLowerCase() === "x";
                if (tokens[i - 3].type === "bullet_list_open") {
                    tokens[i - 3].type = "checkbox_list_open";
                }
                if (tokens[i + 3].type === "bullet_list_close") {
                    tokens[i + 3].type = "checkbox_list_close";
                }
                tokens[i].content = label;
                tokens[i].children[0].content = label;
                tokens[i - 2].type = "checkbox_item_open";
                if (checked === true) {
                    tokens[i - 2].attrs = [["checked", "true"]];
                }
                let j = i;
                while (tokens[j].type !== "list_item_close") {
                    j++;
                }
                tokens[j].type = "checkbox_item_close";
            }
        }
        return false;
    });
}
exports.default = markdownItCheckbox;
//# sourceMappingURL=checkboxes.js.map