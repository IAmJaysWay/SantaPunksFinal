const express = require("express");
const cors = require("cors");
const Moralis = require("moralis").default;
require("dotenv").config();
const app = express();
const port = 3000;
const ABI = require("./abi.json");

app.use(cors());

app.get("/getPunk", async (req, res) => {

  const { query } = req;

  const response = await Moralis.EvmApi.nft.getNFTMetadata({
    address: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
    tokenId: query.id,
  });

  const metadata = JSON.parse(response.raw.metadata);

  console.log(metadata);

  let bgColor = "blue";

  const forSaleRes = await Moralis.EvmApi.utils.runContractFunction({
    address: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
    functionName: "punksOfferedForSale",
    abi: ABI,
    params: {"":query.id},
  });

  if(forSaleRes.jsonResponse.isForSale){
    bgColor="red"
  }else{

    const hasBids = await Moralis.EvmApi.utils.runContractFunction({
      address: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
      functionName: "punkBids",
      abi: ABI,
      params: {"":query.id},
    });
  
    if(hasBids.jsonResponse.hasBid){
        bgColor="purple"
    };

  }

  res.send({ img: metadata.image, gender: metadata.description, bgColor: bgColor});
  
});

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for reqs`);
  });
});
