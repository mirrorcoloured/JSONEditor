import { makeDragUploadable, makeClickUploadable } from "./fileupload.js";
import { save_as } from "./filedownload.js";

const edit_div = document.querySelector("#editor");
const export_button = document.querySelector("#export");
const import_button = document.querySelector("#import");
const mode_key = "jsoneditor-mode";

// EDITOR

let last_filename = "Untitled.json";

let editor = new JSONEditor(edit_div, {
    mode: window.localStorage.getItem(mode_key) || 'tree',
    modes: ['tree', 'code', 'form', 'view', 'text', 'preview'],
    onChange: () => {
        madeChanges();
    },
    onModeChange: (newmode, oldmode) => {
        window.localStorage.setItem(mode_key, newmode);
    }
})

function promptBeforeClose(event) {
    event.preventDefault();
    event.returnValue = "Save changes";
    return "Save changes";
}

function madeChanges() {
    export_button.classList.add("changes");
    document.title = last_filename + "*";
    window.addEventListener("beforeunload", promptBeforeClose);
}

function resetChanges() {
    export_button.classList.remove("changes");
    document.title = last_filename;
    window.removeEventListener("beforeunload", promptBeforeClose);
}

// IMPORT

function import_data(metadata, filedata) {
    resetChanges();
    if (metadata.length == 1) {
        last_filename = metadata[0].name;
        editor.set(JSON.parse(filedata[0]));
    } else {
        let data = {};
        for (let i = 0; i < metadata.length; i++) {
            data[metadata[i].name] = JSON.parse(filedata[i]);
        }
        editor.set(data);
    }
}

makeClickUploadable(import_button, import_data);
makeDragUploadable(document.body, import_data);

// EXPORT

export_button.addEventListener("click", function(evt) {
    let filename = save_as(editor.get(), "Please enter a file name", last_filename, ".json");
    if (filename) {
        resetChanges();
    }
})
