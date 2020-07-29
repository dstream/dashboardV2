function init(){
    refreshUI();
}

async function refreshUI(){
    let dvideosList = document.getElementById('dvideosList');
    let lastVideoID = await getLastVideoID();

    let promiseArray= [];
    for (let i = Math.max(1, lastVideoID-11); i< lastVideoID+1;i++){
        promiseArray.push(getVideoByIndex(i),getVideoExtraByIndex(i), getCreatorDataByVideo(i));
    }
    const recentVideos = await Promise.all(promiseArray);
    console.log(recentVideos);

    for (let i = 0; i< recentVideos.length; i+=3){
        let videoHTML = `
        <a class="works-item row js-works-item works-${catToText(recentVideos[i].category).toLowerCase()} visible" href='./video.html?id=${recentVideos[i+1].videoID}'>
            <div class="col-md-4">
                <div class="theme">${recentVideos[i+2].name == '' ? 'Anonymous Creator': recentVideos[i+2].name}</div>
                <h3 class="title">${recentVideos[i].title}</h3>
                <div class="works-meta"><strong>${catToText(recentVideos[i].category)}</strong> · ${prettyDate(recentVideos[i].uploadTime)}</div>
            </div>
            <div class="col-md-8">
                <div class="works-preview">
                <img src=${ipfsLink(recentVideos[i].thumbnailHash)} alt="" class='works-pic'>
                </div>
            </div>
        </a>
        `;

        dvideosList.innerHTML+=videoHTML;
    }
    hideLoader();
    filterEnable();
}
