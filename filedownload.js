export function save_as(data, prompt, default_, extension) {
    let filename = window.prompt(prompt, default_);
    if (filename != null) {
        if (!filename.endsWith(extension)) {
            filename += extension;
        }
        save_data_to_file(data, filename);
        return filename
    }
    return null;
}

export function save_data_to_file(data, filename, filetype='plain/text') {
    const blob = new Blob([data], {type: filetype});
    let a = document.createElement('a');
    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.click();
}