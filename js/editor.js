function init(){

    var easyMDE = new EasyMDE({
        autosave: {
            enabled: true,
            uniqueId: 'editordata',
            delay: 1000,
        },
        showIcons: ['strikethrough', 'code', 'table', 'redo', 'heading', 'undo', 'heading-1', 'heading-2', 'heading-3', 'clean-block', 'horizontal-rule'],
        hideIcons: ["guide"],
        placeholder: "Type away, no distractions.",
        tabSize: 4,
        element: document.getElementById("editor")

    });

}
