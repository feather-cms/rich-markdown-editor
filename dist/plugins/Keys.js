"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prosemirror_state_1 = require("prosemirror-state");
const Extension_1 = __importDefault(require("../lib/Extension"));
class Keys extends Extension_1.default {
    get name() {
        return "keys";
    }
    get plugins() {
        return [
            new prosemirror_state_1.Plugin({
                props: {
                    handleKeyDown: (view, event) => {
                        if (!event.metaKey)
                            return false;
                        if (event.key === "s") {
                            event.preventDefault();
                            this.options.onSave();
                            return true;
                        }
                        if (event.key === "Enter") {
                            event.preventDefault();
                            this.options.onSaveAndExit();
                            return true;
                        }
                        if (event.key === "Escape") {
                            event.preventDefault();
                            this.options.onCancel();
                            return true;
                        }
                    },
                },
            }),
        ];
    }
}
exports.default = Keys;
//# sourceMappingURL=Keys.js.map