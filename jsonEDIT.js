import { makeDragUploadable, makeClickUploadable } from "./fileupload.js";
import { save_as } from "./filedownload.js";

const edit_div = document.querySelector("#editor");
const export_button = document.querySelector("#export");
const import_button = document.querySelector("#import");

// EDITOR

let last_filename = "Untitled.json";

let editor = new JSONEditor(edit_div, {
    modes: ['tree', 'code', 'text', 'view', 'form', 'preview'],
    onChange: e => {
        madeChanges();
    },
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
    let mdata = metadata[0];
    let fdata = filedata[0];

    last_filename = mdata.name;
    resetChanges();
    editor.set(JSON.parse(fdata));
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
