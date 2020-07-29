async function init(){
    const node = await Ipfs.create({ repo: 'ipfs-' + Math.random() });
    window.node = node;
    const status = node.isOnline() ? 'online' : 'offline';
    console.log(`Node status: ${status}`);

    window.lastArticleID = await getLastArticleID();
    window.page_aid = parseInt(getParameterByName('id'));

    if (getParameterByName('id') === null
        || parseInt(getParameterByName('id')) > lastArticleID
        || parseInt(getParameterByName('id')) <= 0)
    {
        console.log(`Invalid AID : ${getParameterByName('id')} for URL ${window.location.href}`);
        window.location = "./articles.html";
    }
    else{
        refreshUI();
    };
}

async function refreshUI(){

    let data = await getArticle(page_aid);
    console.log(data);
    document.querySelector('#dTitle').innerText = data.title;
    document.querySelector('#author').innerText = 'By ' + formatAddress(data.controller);
    let markdown = await hashToMarkdown(data.dataHash);
    let md = new markdownit();
    let markdownHTML = md.render(markdown);
    document.querySelector('#dArticle').innerHTML = markdownHTML;
    hideLoader();
}

async function hashToMarkdown(_ipfsHash){
    const chunks = []
    for await (const chunk of node.cat(_ipfsHash)) {
        chunks.push(chunk)
    }
    return buffer.Buffer.concat(chunks).toString()
}
