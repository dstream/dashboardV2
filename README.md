<h1 align="center">
  <br>
  <img src="https://github.com/dstream/dashboardV2/blob/master/icons/icon-black.png" alt="Libertas Logo" height="300px"></center>
  <br>
  <br>
  Libertas
  <br>
  Your Word is now, Unstoppable.
  <br>
</h1>

## Deployed Mirrors

|SNo   	|Mirror Name  	|Link   	|
|:-:	|:-:	|:-:	|
|1   	|Main Site    	|[https://libertas.anudit.dev](https://libertas.anudit.dev)   	|
|2   	|Fleek   	|[https://libertas.on.fleek.co](https://libertas.on.fleek.co)   	|
|3   	|IPFS Gateway   	|[https://gateway.ipfs.io/ipfs/Qmam...copi](https://gateway.ipfs.io/ipfs/QmamEn5ZPUZhQ4qZ45Lkhv5FWBsLcS7HuvH55ej2ywcopi)   	|
|4   	|Unstoppable Domains   |[https://anuditnagar.crypto](https://anuditnagar.crypto)   	|
|5   	|TOR   	|[http://libertyk4ithhrl2.onion](http://libertyk4ithhrl2.onion)   	|

## Features

### 📽 Video Streaming
- Libertas allows content creators to upload and share their videos to the world.
- These videos can be free or sponsored by an advertiser allowing creators to get paid for every second their video is watched, directly into their account without any middleman.
- These videos can be published under a name (pseudonymously) or anonymously.

### 🎥 Live Streaming
- Libertas allows creators to have Live Streams powered by WebRTC and P2P to interact to their audience live.
- These Live Streams can be free or paid, allowing the ability to stream money from the watchers to the streamer in real time every sec. This ensures people only pay for what they watch.
- Libertas allows anyone to create one-on-one Video Calls to any Ethereum Address backed by P2P.


### ✍ Articles
- Libertas allows creators to share their articles, free or paid.
- Libertas has full support for Markdown.
- These articles can be published under a name (pseudonymously) or anonymously.
- Your Articles from other platforms like Medium can also be imported to Libertas directly and made unstoppable with two clicks.

### 🔐 Governance
- Content on Libertas can be disabled from earning and being shown on the UI by a public vote.
- The weight of the vote is determined by three factors,
	- Reputation - Past Voting History of the Address, Increases according to the the support.
	- Stake - ETH locked in the contract increases the value of your vote but a percent could get slashed if your on the different side of the majority vote.
	- Earnings - Creators earning more on the platform get a larger vote weight.
- These parameters can be voted on and updated, the governance contract can be also upgraded with new parameters.


### ⚡ Unstoppable, Censorship Resistant Platform
- Libertas is completely open source and the entire platform has been deployed on IPFS making your content available through a multitude of public gateways.
- Users can contribute to the platform by adding more public gateways that allow even greater accessibility to the source code helping better serve users across the globe.
- Your content is uploaded through an in-browser P2P IPFS node to upload your content ensuring even if all gateways are blocked. your content is unstoppable.
- The entire platform can also be run locally by simply downloading the latest release from GitHub ensuring nothing comes in the way of you and your audience.
- Libertas is also accessible via TOR to further strengthen privacy.


### ⛽ Gas Optimizations
- Libertas is integrated with Biconomy's meta-transaction infrastructure allowing for a seamless streaming experience.
- Libertas utilizes a utility token ANC which is backed by 1Inch's CHI Gas Token to get a rebate on the gas cost.


## Running Locally

### 1. Download a copy of the Platform.
Click to [Download](https://github.com/dstream/dashboardV2/archive/master.zip) the archive of the repository.

### 2. Unzip and enter directory.

### 3. Run a local webserver

3.1. Included Webserver
  1. On Windows - in the project folder, run `webserver <location> <port>`. Example,
      ```
      webserver . 80
      ```
  2. Head to `http://localhost:80`

3.2 Custom Webserver

  1. Run a Local Server.
      - If you have NodeJS installed,
      ```
      npm i -g static-server
      static-server -p 80 -o
      ```
      - If you have Python installed,
      ```
      python -m http.server 80
      ```
      - You can find other ways of running a local server in this [Gist](https://gist.github.com/willurd/5720255).
