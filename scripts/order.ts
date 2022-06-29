const { ethers } = require("ethers");
const { getProvider } = require("./helpers");
import { Seaport } from "@opensea/seaport-js";
import { ItemType } from "@opensea/seaport-js/lib/constants";

const seaport = new Seaport(getProvider());

async function main() {
    console.log('seaport.ts start');
    
    const offerer2 = await getProvider().getSigner().getAddress();
    const offerer = "0xc805C99858EFfC2067E12Aba334f37DD0C98E9a4";
    const fulfiller = "0xf1d1e5D1456eE413BFCe04957529D103629b70ED";

    console.log("offerer4:", offerer2);
    console.log("offerer:", offerer);

    // const _couter = await seaport.getCounter(offerer);
    // const _orderStatus = await seaport.getOrderStatus(offerer);

    // console.log("_couter:", _couter);
    // console.log("_orderStatus:", _orderStatus);

    const { executeAllActions } = await seaport.createOrder({
        offer: [
            {
                itemType: ItemType.ERC721,
                token: "0x666aC919aF8a85939eE882dB41548D881A2E0a27",
                identifier: "1",
            }
        ],
        consideration: [
            {
                itemType: ItemType.ERC721,
                token: "0x666aC919aF8a85939eE882dB41548D881A2E0a27",
                identifier: "1",
                recipient: offerer,
				// amount: ethers.utils.parseEther("0.0001").toString()
            }
        ],
        },
        offerer
    );

    const order = await executeAllActions();
    console.log("order", order);

    const { executeAllActions: executeAllFulfillActions } = await seaport.fulfillOrder({
        order,
        accountAddress: fulfiller,
    });

    const transaction = executeAllFulfillActions()

    console.log('seaport.ts end');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });