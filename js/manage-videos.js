async function init(){

    const node = await Ipfs.create({ repo: 'ipfs-' + Math.random() });
    window.node = node;
    const status = node.isOnline() ? 'online' : 'offline';
    console.log(`Node status: ${status}`);
    setupFilepicker();


    refreshUI();
}

async function refreshUI(){
    await requireLogin();
    window.userAddress = await web3.eth.getAccounts().then((data)=>{return data[0]});
    window.walletAddress = await biconomy.getUserContract(userAddress).then((data)=>{return data.userContract});
    setupUserVideos();
}


async function setupUserVideos(){

    // let videoCnt = await getVideoCnt(userAddress);
    let videoIDs = await getVideoIDsByAddress(userAddress);

    let dvideosList = document.getElementById('dvideosList');
    if (videoIDs.length > 0){
        document.getElementById('videoFrame').style.display = 'block';
        for (let i = 0; i < videoIDs.length; i+=3){
            let videoData = await getVideoByIndex(videoIDs[i]);
            let videoHTML = `
            <div class="works-item row js-works-item works-${catToText(videoData.category).toLowerCase()} visible" href='./video.html?id=${videoData.videoID}'>
                <div class="col-md-4">

                <h3 class="title">${videoData.title}</h3>
                    <a class="btn btn-white" id="publishAd" href="/edit-video.html?id=${videoIDs[i]}">Edit Video</a>
                    <div class="works-meta"><strong>${catToText(videoData.category)}</strong> · ${prettyDate(videoData.uploadTime)}</div>
                </div>
                <div class="col-md-8">
                    <div class="works-preview">
                    <img src=${ipfsLink(videoData.thumbnailHash)} alt="" class='works-pic'>
                    </div>
                </div>
            </div>
            `;

            dvideosList.innerHTML+=videoHTML;
        }
        filterEnable();
    }

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
