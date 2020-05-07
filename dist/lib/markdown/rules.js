"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const markdown_it_1 = __importDefault(require("markdown-it"));
const markdown_it_mark_1 = __importDefault(require("markdown-it-mark"));
const checkboxes_1 = __importDefault(require("./checkboxes"));
const embeds_1 = __importDefault(require("./embeds"));
const breaks_1 = __importDefault(require("./breaks"));
const tables_1 = __importDefault(require("./tables"));
function rules({ getLinkComponent, }) {
    return markdown_it_1.default("default", {
        breaks: false,
        html: false,
    })
        .use(embeds_1.default(getLinkComponent))
        .use(breaks_1.default)
        .use(checkboxes_1.default)
        .use(markdown_it_mark_1.default)
        .use(tables_1.default);
}
exports.default = rules;
//# sourceMappingURL=rules.js.map