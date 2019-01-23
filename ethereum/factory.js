import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";
// const path = require("path");
// const fs = require("fs");

// const addressPath = path.resolve(__dirname, "..", "ADDRESS.txt");
// const address = fs.readFileSync(addressPath, "utf8");

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x26da9bbf77a058274d82b2b27A4aF7080BeBCdAb"
);

export default instance;
