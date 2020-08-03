async function init(){

    window.lastVideoID = await getLastVideoID();
    window.localTxnFired = false;
    if (getParameterByName('id') === null
        || parseInt(getParameterByName('id')) > lastVideoID)
    {
        console.log(`Invalid VID : ${getParameterByName('id')} for URL ${window.location.href}`);
        window.location = "./discover.html";
    }
    else{
        refreshUI();
        window.page_vid = parseInt(getParameterByName('id'));
        document.getElementById("dVideo").addEventListener("play",onPlayVideo);
        document.getElementById("dVideo").addEventListener("contextmenu", ()=>{return false;});
        document.getElementById("subscribeBtn").addEventListener("click", subscribeToCreator);
    };

}

async function onPlayVideo(){
    let vid = document.getElementById("dVideo");
    let watchStatus = await hasWatchedVideo(web3.currentProvider.selectedAddress, page_vid);
    if (watchStatus == false && localTxnFired == false){
        vid.pause();
        await requireLogin();
        let res = await watchVideo(page_vid);
        console.log("Video watch txn result: ", res);
        if(res == true){
            vid.play();
        }
    }else{
        console.warn('Video Already Watched Once.')
    }

}

async function refreshUI(){
    const dVideo = document.getElementById("dVideo");
    const videoData = await Promise.all([
        getVideoByIndex(parseInt(getParameterByName('id'))),
        getVideoExtraByIndex(parseInt(getParameterByName('id'))),
        getCreatorDataByVideo(parseInt(getParameterByName('id')))
    ]);
    const pageData = await Promise.all([
        getAd(videoData[1].activeAdID)
    ]);
    console.log(videoData);

    window.vid_owner = videoData[0].owner;
    dVideo.poster = ipfsLink(videoData[0].thumbnailHash);

    // multiserver check
    let ipfsLinkData = ipfsLinks(videoData[0].videoHash);
    for (var i = 0, len = ipfsLinkData.length; i < len; i++) {
        console.log(`Checking ${ipfsLinkData[i]}`);
        if (await validHeader(ipfsLinkData[i]) == true){
            console.log('Active at : ', ipfsLinkData[i])
            dVideo.src = ipfsLinkData[i];
            break;
        }
    }

    document.getElementById("heroImg").style.background = `url(${ipfsLink(videoData[0].thumbnailHash)}), linear-gradient(rgba(0, 0, 0, 0.65) 0%, 50%, rgb(255, 255, 255) 90%)`;
    document.getElementById("heroImg").style.backgroundSize = 'cover';
    document.getElementById("videoTitle").innerText = videoData[0].title;
    document.getElementById("videoDesc").innerText = videoData[0].description;
    document.getElementById("videoViewCnt").innerText = videoData[1].viewCnt;
    document.getElementById("creatorImage").src = ipfsLink(videoData[2].imageHash);
    document.getElementById("creatorTitle").innerText = videoData[2].name == '' ? 'Anonymous' : videoData[2].name;
    document.getElementById("creatorSubcnt").innerText = videoData[2].subscriberCnt;




    console.log(pageData);

    document.getElementById("adHash").src = ipfsLink(pageData[0].imageHash);
    document.getElementById("adLink").innerText = pageData[0].link;
    document.getElementById("adLink").href = withHttps(pageData[0].link);

    // Setup Explore More Videos
    const getRandomInt = (max)=>{
        //eg: for 2 will return in [0, 1]
        var array = new Uint32Array(1);
        var random  = window.crypto.getRandomValues(array)[0];
        return random % max;
    }
    let videoIDs = [getRandomInt(lastVideoID+1), getRandomInt(lastVideoID+1), getRandomInt(lastVideoID+1)];

    let promiseArray= [];
    videoIDs.forEach((id)=>{
        if (id != page_vid && id != 0){promiseArray.push(getVideoByIndex(id))}
    })
    let recentVideos = await Promise.all(promiseArray);
    console.log(recentVideos);
    if (recentVideos.length>0){document.getElementById('discoverMoreFrame').style.display = 'block'}
    let moreVideos = document.getElementById('discoverMore');
    for (let i = 0; i < recentVideos.length; i+=3){
        let videoHTML = `
        <div class="col-md-4 col-lg-4">
            <div class="awards-item">
            <div class="awards-preview">
                <img src='${ipfsLink(recentVideos[i].thumbnailHash)}' class='preview-pic'>
            </div>
            <div class="awards-title">${recentVideos[i].title}</div>
            <div class="awards-text">${recentVideos[i].description}</div><br/>
            <a href="video.html?id=${recentVideos[i].videoID}" class="btn btn-primary">Watch Now</a>
            </div>
        </div>
        `;

        moreVideos.innerHTML+=videoHTML;
    }

}

function subscribeToCreator(){
    subscribe(vid_owner);
}
