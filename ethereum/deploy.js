const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");
const path = require("path");
const fs = require("fs-extra");

const mnemonicPath = path.resolve(__dirname, "..", "mnemonic.txt");
const mnemonic = fs.readFileSync(mnemonicPath, "utf8");

const provider = new HDWalletProvider(
  mnemonic,
  "https://rinkeby.infura.io/v3/c523ed2b6e6d41a39da30e1f31dac95d"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: "0x" + compiledFactory.bytecode })
    .send({ from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};
deploy();
