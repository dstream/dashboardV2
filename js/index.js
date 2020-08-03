let TokenContract;
let SablierContract;
let LibertasContract;
let LibertasArticlesContract;
let Biconomy = window.Biconomy;
let biconomy;

if (typeof window.ethereum !== 'undefined') {
    ethereum.autoRefreshOnNetworkChange = false;
}

// Change Favicon based on the system theme.
document.addEventListener("DOMContentLoaded", ()=>{
    matcher = window.matchMedia('(prefers-color-scheme: dark)');
    let lightSchemeIcon = document.querySelector('link#light-scheme-icon');
    let darkSchemeIcon = document.querySelector('link#dark-scheme-icon');
    if (matcher.matches) {
        lightSchemeIcon.remove();
        document.head.append(darkSchemeIcon);
    } else {
        document.head.append(lightSchemeIcon);
        darkSchemeIcon.remove();
    }
});

window.addEventListener('load', async () => {

    if (window.web3) {

        web3.version.getNetwork((err, netId) => {
            if(netId != 80001){
                alert("Please switch to https://rpc-mumbai.matic.today");
            }
        });


        try {
            let options = {
                apiKey: 'zgMOuSoVm.ee90efe8-31d3-4416-88f0-cae22db150f5',
                strictMode: true,
                debug: true
            };

            biconomy = new Biconomy(web3.currentProvider, options);
            window.web3 = new Web3(biconomy);

            TokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
            SablierContract = new web3.eth.Contract(sablierABI, sablierAddress);
            LibertasContract = new web3.eth.Contract(libertasABI, libertasAddress);
            FaucetContract = new web3.eth.Contract(faucetABI, faucetAddress);
            LibertasArticlesContract = new web3.eth.Contract(libertasArticlesABI, libertasArticlesAddress)

            biconomy.onEvent(biconomy.READY, async () => {
                console.table(biconomy.dappAPIMap);
                init();
            }).onEvent(biconomy.ERROR, (error, message) => {
                console.log("Mexa Error", error);
            });

        } catch (error) {
            console.log(error);
            alert(error);
        }

    } else{
        window.web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-mumbai.matic.today'));
        TokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
        SablierContract = new web3.eth.Contract(sablierABI, sablierAddress);
        LibertasContract = new web3.eth.Contract(libertasABI, libertasAddress);
        FaucetContract = new web3.eth.Contract(faucetABI, faucetAddress);
        LibertasArticlesContract = new web3.eth.Contract(libertasArticlesABI, libertasArticlesAddress)
        init();
        alert("We Recommend Getting a Web3 Compatible browser like MetaMask.");
    }
});

async function requireLogin(){

    if (window.ethereum != undefined){
        let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        if(!biconomy.isLogin) {
            await biconomyLogin(accounts[0]);
        }
    }
    else{
        await web3.currentProvider.enable();
        if(!biconomy.isLogin) {
            await biconomyLogin();
        }
    }


}

async function biconomyLogin(account = null){
	let promise = new Promise(async (res, rej) => {

		try{
            // let userAddress = await web3.eth.getAccounts().then((data)=>{return data[0]});
            let userAddress = account === null ? web3.currentProvider.selectedAddress : account;
            console.log('Logging into Bcnmy', userAddress);
			biconomy.login(userAddress, (error, response) => {
				if(response.userContract) {
					console.log("Existing User Contract: " + response.userContract);
					res(true);
				} else if(response.transactionHash) {
					console.log("New User");
					res(true);
				}
			});

		 } catch(error) {
			console.log(`Error Code: ${error.code} Error Message: ${error.message}`);
			rej(false);
		 }

    });
	let result = await promise;
    console.log(result);
    return result;
}

function getParameterByName(name) {
    url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const ipfsServerList = [
    'https://ipfs.io/ipfs/',
    'https://ipfs.infura.io/ipfs/',
    'https://gateway.ipfs.io/ipfs/',
    'https://ipfs.fleek.co/ipfs/',
    'https://ninetailed.ninja/ipfs/',
	'https://ipfs.oceanprotocol.com/ipfs/'
]

const ipfsLink = _ipfsHash => {
    return _ipfsHash == '' ? './assets/notfound.png' : `${ipfsServerList[0]}${_ipfsHash}`;
}

const ipfsLinks = _ipfsHash => {
    let links = [];
    for (var i = 0, len = ipfsServerList.length; i < len; i++) {
        links.push(_ipfsHash == '' ? './assets/notfound.png' : `${ipfsServerList[i]}${_ipfsHash}`)
    }
    return links;
}

const withHttps = url => !/^https?:\/\//i.test(url) ? `https://${url}` : url;

const catMapping = {
    1:'Technology',
    2:'Entertainment',
    3:'Design',
    4:'Ethereum',
}
const catToText = id => id > 0 && id < Object.keys(catMapping).length ? catMapping[id] : 'Invalid Cat';


function prettyDate (dateFuture){
    var dateNow = Date.now();

    var seconds = Math.floor((dateNow - dateFuture)/1000);
    var minutes = Math.floor(seconds/60);
    var hours = Math.floor(minutes/60);
    var days = Math.floor(hours/24);

    hours = hours-(days*24);
    minutes = minutes-(days*24*60)-(hours*60);
    seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

    let st1 = days>0? `${days}d` : '';
    let st2 = hours>0? `${hours}h` : '';
    let st3 = minutes>0? `${minutes}m` : '';
    let st4 = seconds>0? `${seconds}s` : '';
    return `${st1} ${st2} ${st3} ${st4} ago`;
}


function prettySize(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function validHeader(_url) {
    return fetch(_url, {method: 'HEAD', mode: 'no-cors'})
    .then((response) => {return true})
    .catch((e)=>{return false});
}


function trimAddress(_add, l=3) {
    return _add.slice(0, 2+l) +'...' +_add.slice(_add.length-l);
}

function arrSum(arr){
    total = 0;
    arr.forEach(function(key){
        total = total + key;
    });
    return total;
}

function formatAddress(address = '0x784af89Db31632583eF2b12994341449E8c28860'){
    var res = address.match(/^0x[a-fA-F0-9]{40}$/g);
    if (Boolean(res.length) == true){
        return trimAddress(address);
    }
    // else {
    //     return Reverse(address);
    // }
    return trimAddress(address);;
}

function hideLoader() {
    var fadeTarget = document.querySelector('.loader-div');
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            document.querySelector('.loader-div').remove();
            clearInterval(fadeEffect);
        }
    }, 100);
}

function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        return clipboardData.setData("Text", text);

    }
    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");
        }
        catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        }
        finally {
            document.body.removeChild(textarea);
        }
    }
}
