var easyMDE;
var EDITORSTATE;
var node;

async function init(){

    if (getParameterByName('id') !== null ) {

        window.lastArticleID = await getLastArticleID();
        if (parseInt(getParameterByName('id'))>=0 && parseInt(getParameterByName('id')) <= lastArticleID){
            window.articleData = await getArticle(parseInt(getParameterByName('id')));
            if (articleData.controller.toLowerCase() != web3.currentProvider.selectedAddress.toLowerCase()) {
                setupEditor('NEW');
            }
            else {
                let markdownData = await hashToMarkdown(articleData.dataHash);
                setupEditor('RESUME', markdownData);
            }
        }
        else{
            setupEditor('NEW');
        }
    }
    else if (getParameterByName('import') !== null ) {

        fetch(`https://importfrommedium.herokuapp.com/get?address=${getParameterByName('import')}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setupEditor('MEDIUM', data['data']);
        })
        .catch((error) => {
            console.log(error);
            setupEditor('NEW');
        });
    }
    else{
        setupEditor('NEW');
    };

    node = await Ipfs.create({ repo: 'ipfs-' + Math.random() });
    window.node = node;
    const status = node.isOnline() ? 'online' : 'offline';
    console.log(`Node status: ${status}`);


}

function setupEditor(EDITORSTATE, text = null){
    // console.log(EDITORSTATE, text);
    easyMDE = new EasyMDE({
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

    document.querySelector('#reset').style.display = 'inline-block';
    if (EDITORSTATE === 'NEW') {
        easyMDE.value("Type away, no distractions.");
        document.querySelector('#articleTitle').innerText = 'New Article';
        document.querySelector('#publishArticle').style.display = 'inline-block';
        document.querySelector('#publishArticleAnon').style.display = 'inline-block';
    }
    else if(EDITORSTATE === 'MEDIUM') {
        document.querySelector('#articleTitle').innerText = 'New Medium Article';
        document.querySelector('#publishArticle').style.display = 'inline-block';
        document.querySelector('#publishArticleAnon').style.display = 'inline-block';
    }
    else if(EDITORSTATE === 'RESUME') {
        document.querySelector('#articleTitle').innerText = articleData.title;
        document.querySelector('#updateArticle').style.display = 'inline-block';
    }
    hideLoader();

}

async function updateArticle(){
    let ipfsHash = await storeMarkdown(easyMDE.value())
    updateArticleData(articleData.ID.toString(),document.querySelector('#articleTitle').innerText,ipfsHash);
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


function importFromMedium(){
    var link = prompt("Enter a Medium Article Link");
    if (link !== null){
        window.location=`./editor.html?import=${link}`;
    }
}

function resetEditor(){
    window.location=`./editor.html?id=0`;
}

async function storeMarkdown (text) {
    let data = await node.add(text);
    return data.path;
}
