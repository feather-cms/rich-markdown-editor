"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const slugify_1 = __importDefault(require("slugify"));
function safeSlugify(text) {
    return `h-${lodash_1.escape(slugify_1.default(text, { lower: true }).replace(".", "-"))}`;
}
function headingToSlug(node, index) {
    const slugified = safeSlugify(node.textContent);
    if (index === 0)
        return slugified;
    return `${slugified}-${index}`;
}
exports.default = headingToSlug;
//# sourceMappingURL=headingToSlug.js.map