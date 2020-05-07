"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uploadPlaceholder_1 = __importDefault(require("../lib/uploadPlaceholder"));
const findPlaceholder = function (state, id) {
    const decos = uploadPlaceholder_1.default.getState(state);
    const found = decos.find(null, null, spec => spec.id === id);
    return found.length ? found[0].from : null;
};
const insertFiles = function (view, event, pos, files, options) {
    const images = files.filter(file => /image/i.test(file.type));
    if (images.length === 0)
        return;
    const { uploadImage, onImageUploadStart, onImageUploadStop, onShowToast, } = options;
    if (!uploadImage) {
        console.warn("uploadImage callback must be defined to handle image uploads.");
        return;
    }
    event.preventDefault();
    if (onImageUploadStart)
        onImageUploadStart();
    const { schema } = view.state;
    let complete = 0;
    for (const file of images) {
        const id = {};
        const { tr } = view.state;
        tr.setMeta(uploadPlaceholder_1.default, {
            add: { id, file, pos },
        });
        view.dispatch(tr);
        uploadImage(file)
            .then(src => {
            const pos = findPlaceholder(view.state, id);
            if (pos === null)
                return;
            const transaction = view.state.tr
                .replaceWith(pos, pos, schema.nodes.image.create({ src }))
                .setMeta(uploadPlaceholder_1.default, { remove: { id } });
            view.dispatch(transaction);
        })
            .catch(error => {
            console.error(error);
            const transaction = view.state.tr.setMeta(uploadPlaceholder_1.default, {
                remove: { id },
            });
            view.dispatch(transaction);
            if (onShowToast) {
                onShowToast("Sorry, an error occurred uploading the image");
            }
        })
            .finally(() => {
            complete++;
            if (complete === images.length) {
                if (onImageUploadStop)
                    onImageUploadStop();
            }
        });
    }
};
exports.default = insertFiles;
//# sourceMappingURL=insertFiles.js.map