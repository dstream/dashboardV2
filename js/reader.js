async function init(){
    // const node = await Ipfs.create({ repo: 'ipfs-' + Math.random() });
    // window.node = node;
    // const status = node.isOnline() ? 'online' : 'offline';
    // console.log(`Node status: ${status}`);

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

let shareData = {}

async function refreshUI(){

    let data = await getArticle(page_aid);
    console.log(data);
    document.querySelector('#dTitle').innerText = data.title;
    document.querySelector('#author').innerText = 'By ' + formatAddress(data.controller);

    let markdown = await hashToMarkdown(data.dataHash);
    const searchRegExp = /\n/gi;
    const replaceWith = '\n\n';
    const result = markdown.replace(searchRegExp, replaceWith);
    console.log(result);

    let md = new markdownit();
    let markdownHTML = md.render(result);
    document.querySelector('#dArticle').innerHTML = markdownHTML;
    hideLoader();

    // Handle sharing
    if (typeof navigator.share !== 'undefined'){

        shareData['title'] = data.title;
        shareData['text'] = `Read the article by ${formatAddress(data.controller)}`;
        shareData['url'] = `https://libertas-test.anudit.dev/reader.html?id=${page_aid}`;

        const sharebtn = document.querySelector('#share');
        sharebtn.style.visibility = 'visible';
        sharebtn.addEventListener('click', async () => {
            await navigator.share(shareData)
        });

    }

}

// async function hashToMarkdown(_ipfsHash){
//     const chunks = []
//     for await (const chunk of node.cat(_ipfsHash)) {
//         chunks.push(chunk)
//     }
//     return buffer.Buffer.concat(chunks).toString()
// }


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

async function tip(){
    var amt = prompt("Enter Amount in ETH");

    if (amt != null) {
        tipArticle(page_aid, amt);
    }
}


async function copylink(){
    let btn = document.querySelector('#copyLinkBtn');
    if (copyToClipboard(window.location.href) === true){
        btn.innerText = "✔ Copied";
        setTimeout(()=>{
            btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M22 6v16h-16v-16h16zm2-2h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z"/></svg>
            Copy Link`;
        },1500);
    }
    else {
        btn.innerText = "Error";
        setTimeout(()=>{
            btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M22 6v16h-16v-16h16zm2-2h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z"/></svg>
            Copy Link`;
        },1500);
    }
}
