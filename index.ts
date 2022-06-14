const SmartChain = require ("komodo-rpc-js");
const { Client } = require('@elastic/elasticsearch')
const fs = require('fs');

const CERT = '/home/test/elasticsearch-8.2.2/config/certs/http_ca.crt'

const elasticclient = new Client({
    node: 'https://localhost:9200',
    auth: {
      username: 'elastic',
      password: 'changeme'
    },
    tls: {
      ca: CERT,
      rejectUnauthorized: false
    },
    maxRetries: 5,
    requestTimeout: 60000,
    sniffOnStart: true
  })

const config = {
  rpchost: "localhost",
  rpcport: 29405,
  rpcuser: process.env.RPC_USER,
  rpcpassword: process.env.RPC_PASS
};

const tokel = new SmartChain({ config });

const tokelRPC = tokel.rpc();


const processTokenInformation = async (token) => {
    console.log(token)
    const tokenInfo = await tokelRPC.tokenv2infotokel(token);
    console.log(tokenInfo)
}

const run = async () => {
    try {
        // we know a height where to start from, we iterate from there.
        const info = await tokelRPC.getinfo();
        console.log('current height: ', info.longestchain);
        console.log('blocks: ', info.blocks);
        
        const allTokens = await tokelRPC.tokenv2list(JSON.stringify({endHeight: info.blocks, beginHeight: info.blocks-1000}));
        console.log('Found tokens:', allTokens);
        let allTokensPromises = [];
        await Promise.all(allTokens.map(element => {
            elasticclient.index(
                    {
                        index: 'test-token-index',
                        document: element
    
                    }
              )
        }))
    } catch(error) {
        console.log(error);
        throw new Error(error);
    }
}

run();