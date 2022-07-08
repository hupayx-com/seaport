const { ethers } = require("ethers");
const { getProvider } = require("./helpers");
import { Seaport } from "../js/seaport-js";
import { Item } from "../js/seaport-js/lib/types";
import { balanceOf } from "../js/seaport-js/lib/utils/balance";
import { ItemType, OrderType } from "../js/seaport-js/lib/constants";
import { BigNumber } from "bignumber.js";

const seaport = new Seaport(getProvider());

async function main() {
    console.log('seaport.ts start');
    
    const offerer2 = await getProvider().getSigner().getAddress();
    const offerer = "0xc805C99858EFfC2067E12Aba334f37DD0C98E9a4";
    const fulfiller = "0xf1d1e5D1456eE413BFCe04957529D103629b70ED";
    new BigNumber(1);
    const orderItem:Item = {
        itemType: ItemType.ERC721,
        token: "0x666aC919aF8a85939eE882dB41548D881A2E0a27",
        identifierOrCriteria: "1",
        startAmount: "2",
        endAmount:  "5"
    };

    const balance = await balanceOf(offerer, orderItem, getProvider())

    console.log("balance3:", balance);
    console.log('balance.toNumber():', ethers.BigNumber.from(balance).toNumber());

    console.log('seaport.ts end');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });