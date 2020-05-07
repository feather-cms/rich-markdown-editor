"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isNodeActive = (type, attrs = undefined) => state => {
    const { $from, to, node } = state.selection;
    if (node) {
        return attrs ? node.hasMarkup(type, attrs) : node.type === type;
    }
    return (to <= $from.end() &&
        (attrs ? $from.parent.hasMarkup(type, attrs) : $from.parent.type === type));
};
exports.default = isNodeActive;
//# sourceMappingURL=isNodeActive.js.map