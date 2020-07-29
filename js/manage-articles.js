function init(){
    refreshUI();
}

async function refreshUI(){
    let dArticlesList = document.getElementById('dArticlesList');
    let lastArticleID = await getLastArticleID();

    let promiseArray= [];
    for (let i = Math.max(1, lastArticleID-11); i< lastArticleID+1;i++){
        promiseArray.push(getArticle(i));
    }
    const recentArticles = await Promise.all(promiseArray);

    for (let i = 0; i< recentArticles.length; i+=1){
        console.log(recentArticles[i]);
        let videoHTML = `
        <div class="works-item row js-works-item works-${catToText(recentArticles[i].category).toLowerCase()} visible">
            <div class="col-md-12">
                <div class="theme">${formatAddress(recentArticles[i].controller)}</div>
                <h3 class="title">${recentArticles[i].title}</h3>
                <a class="btn btn-white" href="/editor.html?id=${recentArticles[i].ID}">Edit Article</a>
                <br/><br/>
                <div class="works-meta"><strong>${catToText(recentArticles[i].category)}</strong> · ${prettyDate(recentArticles[i].lastUpdated)}</div>
            </div>
        </div>
        `;

        dArticlesList.innerHTML+=videoHTML;
    }
    filterEnable();
}
