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
        let videoHTML = `
        <a class="works-item row js-works-item works-${catToText(recentArticles[i].category).toLowerCase()} visible" href='./reader.html?id=${recentArticles[i].ID}'>
            <div class="col-md-12">
                <div class="theme">Name</div>
                <h3 class="title">Title</h3>
                <div class="works-meta"><strong>${catToText(recentArticles[i].category)}</strong> · ${prettyDate(recentArticles[i].published)}</div>
            </div>
        </a>
        `;

        dArticlesList.innerHTML+=videoHTML;
    }
    filterEnable();
}
