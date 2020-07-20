async function init(){

    const node = await Ipfs.create({ repo: 'ipfs-' + Math.random() });
    window.node = node;
    const status = node.isOnline() ? 'online' : 'offline';
    console.log(`Node status: ${status}`);

    document.getElementById('uploadVideo').addEventListener('click', uploadVideo);
    document.getElementById('uploadPoster').addEventListener('click', uploadPoster);
    refreshUI();

}

async function refreshUI(){

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

    await requireLogin();
}

async function uploadVideo(){
    let status = document.getElementById('status');
    let fileEle = document.getElementById('file-1');
    status.innerText = 'Checking ... ';


    if(fileEle.files.length < 1){
        status.innerText = '⚠ Please choose a file first.';
    }
    else{
        let ext = fileEle.files[0].name.split('.').pop();
        if(['mp4','mpeg4', 'webm'].includes(ext.toLowerCase()) == false){
            status.innerText = '⚠ Only MP4 & WEBM files allowed.';
        }
        else{
            status.innerText = 'Uploading ... ';
            let resp = await addFile(fileEle.files);

            let {path, size} = resp;
            window.lastVideoHash = path;
            window.lastVideoLength = Math.ceil(await getVideoLength(fileEle.files[0]));
            status.innerHTML = `<a href='${ipfsLink(path)}' target='_blank'>Video Uploaded (${prettySize(size)}) - ${lastVideoLength}s </a>`;
        }
    }

}

async function getVideoLength(file){
    let promise = new Promise((res, rej) => {

        try{
            var video = document.createElement('video');
            video.preload = 'metadata';
            video.onloadedmetadata = function() {
                window.URL.revokeObjectURL(video.src);
                res(video.duration);
            }
            video.src = URL.createObjectURL(file);
        }
        catch {
            rej(0);
        }

    });
    let result = await promise;
    return result;
}

async function uploadPoster(){
    let status = document.getElementById('status2');
    let fileEle = document.getElementById('file-2');
    status.innerText = 'Checking ... ';


    if(fileEle.files.length < 1){
        status.innerText = '⚠ Please choose a file first.';
    }
    else{
        let ext = fileEle.files[0].name.split('.').pop();
        if(['jpg','jpeg','png', 'webp'].includes(ext.toLowerCase()) == false){
            status.innerText = '⚠ Only JPG, PNG, WEBP files allowed.';
        }
        else{
            status.innerText = 'Uploading ... ';
            let resp = await addFile(fileEle.files);

            let {path, size} = resp;
            window.lastPosterHash = path;
            status.innerHTML = `<a href='${ipfsLink(path)}' target='_blank'>Poster Uploaded (${prettySize(size)}) </a>`;
        }
    }

}

async function addFile (files) {
    for await (const result of node.add(files)) {
        console.log(result);
        return result;
    }
}

