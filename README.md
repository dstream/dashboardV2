<h1 align="center">
  <br>
  <img src="https://github.com/dstream/dashboard/blob/master/icons/icon-black.png" alt="Logo Libertas" height="300px"></center>
  <br>
  <br>
  Libertas
  <br>
  Your word is now Unstoppable.
  <br>
</h1>

## Deployed Mirrors

|SNo   	|Mirror Name  	|Link   	|
|:-:	|:-:	|:-:	|
|1   	|Main Site    	|[https://libertas-test.anudit.dev](https://libertas-test.anudit.dev)   	|
|2   	|Fleek   	|[https://libertas-test.on.fleek.co](https://libertas-test.on.fleek.co)   	|
|3   	|IPFS Gateway   	|[https://gateway.ipfs.io/ipfs/QmT...Ecd](https://gateway.ipfs.io/ipfs/QmTPNaN4KJoJ1WCDeHX3XBRbFSfggrX2Erx9wKHtkbLEcd)   	|
|4   	|TOR   	|[http://libertyk4ithhrl2.onion](http://libertyk4ithhrl2.onion)   	|

## Features

### 1. Video Streaming
- Liberatas allows content creators to upload and share their videos to the world.
- These videos can be free or sponsored by an advertiser allowing creators to get paid for every second their video is watched, directly into their account without any middleman.
### 2. P2P Live Streaming & Calling
- Libertas allows creators to have Live Streams powered by WebRTC and P2P to talk to their audience live.
- These Live Streams can be free or paid, allowing the ability to stream money from the watchers to the streamer in real time every sec. This ensures people only pay for what they watch.
- Libertas allows anyone to create one-on-one Video Calls to any Ethereum Address backed by p2p.
### 3. Unstoppable, Censorship Resistant Platform
 ![Status](https://img.shields.io/badge/dynamic/json?url=https://run.mocky.io/v3/e11587e0-1685-4ecf-a884-6d2969ef5a6a&label=Live%20GFW%20Test&query=$.v2response.httpresults.description&color=success?style=flat-square&logo=json&cacheSeconds=3600)
- Libertas is completely *open source* and the entire platform has been deployed on IPFS making your content available through a multitude of public gateways.
- Users can contribute to the platform by adding more public gateways that allow even greater accessibility to the source code helping better serve users across the globe.
- Your content is uploaded through an in-browser IPFS node to upload your content ensuring even if all gateways are blocked. your content is unstoppable.
- The entire platform can also be run locally by simply downloading the latest release from GitHub ensuring nothing comes in the way of you and your audience.
- Libertas is also accessible via TOR to further strengthen privacy.
### 4. Gas Optimized
- Libertas is integrated with Biconomy's meta-transaction infrastructure allowing for a seamless streaming experience.
- Libertas utilizes a utility token ANC which is backed by 1inch's CHI Token to get a rebate on the gas cost.


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
