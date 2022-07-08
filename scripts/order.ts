const { ethers } = require("ethers");
const { getProvider, getEnvVariable } = require("./helpers");
import { expect } from "chai";
import { Seaport } from "../js/seaport-js";
import { ItemType, MAX_INT, NO_CONDUIT, OrderType, CROSS_CHAIN_SEAPORT_ADDRESS } from "../js/seaport-js/lib/constants";
import { SeaportABI } from "../js/seaport-js/lib/abi/Seaport";
import { generateRandomSalt } from "../js/seaport-js/lib/utils/order";
import { ApprovalAction, CreateOrderAction, SeaportContract } from "../js/seaport-js/lib/types";
import { formatBytes32String } from "ethers/lib/utils";
import {
    Seaport as SeaportContract2,
  } from "../js/seaport-js/lib/typechain/Seaport";

const provider = getProvider();
const seaport = new Seaport(provider);

async function main() {
    console.log('seaport.ts start');
    console.log('CROSS_CHAIN_SEAPORT_ADDRESS2:', CROSS_CHAIN_SEAPORT_ADDRESS);

    const offerer2 = await provider.getSigner().getAddress();
    // const offerer = "0xc805C99858EFfC2067E12Aba334f37DD0C98E9a4";
    const fulfiller = "0xf1d1e5D1456eE413BFCe04957529D103629b70ED";

    const offerer = {address: "0xc805C99858EFfC2067E12Aba334f37DD0C98E9a4"};
    const zone = {address: getEnvVariable("NFT_CONTRACT_ADDRESS")};

    console.log("offerer3:", offerer2);
    // console.log("offerer:", offerer);

    // const _couter = await seaport.getCounter(offerer);
    // const _orderStatus = await seaport.getOrderStatus(offerer);

    // console.log("_couter:", _couter);
    // console.log("_orderStatus:", _orderStatus);


    // const { seaportContract, seaport, testErc721 } = fixture;

    // const [offerer] = await ethers.getSigners();
    const nftId = "1";
    // await testErc721.mint(offerer.address, nftId);
    const startTime = "0";
    const endTime = MAX_INT.toString();
    const salt = generateRandomSalt();
    const tokenAddress = getEnvVariable("NFT_CONTRACT_ADDRESS");
    console.log('tokenAddress:', tokenAddress); 
    console.log('ethers.utils.parseEther("0.001").toString():', ethers.utils.parseEther("0.001").toString());
    console.log('BlockNumber:', await provider.getBlockNumber());

    const daiContract = new ethers.Contract(tokenAddress, SeaportABI, provider);
    await daiContract.name().then((result:String) => {console.log(result);});

    await daiContract.ownerOf(1).then((result:String) => {console.log(result);});

    // daiContract.isApprovedForAll(offerer.address, operator).then(function (isApprovedForAll) {
    //   // Setting to the max int to consolidate types and simplify
    //   return isApprovedForAll ? constants_1.MAX_INT : ethers_1.BigNumber.from(0);


    // console.log('daiContract.name:', daiContract.name());
    // const _result = await daiContract.name()
    // .then((result) => { return result; })
    // .catch(err => { return err; });
    
    // const SeaportFactory = await ethers.getContractFactory("Seaport");
    // console.log(SeaportFactory);
    
    const { actions } = await seaport.createOrder({
      startTime,
      endTime,
      salt,
      offer: [
        {
          itemType: ItemType.ERC721,
          token: tokenAddress,
          identifier: nftId,
        },
      ],
      consideration: [
        {
          amount: ethers.utils.parseEther("0.000000001").toString(),
          recipient: offerer.address,
        },
      ],
      // 2.5% fee
    //   fees: [{ recipient: zone.address, basisPoints: 250 }],
    });

    console.log('actions.length:', actions.length); 

    // console.log("order", order);

    const approvalAction = actions[0] as ApprovalAction;

    expect(approvalAction).to.be.deep.equal({
      type: "approval",
      token: tokenAddress,
      identifierOrCriteria: nftId,
      itemType: ItemType.ERC721,
      transactionMethods: approvalAction.transactionMethods,
      operator: getEnvVariable("CONTRACT_ADDRESS_Seaport"),
    });

    await approvalAction.transactionMethods.transact();

    // NFT should now be approved
    // expect(
    //   await testErc721.isApprovedForAll(
    //     offerer,
    //     getEnvVariable("CONTRACT_ADDRESS_Seaport")
    //   )
    // ).to.be.true;

    // const createOrderAction = actions[1] as CreateOrderAction;
    // const order = await createOrderAction.createOrder();

    // expect(createOrderAction.type).to.equal("create");
    // expect(order).to.deep.equal({
    //   parameters: {
    //     consideration: [
    //       {
    //         // Fees were deducted
    //         endAmount: ethers.utils.parseEther("9.75").toString(),
    //         identifierOrCriteria: "0",
    //         itemType: ItemType.NATIVE,
    //         recipient: offerer.address,
    //         startAmount: ethers.utils.parseEther("9.75").toString(),
    //         token: ethers.constants.AddressZero,
    //       },
    //       {
    //         endAmount: ethers.utils.parseEther(".25").toString(),
    //         identifierOrCriteria: "0",
    //         itemType: ItemType.NATIVE,
    //         recipient: zone.address,
    //         startAmount: ethers.utils.parseEther(".25").toString(),
    //         token: ethers.constants.AddressZero,
    //       },
    //     ],
    //     endTime,
    //     offer: [
    //       {
    //         endAmount: "1",
    //         identifierOrCriteria: nftId,
    //         itemType: ItemType.ERC721,
    //         startAmount: "1",
    //         token: tokenAddress,
    //       },
    //     ],
    //     offerer: offerer.address,
    //     orderType: OrderType.FULL_OPEN,
    //     salt,
    //     startTime,
    //     totalOriginalConsiderationItems: 2,
    //     zone: ethers.constants.AddressZero,
    //     zoneHash: formatBytes32String("0"),
    //     conduitKey: NO_CONDUIT,
    //     counter: 0,
    //   },
    //   signature: order.signature,
    // });

    // const isValid = await seaportContract
    //   .connect(randomSigner)
    //   .callStatic.validate([
    //     {
    //       parameters: {
    //         ...order.parameters,
    //         totalOriginalConsiderationItems:
    //           order.parameters.consideration.length,
    //       },
    //       signature: order.signature,
    //     },
    //   ]);

    // expect(isValid).to.be.true;




    // const { executeAllActions } = await seaport.createOrder({
    //     offer: [
    //         {
    //             itemType: ItemType.ERC721,
    //             token: "0x666aC919aF8a85939eE882dB41548D881A2E0a27",
    //             identifier: "1",
    //         }
    //     ],
    //     consideration: [
    //         {
    //             itemType: ItemType.ERC721,
    //             token: "0x666aC919aF8a85939eE882dB41548D881A2E0a27",
    //             identifier: "1",
    //             recipient: offerer,
	// 			// amount: ethers.utils.parseEther("0.0001").toString()
    //         }
    //     ],
    //     },
    //     offerer
    // );

    // const order = await executeAllActions();
    // console.log("order", order);

    // const { executeAllActions: executeAllFulfillActions } = await seaport.fulfillOrder({
    //     order,
    //     accountAddress: fulfiller,
    // });

    // const transaction = executeAllFulfillActions()

    console.log('seaport.ts end');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });