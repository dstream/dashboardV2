async function liveSetup(){

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  if (window.existingCall){
    window.existingCall.close()
  }
  // window.peer = new Peer({ debug: 3, config: {'iceServers': [
  //   { url: 'stun:stun.ekiga.net' },
  //   { url: 'stun:stun1.l.google.com:19302' },
  //   { url: 'stun:stun2.l.google.com:19302' },
  //   { url: 'stun:stun3.l.google.com:19302' },
  //   { url: 'stun:stun4.l.google.com:19302' },
  //   { url: 'stun:stun01.sipphone.com' },
  //   { url: 'stun:stun.l.google.com:19302' }
  //   ]}
  // });

  var peer = new Peer('someid', {
    secure: true,
    host: 'pjs-server.herokuapp.com',
    port: 443,
  });


  console.log(peer);

  peer.on('open', function(){
    swal.fire('Connected');
    $('#my-id').text(peer.id);
    callCreator()
  });

  peer.on('error', function(err){
    alert(err.message);
    // Return to step 2 if error occurs
    step2();
  });

  peer.on('disconnected', function(err){
    alert("Retrying...");

    // Return to step 2 if error occurs
    step2();
  });
  peer.on('close', function(err){
    console.log(err);
    alert('Connection Declined')
    // peer.destroy()
    peer = new Peer();
    step2();
  });

  $('#end-call').click(function(){
    window.existingCall.close();
    step2();
  });

  // step2();
  step1()
}

function callCreator(){
  console.log(`calling ${streamData.connID}`);
  var call = peer.call(streamData.connID, window.localStream);
  step3(call);
}


function step1 () {
  // Get audio/video stream
  navigator.getUserMedia({audio: true, video: true}, function(stream){
    // const video = document.getElementById('my-video');
    // video.srcObject = stream;
    window.localStream = stream;
    step2();
  }, function(){ $('#step1-error').show(); });
}


function step2 () {
  $('#step1, #step3').hide();
  $('#step2').show();

}

function step3 (call) {
  // Hang up on an existing call if present
  if (window.existingCall) {
    window.existingCall.close();
  }

  // Wait for stream on the call, then set peer video display
  call.on('stream', function(stream){
    console.log('combining streams');
    const video = document.getElementById('their-video');
    video.srcObject = stream;
  });

  // UI stuff
  window.existingCall = call;
  // $('#their-id').text(call.peer);
  call.on('close', step2);
  $('#step1, #step2').hide();
  $('#step3').show();

}

