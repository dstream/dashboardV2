async function getAllowance(_owner, _spender){
    let promise = new Promise((res, rej) => {

        TokenContract.methods.allowance(_owner, _spender).call(function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return parseFloat(web3.utils.fromWei(result));
}

async function increaseAllowance(_spender, _amount){
    let promise = new Promise((res, rej) => {

        TokenContract.methods.increaseAllowance(_spender, web3.utils.toWei(_amount.toString(), 'ether')).send({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return result;
}

async function decreaseAllowance(_spender, _amount){
    let promise = new Promise((res, rej) => {

        TokenContract.methods.decreaseAllowance(_spender, web3.utils.toWei(_amount.toString(), 'ether')).send({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return result;
}

async function setAllowance(_spender, _amount){
    let promise = new Promise((res, rej) => {

        TokenContract.methods.approve(_spender, web3.utils.toWei(_amount.toString(), 'ether')).send({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return result;
}

async function approve(_spender, _amount){
    let promise = new Promise((res, rej) => {

        TokenContract.methods.approve(_spender, web3.utils.toWei(_amount.toString(), 'ether')).send({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return result;
}

async function transfer(_to, _amount){
    let promise = new Promise((res, rej) => {

        TokenContract.methods.transfer(_to, web3.utils.toWei(_amount.toString(), 'ether')).send({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return result;
}

async function transferFrom(_from, _to, _amount){
    let promise = new Promise((res, rej) => {

        TokenContract.methods.transferFrom(_from, _to, web3.utils.toWei(_amount.toString(), 'ether')).send({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return result;
}

async function balanceOfToken(_address = web3.eth.accounts[0]){
    let promise = new Promise((res, rej) => {

        TokenContract.methods.balanceOf(_address).call(function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return parseFloat(web3.utils.fromWei(result));
}

async function getLastVideoID(){
    let promise = new Promise((res, rej) => {

        LibertasContract.methods.videoCount().call(function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return parseInt(result);
}

async function watchVideo(_vid){
    let promise = new Promise((res, rej) => {

        LibertasContract.methods.watchVideo(_vid).send({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error){
                window.localTxnFired = true;
                res(true);
            }
            else{
                rej(false);
            }
        });

    });
    let result = await promise;
    return result;
}

async function updateStream(_connID,_isPaid,_duration,_rate,_title,_desc){
    let promise = new Promise((res, rej) => {

        LibertasContract.methods.startLiveStream(_connID,_isPaid,_duration,_rate,_title,_desc).send({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(true);
            else{
                rej(false);
            }
        });

    });
    let result = await promise;
    return result;
}

async function updateSponsor(_vID,_adID){
    let promise = new Promise((res, rej) => {

        LibertasContract.methods.selectSponsor(_vID,_adID).send({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(true);
            else{
                rej(false);
            }
        });

    });
    let result = await promise;
    return result;
}

async function endLiveStream(){
    let promise = new Promise((res, rej) => {

        LibertasContract.methods.endLiveStream().send({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(true);
            else{
                rej(false);
            }
        });

    });
    let result = await promise;
    return result;
}

async function joinLiveStream(_add){
    let promise = new Promise((res, rej) => {

        LibertasContract.methods.joinLiveStream(_add).send({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(true);
            else{

                rej(false);
            }
        });

    });
    let result = await promise;
    return result;
}

async function subscribe(_address){
    let promise = new Promise((res, rej) => {

        LibertasContract.methods.subscribe(_address).send({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(true);
            else{
                rej(false);
            }
        });

    });
    let result = await promise;
    return result;
}

async function unsubscribe(_address){
    let promise = new Promise((res, rej) => {

        LibertasContract.methods.unsubscribe(_address).send({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(true);
            else{
                rej(false);
            }
        });

    });
    let result = await promise;
    return result;
}

async function updateCreatorName(_name){
    let promise = new Promise((res, rej) => {

        LibertasContract.methods.updateCreatorName(_name).send({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return result;
}

async function updateCreatorImage(_name){
    let promise = new Promise((res, rej) => {

        LibertasContract.methods.updateCreatorImage(_name).send({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        })
        .on('confirmation', function(confirmationNumber){
            if (confirmationNumber == 0){
                notyf.success(`Creator Image Updated.`);
            }
        })
        .on('error', (e)=>{
            notyf.error( `Txn Error ${e.message}`);
        });

    });
    let result = await promise;
    return result;
}

async function updateVideoTitle(_vid, _title){
    let promise = new Promise((res, rej) => {

        LibertasContract.methods.updateVideoTitle(_vid, _title).send({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        })
        .on('confirmation', function(confirmationNumber){
            if (confirmationNumber == 0){
                notyf.success(`Video Title Updated.`);
            }
        })
        .on('error', (e)=>{
            notyf.error( `Txn Error ${e.message}`);
        });

    });
    let result = await promise;
    return result;
}

async function updateVideoDescription(_vid, _desc){
    let promise = new Promise((res, rej) => {

        LibertasContract.methods.updateVideoDescription(_vid, _desc).send({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        }).on('confirmation', function(confirmationNumber){
            if (confirmationNumber == 0){
                notyf.success(`Video Description Updated.`);
            }
        })
        .on('error', (e)=>{
            notyf.error( `Txn Error ${e.message}`);
        });

    });
    let result = await promise;
    return result;
}

async function updateVideoThumbnail(_vid, _thumbnailHash){
    let promise = new Promise((res, rej) => {

        LibertasContract.methods.updateVideoThumbnail(_vid, _thumbnailHash).send({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        }).on('confirmation', function(confirmationNumber){
            if (confirmationNumber == 0){
                notyf.success(`Video Description Updated.`);
            }
        })
        .on('error', (e)=>{
            notyf.error( `Txn Error ${e.message}`);
        });

    });
    let result = await promise;
    return result;
}

async function getVideoCnt(_address){
    let promise = new Promise((res, rej) => {

        LibertasContract.methods.getVideoCnt(_address).call({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return result;
}

async function getVideoStreamIDs(_vid){
    let promise = new Promise((res, rej) => {

        LibertasContract.methods.getVideoStreamIDs(_vid).call({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return result;
}

async function getAdvertiserID(_address){
    let promise = new Promise((res, rej) => {

        LibertasContract.methods.advertiserToId(_address).call({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return result;
}

async function getSponsorList(_vid){
    let promise = new Promise((res, rej) => {

        LibertasContract.methods.getSponsors(_vid).call({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return result;
}

async function registerAdv(_name){
    let promise = new Promise((res, rej) => {

        LibertasContract.methods.createAdvertiser(_name).send({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return result;
}

async function createAd(_imageHash, _link, _category, _amountPerSecond, _budget){
    let promise = new Promise((res, rej) => {

        LibertasContract.methods.createAd(_imageHash, _link, _category, _amountPerSecond, _budget).send({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return result;
}

async function getAdvAdID(_address, _index){
    let promise = new Promise((res, rej) => {

        LibertasContract.methods.advertiserToAdIDs(_address, _index).call({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return parseInt(result);
}

async function advertiserToVideoToAd(_advAddress, _vid){
    let promise = new Promise((res, rej) => {

        LibertasContract.methods.advertiserToVideoToAd(_advAddress, _vid).call({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return parseInt(result);
}

async function getAdvAdCnt(_address){
    let promise = new Promise((res, rej) => {

        LibertasContract.methods.getAdvAdCnt(_address).call({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return parseInt(result);
}

async function getFromFaucet(_address){
    let promise = new Promise((res, rej) => {

        FaucetContract.methods.getWei().send({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return parseInt(result);
}

async function getVideoIDsByAddress(_address){
    let promise = new Promise((res, rej) => {

        LibertasContract.methods.getVideoIDsByAddress(_address).call({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return result;
}

async function sponsorVideo(_vID, _adID){
    let promise = new Promise((res, rej) => {

        LibertasContract.methods.sponsorVideo(_vID.toString(), _adID.toString()).send({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return result;
}

async function withdrawFromStream(_streamID, _amt){
    let promise = new Promise((res, rej) => {

        SablierContract.methods.withdrawFromStream(_streamID.toString(), _amt.toString()).send({from:web3.currentProvider.selectedAddress}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });
    let result = await promise;
    return result;
}

async function hasWatchedVideo(_address, _videoID){
    let promise = new Promise((res, rej) => {

        LibertasContract.getPastEvents('VideoView', {
            filter: {_watcher: _address, _videoID: _videoID.toString()},
            fromBlock: 0,
            toBlock: 'latest'
        })
        .then((events) => {
            res(Boolean(events.length));
        })
        .catch(function(error){
           rej(error);
        });

    });
    let result = await promise;
    return result;
}


async function watchedVideo(_videoID){
    let promise = new Promise((res, rej) => {

        LibertasContract.getPastEvents('VideoView', {
            filter: {_videoID: _videoID.toString()},
            fromBlock: 0,
            toBlock: 'latest'
        })
        .then((events) => {
            let watchers= [];
            events.forEach((event)=>{
                watchers.push(event.returnValues._watcher);
            })
            res(watchers);
        })
        .catch(function(error){
           rej(error);
        });

    });
    let result = await promise;
    return result;
}

async function getStreamBalance(_streamID, _add) {

    let promise = new Promise((res, rej) => {
        SablierContract.methods.balanceOf(_streamID.toString(), _add).call(function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });

    let result = await promise;
    return parseFloat(web3.utils.fromWei(result));
}

async function getEarnings(_vID) {

    let promise = new Promise(async (res, rej) => {
        let streamIDs = await getVideoStreamIDs(_vID);
        let earnings = [];
        streamIDs.forEach(async (streamID)=>{
            let resp = await getStreamBalance(streamID, web3.currentProvider.selectedAddress);
            earnings.push(resp);
        })
        res(earnings);
    });

    let result = await promise;
    return result;
}

async function getVideoByIndex(index) {

    let promise = new Promise((res, rej) => {

        LibertasContract.methods.videos(index).call(function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });

    let result = await promise;

    let respData = {
        'videoID':parseInt(result[0]),
        'isEnabled':result[1],
        'owner':result[2],
        'videoHash':result[3],
        'thumbnailHash':result[4],
        'title':result[5],
        'description':result[6],
        'duration':parseInt(result[7]),
        'uploadTime':new Date(parseInt(result[8])*1000),
        'category':parseInt(result[9]),
    }
    return respData;
}

async function getVideoExtraByIndex(index) {

    let promise = new Promise((res, rej) => {
        LibertasContract.methods.videosExtra(index).call(function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });

    let result = await promise;
    let respData = {
        'videoID':parseInt(result[0]),
        'availableSponsorsCnt':parseInt(result[1]),
        'activeSponsor':result[2],
        'activeAdID':parseInt(result[3]),
        'viewCnt':parseInt(result[4]),
    }
    return respData;
}

async function getAd(_adID) {

    let promise = new Promise((res, rej) => {
        LibertasContract.methods.ads(_adID).call(function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });

    let result = await promise;

    let respData = {
        'adID':parseInt(result[0]),
        'isEnabled':result[1],
        'owner':result[2],
        'imageHash':result[3],
        'link':result[4],
        'category':parseInt(result[5]),
        'amountPerSecond':parseFloat(web3.utils.fromWei(result[6])),
        'budget':parseFloat(web3.utils.fromWei(result[7])),
    }
    return respData;
}

async function getCreatorDataByVideo(_vid) {

    let promise = new Promise((res, rej) => {
        LibertasContract.methods.getCreatorDataByVideo(_vid).call(function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });

    let result = await promise;

    let respData = {
        'name':result[0],
        'imageHash':result[1],
        'subscriberCnt':parseInt(result[2]),
        'views':parseInt(result[3])
    }
    return respData;
}

async function getCreatorData(_address) {

    let promise = new Promise((res, rej) => {
        LibertasContract.methods.creatorData(_address).call(function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });

    let result = await promise;

    let respData = {
        'name':result[0],
        'imageHash':result[1],
        'subscriberCnt':parseInt(result[2]),
        'views':parseInt(result[3])
    }
    return respData;
}

async function getLiveStream(_address) {

    let promise = new Promise((res, rej) => {
        LibertasContract.methods.liveStreams(_address).call(function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });

    let result = await promise;

    let respData = {
        'isEnabled':result[0],
        'isPaid':result[1],
        'title':result[2],
        'desc':result[3],
        'watchCount':parseInt(result[4]),
        'duration':parseInt(result[5]),
        'rate':parseInt(result[6]),
        'connID':result[7],
    }
    return respData;
}

async function getAdvertiser(_advID) {

    let promise = new Promise((res, rej) => {
        LibertasContract.methods.advertisers(_advID.toString()).call(function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });

    let result = await promise;

    let respData = {
        'advertiserID':parseInt(result[0]),
        'isEnabled':result[1],
        'billingAccount':result[2],
        'name':result[3],
        'reportCnt':parseInt(result[4])
    }
    return respData;
}

// ENS Functions

async function Reverse(address) {
    let web3temp = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/97c8bf358b9942a9853fab1ba93dc5b3"));
    var lookup=address.toLowerCase().substr(2) + '.addr.reverse'
    var ResolverContract=await web3temp.eth.ens.getResolver(lookup);
    var nh=ethEnsNamehash.hash(lookup);
    var name=await ResolverContract.methods.name(nh).call()
    return name;
}

// Libertas Articles Functions

async function getArticle(_articleID) {

    let promise = new Promise((res, rej) => {
        LibertasArticlesContract.methods.Articles(_articleID.toString()).call(function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });

    let result = await promise;
    let respData = {
        ID: parseInt(result[0]),
        controller: result[1],
        category: parseInt(result[2]),
        active: result[3],
        published: result[4],
        dataHash: result[5],
        lastUpdated: parseInt(result[6]),
        isPaid: result[7],
        cost: parseFloat(web3.utils.fromWei(result[8].toString())),
        earnings: parseFloat(web3.utils.fromWei(result[9].toString())),
    }
    return respData;
}

function calcNameCost(name){
    let _length = name.length;
    let costMultiplier = 100;
    if(_length > 10){
        return 0;
    }
    else{
        let amount = ((10**18) / (_length**2))*costMultiplier;
        return web3.utils.fromWei(amount.toString());
    }
}

async function pseudonymTaken(_name) {

    let promise = new Promise((res, rej) => {
        LibertasArticlesContract.methods.pseudonymTaken(_name).call(function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });

    let result = await promise;
    return result;
}

async function getLastArticleID() {

    let promise = new Promise((res, rej) => {
        LibertasArticlesContract.methods.lastArticleID().call(function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });

    let result = await promise;
    return parseInt(result);
}

async function getArticleIDs(_userAddress) {

    let promise = new Promise((res, rej) => {
        LibertasArticlesContract.methods.getArticleIDs(_userAddress).call(function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });

    let result = await promise;
    return result;
}

async function addressToPseudonym(_userAddress) {

    let promise = new Promise((res, rej) => {
        LibertasArticlesContract.methods.addressToPseudonym(_userAddress).call(function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });

    let result = await promise;
    return result;
}

async function claimPseudonym(_name) {

    let promise = new Promise((res, rej) => {
        LibertasArticlesContract.methods.claimPseudonym(_name).send({from:web3.currentProvider.selectedAddress, value: web3.utils.toWei(calcNameCost(_name), 'ether')}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });

    let result = await promise;
    return result;
}

async function createArticle(_published, _dataHash, _isPaid, _cost, _category) {

    let promise = new Promise((res, rej) => {
        LibertasArticlesContract.methods.claimPseudonym(_published, _dataHash, _isPaid, _cost, _category)
        .send({from:web3.currentProvider.selectedAddress, value: web3.utils.toWei(_cost, 'ether')}, function(error, result) {
            if (!error)
                res(result);
            else{
                rej(error);
            }
        });

    });

    let result = await promise;
    return result;
}

