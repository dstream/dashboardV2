async function init(){

    if (getParameterByName('id') !== null )
    {
        window.lastArticleID = await getLastArticleID();
        if (parseInt(getParameterByName('id')) <= lastArticleID && parseInt(getParameterByName('id'))>0){
            let articleData = await getArticle(parseInt(getParameterByName('id')));
            let markdownData = await hashToMarkdown(articleData.dataHash);
            setupEditor(markdownData);
        }
        else{
            setupEditor();
        }
    }
    else{
        setupEditor();
    };


}

function setupEditor(text = null){
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
    if (text != null){
        easyMDE.value(text);
    }

}

async function hashToMarkdown(_ipfsHash){

    let promise = new Promise((res, rej) => {

        fetch(`https://ipfs.infura.io:5001/api/v0/cat?arg=${_ipfsHash}`)
        .then((response)=>{
            response.body.getReader().read().then(({done, value})=>{
                res(value);
            });
        })

    });
    let result = await promise;
    result = buffer.Buffer(result).toString();
    return result;
}
