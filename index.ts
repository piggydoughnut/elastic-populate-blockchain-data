const SmartChain = require ("komodo-rpc-js");

const config = {
  rpchost: "localhost",
  rpcport: 29405,
  rpcuser: process.env.RPC_USER,
  rpcpassword: process.env.RPC_PASS
};
 
const tokel = new SmartChain({ config });

const tokelRPC = tokel.rpc();
 
tokelRPC
  .tokenv2list()
  .then(info => {
    console.log(info);
  })
  .catch(error => {
    console.log(error);
    throw new Error(error);
  });
 