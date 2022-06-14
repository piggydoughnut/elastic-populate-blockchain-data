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
  .getinfo()
  .then(info => {
    console.log(info);
  })
  .catch(error => {
    console.log(error);
    throw new Error(error);
  });
 
tokelRPC
  .listunspent(6, 9999999, [
    "RPS3xTZCzr6aQfoMw5Bu1rpQBF6iVCWsyu",
    "RBtNBJjWKVKPFG4To5Yce9TWWmc2AenzfZ"
  ])
  .then(outs => {
    console.log(outs);
  })
  .catch(error => console.log(error));