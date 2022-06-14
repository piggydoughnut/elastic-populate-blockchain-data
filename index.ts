const SmartChain = require ("komodo-rpc-js");

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
    const tokenInfo = await tokelRPC.tokenv2infotokel(token.tokenid);
    console.log(tokenInfo)
}

async () => {
    try {
        // we know a height where to start from, we iterate from there.
        const info = await tokelRPC.getinfo();
        console.log('current info', info);
        const allTokens = await tokelRPC.tokenv2list();
        console.log(allTokens);
        let allTokensPromises;
        await Promise.all(allTokens.map(element => {
            allTokensPromises.push(processTokenInformation(element));
        }))
    } catch(error) {
        console.log(error);
        throw new Error(error);
    }
}