async function init(){

    const node = await Ipfs.create({ repo: 'ipfs-' + Math.random() });
    window.node = node;
    const status = node.isOnline() ? 'online' : 'offline';
    console.log(`Node status: ${status}`);
    setupFilepicker();

    document.getElementById("uploadAd").addEventListener("click", uploadAd);
    document.getElementById("publishAd").addEventListener("click", ()=>{
        let link = document.getElementById("adLink").value;
        let category = document.getElementById("adCat").value;
        let rate = document.getElementById("adRate").value;
        let budget = document.getElementById("adBudget").value;
        console.log(`Using ${link} ${category} ${rate} ${budget} to publish a new Ad`);
        createAd(window.lastAdHash, link, category, rate, budget);
    });

    document.getElementById("registerAdv").addEventListener("click", ()=>{
        let name = document.getElementById("advNameVal").value;
        registerAdv(name);
    });
    document.getElementById("sponsorVideoBtn").addEventListener("click", ()=>{
        let vID = document.getElementById("sponsorAdID").value;
        let adID = document.getElementById("sponsorVideoID").value;
        sponsorVideo(vID, adID);
    });

    refreshUI();
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

async function uploadAd(){
    let status = document.getElementById('statusUploadAd');
    let fileEle = document.getElementById('file-2');
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
            window.lastAdHash = path;
            status.innerHTML = `<a href='${ipfsLink(path)}' target='_blank'>Image Uploaded (${prettySize(size)}) </a>`;
            document.getElementById('adImage').src = ipfsLink(path);
        }
    }

}

async function refreshUI(){
    await requireLogin();

    let advID = await getAdvertiserID(web3.currentProvider.selectedAddress);
    const data2 = await Promise.all([
        getAdvertiser(advID),
        getAdvAdCnt(web3.currentProvider.selectedAddress)
    ]);
    console.log(data2);
    if (data2[0].isEnabled == true){
        document.getElementById("advRegisterFrame").style.display = 'none';
        document.getElementById("advName").innerText = data2[0].name =='' ? 'Anonymous' : data2[0].name;
    }
    else{
        document.getElementById("advName").style.display = 'none';
        document.getElementById("advRegisterFrame").style.display = 'block';
    }

    let advAdCnt =  data2[1];
    document.getElementById("advAdCnt").innerText = advAdCnt;
    let adData = [];
    for(var i = 0 ; i < advAdCnt;i++){
        let ad = await getAd(await getAdvAdID(web3.currentProvider.selectedAddress, i));
        adData.push(ad);
    }
    console.log(adData);
    setupUserAds(adData)
}

async function setupUserAds(adData){

    let adsList = document.getElementById('adsList');
    let totAdBudgetRem = 0;
    if (adData.length > 0){
        document.getElementById('adsFrame').style.display = 'block';

        for (let i = 0; i < adData.length; i+=1){
            totAdBudgetRem+=adData[i].budget;
            let adID = adData[i].adID;
            let videoHTML = `
            <a class="works-item row js-works-item works-${catToText(adData[i].category).toLowerCase()} visible" href='${withHttps(adData[i].link)}' target='_blank'>
                <div class="col-md-4">
                    <div class="theme">Rate: ${adData[i].amountPerSecond} ANC/s</div>
                    <h3 class="title">${adData[i].link}</h3>
                    <h5>Remaining Budget : ${adData[i].budget} ANC</h5>
                    <div class="works-meta"><strong>${catToText(adData[i].category)}</strong> · Ad ID - ${adID}</div>
                </div>
                <div class="col-md-8">
                    <div class="works-preview">
                    <img src=${ipfsLink(adData[i].imageHash)} class='works-pic'>
                    </div>
                </div>
            </a>
            `;

            adsList.innerHTML+=videoHTML;
        }
        filterEnable();
    }
    document.getElementById('advAdBudgetLeft').innerText = totAdBudgetRem ;

}


async function addFile (files) {
    for await (const result of node.add(files)) {
        console.log(result);
        return result;
    }
}

