"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = __importDefault(require("markdown-it/lib/token"));
function markdownTables(md) {
    md.core.ruler.after("inline", "tables-pm", state => {
        const tokens = state.tokens;
        let inside = false;
        for (let i = tokens.length - 1; i > 0; i--) {
            if (inside) {
                tokens[i].level--;
            }
            if (["thead_open", "thead_close", "tbody_open", "tbody_close"].includes(tokens[i].type)) {
                inside = !inside;
                tokens.splice(i, 1);
            }
            if (["th_open", "td_open"].includes(tokens[i].type)) {
                tokens.splice(i + 1, 0, new token_1.default("paragraph_open", "p", 1));
                if (tokens[i].attrs) {
                    const style = tokens[i].attrs[0][1];
                    tokens[i].info = style.split(":")[1];
                }
            }
            if (["th_close", "td_close"].includes(tokens[i].type)) {
                tokens.splice(i, 0, new token_1.default("paragraph_close", "p", -1));
            }
        }
        return false;
    });
}
exports.default = markdownTables;
//# sourceMappingURL=tables.js.map