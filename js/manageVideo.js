async function init(){

    const node = await Ipfs.create({ repo: 'ipfs-' + Math.random() });
    window.node = node;
    const status = node.isOnline() ? 'online' : 'offline';
    console.log(`Node status: ${status}`);
    setupFilepicker();

    let lastVideoID = await getLastVideoID();
    if (getParameterByName('id') === null
        || parseInt(getParameterByName('id')) >= lastVideoID)
    {
        console.log(`Invalid VID : ${getParameterByName('id')} for URL ${window.location.href}`);
        window.location = "./discover.html";
    }
    else{
        window.page_vid = parseInt(getParameterByName('id'));
    };

    document.getElementById("updateTitle").addEventListener("click", ()=>{
        let title = document.getElementById("videoNewTitle").value;
        updateVideoTitle(page_vid, title);
    });
    document.getElementById("updateDescription").addEventListener("click", ()=>{
        let desc = document.getElementById("videoNewDescription").value;
        updateVideoDescription(page_vid, desc);
    });
    document.getElementById("uploadVideoThumb").addEventListener("click", uploadVideoThumbnail);
    document.getElementById("updateSponsor").addEventListener("click", async ()=>{
        let sponsorListEle = document.getElementById("sponsorList");
        let adID = await advertiserToVideoToAd(sponsorListEle.options[sponsorListEle.selectedIndex].value, page_vid)
        updateSponsor(page_vid, adID);
    });
    document.getElementById("sponsorList").addEventListener("change", updateSponsorAdPreview);
    document.getElementById("withdrawEarnings").addEventListener("click", withdrawFromAllStreams);

    requireLogin().then(init2);

}

async function init2(){
    const videoData = await Promise.all([
        getVideoByIndex(parseInt(getParameterByName('id'))),
        getVideoExtraByIndex(parseInt(getParameterByName('id'))),
        getSponsorList(parseInt(getParameterByName('id'))),
        getVideoStreamIDs(parseInt(getParameterByName('id')))
    ]);

    if (videoData[0].owner.toLowerCase() != web3.currentProvider.selectedAddress.toLowerCase()){
        window.location = "./discover.html";
    }
    else{
        refreshUI(videoData);
    }
}

async function refreshUI(videoData){
    console.log(videoData);
    document.getElementById("videoCurrentTitle").innerText = videoData[0].title;
    document.getElementById("videoCurrentDesc").innerText = videoData[0].description;
    document.getElementById("videoCurrentSponsorAddress").innerText = trimAddress(videoData[1].activeSponsor);

    let sponsorListEle = document.getElementById("sponsorList");
    videoData[2].forEach((e)=>{
        sponsorListEle.innerHTML += `<option value='${e}'>${trimAddress(e)}</option>`
    })

    let advData = await getAdvertiser(await getAdvertiserID(videoData[1].activeSponsor));
    document.getElementById("videoCurrentSponsorName").innerText = advData.name;

    let earnings = await getEarnings(page_vid);
    setTimeout(function(){
        document.getElementById("videoCurrentEarnings").innerText = arrSum(earnings);
    }, 1000);

}

async function withdrawFromAllStreams(){
    let streamIDs = await getVideoStreamIDs(page_vid);
    streamIDs.forEach(async (streamID)=>{
        let amt = await getStreamBalance(streamID, web3.currentProvider.selectedAddress);
        withdrawFromStream(streamID, amt);
    })
}


async function updateSponsorAdPreview(){

    let sponsorListEle = document.getElementById('sponsorList');
    let adID = await advertiserToVideoToAd(sponsorListEle.options[sponsorListEle.selectedIndex].value, page_vid);
    let adData = await getAd(adID);

    document.getElementById("sponsorAdImg").src = ipfsLink(adData.imageHash);

}


function setupFilepicker(){
    ;( function ( document, window, index )
    {
        var inputs = document.querySelectorAll( '.inputfile' );
        Array.prototype.forEach.call( inputs, function( input )
        {
            var label	 = input.nextElementSibling,
                labelVal = label.innerHTML;

            input.addEventListener( 'change', function( e )
            {
                var fileName = '';
                if( this.files && this.files.length > 1 )
                    fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
                else
                    fileName = e.target.value.split( '\\' ).pop();

                if( fileName )
                    label.querySelector( 'span' ).innerHTML = fileName;
                else
                    label.innerHTML = labelVal;
            });

            // Firefox bug fix
            input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
            input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
        });
    }( document, window, 0 ));
}

async function uploadVideoThumbnail(){
    let status = document.getElementById('statusVideoThumb');
    let fileEle = document.getElementById('file-1');
    status.innerText = 'Checking ... ';

    if(fileEle.files.length < 1){
        status.innerText = '⚠ Please choose a file first.';
    }
    else{
        let ext = fileEle.files[0].name.split('.').pop();
        if(['jpg','jpeg','png', 'webp'].includes(ext.toLowerCase()) == false){
            status.innerText = '⚠ Only JPG, PNG & WEBP files allowed.';
        }
        else{
            status.innerText = 'Uploading ... ';
            let resp = await addFile(fileEle.files);
            let {path, size} = resp;
            // window.lastVideoHash = path;
            updateVideoThumbnail(page_vid, path);
            status.innerHTML = `<a href='${ipfsLink(path)}' target='_blank'>Image Uploaded (${prettySize(size)}) </a>`;
            document.getElementById('thumbImage').src = ipfsLink(path);
        }
    }

}

async function addFile (files) {
    for await (const result of node.add(files)) {
        console.log(result);
        return result;
    }
}
