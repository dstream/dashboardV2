async function init(){

    const node = await Ipfs.create({ repo: 'ipfs-' + Math.random() });
    window.node = node;
    const status = node.isOnline() ? 'online' : 'offline';
    console.log(`Node status: ${status}`);
    setupFilepicker();

    document.getElementById("increaseAllowance").addEventListener("click", ()=>{
        let amt = parseFloat(document.getElementById("allowanceAmtVal").value);
        increaseAllowance(libertasAddress, amt);
    });
    document.getElementById("setAllowance").addEventListener("click", ()=>{
        let amt = parseFloat(document.getElementById("allowanceAmtVal").value);
        setAllowance(libertasAddress, amt);
    });
    document.getElementById("decreaseAllowance").addEventListener("click", ()=>{
        let amt = parseFloat(document.getElementById("allowanceAmtVal").value);
        decreaseAllowance(libertasAddress, amt);
    });
    document.getElementById("getFromFaucet").addEventListener("click", getFromFaucet);
    document.getElementById("updateCreatorName").addEventListener("click", ()=>{
        let name = document.getElementById("creatorNameVal").value;
        updateCreatorName(name);
    });
    document.getElementById("uploadCreatorImage").addEventListener("click", uploadCreatorImage);


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


async function uploadCreatorImage(){
    let status = document.getElementById('status');
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
            window.lastCreatorImageHash = path;
            status.innerHTML = `<a href='${ipfsLink(path)}' target='_blank'>Image Uploaded (${prettySize(size)}) </a>`;
            document.getElementById('adImage').src = ipfsLink(path);
            updateCreatorImage(window.lastCreatorImageHash);
        }
    }

}

async function refreshUI(){
    await requireLogin();
    window.userAddress = await web3.eth.getAccounts().then((data)=>{return data[0]});
    window.walletAddress = await biconomy.getUserContract(userAddress).then((data)=>{return data.userContract});

    console.log(userAddress, walletAddress);
    const data = await Promise.all([
        balanceOfToken(userAddress),
        balanceOfToken(walletAddress),
        getAllowance(userAddress, libertasAddress),
        getCreatorData(userAddress),
    ]);
    console.log(data);

    document.getElementById("userBalance").innerText = data[0].toFixed(2);
    document.getElementById("allowanceAmt").innerText = data[2].toFixed(2);
    document.getElementById("creatorName").innerText = data[3].name =='' ? 'Anonymous' : data[3].name;
    document.getElementById("creatorImage").src = ipfsLink(data[3].imageHash);

    document.getElementById("faucetBalance").innerText = (await balanceOfToken(faucetAddress)).toFixed(2);

}

async function addFile (files) {
    for await (const result of node.add(files)) {
        console.log(result);
        return result;
    }
}

