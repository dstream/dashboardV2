async function init(){
    refreshUI();
    liveSetup();

    document.getElementById("updateStream").addEventListener("click", updateStreamData);
    document.getElementById("end-call").addEventListener("click", endLiveStream);
}

async function refreshUI(){
    let streamData = await getLiveStream(web3.currentProvider.selectedAddress);

    document.getElementById("streamTitle").value = streamData.title;
    document.getElementById("streamDesc").value = streamData.desc;
    document.getElementById("streamPaid").checked = streamData.isPaid;
    document.getElementById("streamDuration").value = streamData.duration;
    document.getElementById("streamRate").value = streamData.rate;
}

async function updateStreamData(){
    await requireLogin();
    let connID = document.getElementById("my-id").innerText;
    let isPaid = document.getElementById("streamPaid").checked;
    let duration = parseInt(document.getElementById("streamDuration").value)*60;
    let rate = web3.utils.toWei(parseFloat(document.getElementById("streamRate").value), 'ether');
    let title = document.getElementById("streamTitle").value;
    let desc = document.getElementById("streamDesc").value;

    updateStream( connID, isPaid, duration, rate, title, desc);
}

function copyID() {
    copyToClipboard(document.querySelector('#my-id').innerText);
}
