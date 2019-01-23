import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  web3 = new Web3(window.web3.currentProvider);
} else {
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/c523ed2b6e6d41a39da30e1f31dac95d"
  );
  web3 = new Web3(provider);
}
export default web3;
