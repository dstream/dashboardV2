async function init(){
    if (getParameterByName('add') === null)
    {
        console.log(`Invalid Live Stream : ${getParameterByName('id')} for URL ${window.location.href}`);
        Swal.fire({
            title: 'Warning',
            text: "This is an Incorrect Stream Address",
            icon: 'warning',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Head Back'
        }).then((result) => {
            window.location = './discover.html';
        })
    }
    else{
        window.streamData = await getLiveStream(getParameterByName('add'));
        if (streamData.isEnabled == false) {
            Swal.fire({
                title: 'Warning',
                text: "A Live Stream is not activated for this Address",
                icon: 'warning',
                confirmButtonColor: '#d33',
                confirmButtonText: 'Head Back'
            }).then((result) => {
                window.location = './discover.html';
            })
        }
        else{

            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
              })

              swalWithBootstrapButtons.fire({
                title: `Paid Live Stream`,
                text: `This live stream costs ${web3.utils.fromWei(streamData.rate) * streamData.duration } ANC`,
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Accept',
                cancelButtonText: 'Decline',
                reverseButtons: true
              }).then(async(result) => {
                if (result.value) {
                    let resp = await joinLiveStream(getParameterByName('add')).then(async(res)=>{

                        console.log('Joining Stream');
                        refreshUI();
                        liveSetup();

                    }).catch((e)=>{
                        window.location= './discover.html';
                    });
                }
                else if ( result.dismiss === Swal.DismissReason.cancel) {

                    // console.log('Joining Stream');
                    // refreshUI();
                    // liveSetup();

                  window.location= './discover.html';
                }
              })


        }
    };
}

async function refreshUI(){

    const creatorData = await getCreatorData(getParameterByName('add'))
    document.getElementById("creatorImage").src = ipfsLink(creatorData.imageHash);
    document.getElementById("creatorTitle").innerText = creatorData.name == '' ? 'Anonymous' : creatorData.name;
    document.getElementById("creatorSubcnt").innerText = creatorData.subscriberCnt;

    document.getElementById("streamTitle").innerText = streamData.title;
    document.getElementById("streamDesc").innerText = streamData.desc;

}

