const { task } = require("hardhat/config");
const { getContract, getContractName, csvToJSON, getAccount } = require("./helpers");
const fs = require("fs");
const ethers = require("@nomiclabs/hardhat-ethers");

task("transferBulksend", "Mints from the NFT contract")
.addParam("filePath", "The file path of tokens to send")
.setAction(async function (taskArgs, hre) {
	console.log('filePath : ' + taskArgs.filePath);
    const csv = fs.readFileSync(taskArgs.filePath);
    const records = csvToJSON(csv.toString());

	if (records[records.length-1].Address == '') {
		records.splice(records.length-1, 1);
	}

    const from = getAccount().address;
	const contract = await getContract(hre);
	for (let toObj of records) {
		const transactionResponse = await contract.transfer(from, toObj["Address"], toObj["Token Id"], {
			gasLimit: 500_000,
		});
		console.log(`Transaction Hash: ${transactionResponse.hash}`);
	}
});

task("transfer", "Transfers `tokenId` or `amount` token to `to`")
.addOptionalParam("name", "The contract name of send a token")
.addPositionalParam("to", "The account address of receive a token")
.addPositionalParam("tokenIdOrAmount", "The id or amount of a token to send")
.setAction(async function (taskArgs, hre) {
	const contractName = getContractName(taskArgs.name);
	console.log('contract name : ' + contractName);
	console.log('to : ' + taskArgs.to);
	console.log('tokenIdOrAmount : ' + taskArgs.tokenIdOrAmount);

	const contract = await getContract(hre, contractName);
	const txRes = await contract.transfer(taskArgs.to, taskArgs.tokenIdOrAmount, {
		gasLimit: 500_000,
	});
	console.log(`Transaction Hash: ${txRes.hash}`);

	if (contractName == 'ConvertTokenToCoin') {
		await contract.approve(taskArgs.to, taskArgs.tokenIdOrAmount);
	}
});

task("transferFrom", "Transfers `tokenId` token from `from` to `to`")
.addOptionalParam("name", "The contract name of send a token")
.addPositionalParam("from", "The account address of send a token")
.addPositionalParam("to", "The account address of receive a token")
.addPositionalParam("tokenIdOrAmount", "The id or amount of a token to send")
.setAction(async function (taskArgs, hre) {
	console.log('from : ' + taskArgs.from);
	console.log('to : ' + taskArgs.to);
	console.log('tokenIdOrAmount : ' + taskArgs.tokenIdOrAmount);

	const contract = await getContract(hre, taskArgs.name);
	const txRes = await contract.transferFrom(taskArgs.from, taskArgs.to, taskArgs.tokenIdOrAmount, {
		gasLimit: 500_000,
	});

	console.log(`Transaction Hash: ${txRes.hash}`);
});

task("allowance", "Fetches allowance from the contract")
.addOptionalParam("name", "The contract name")
.addPositionalParam("owner", "The account address of send a token")
.addPositionalParam("spender", "The account address of send a token")
.setAction(async function (taskArgs, hre) {
	console.log('owner : ' + taskArgs.owner);
	console.log('spender : ' + taskArgs.spender);

	const contract = await getContract(hre, taskArgs.name);
	const allowance = await contract.allowance(taskArgs.owner, taskArgs.spender);

	console.log(`allowance: ${allowance}`);
});

task("approve", "Approve send rights from the contract")
.addOptionalParam("name", "The contract name")
.addPositionalParam("to", "The account address to allow for usage a token")
.addPositionalParam("tokenIdOrAmount", "The token amount to allow for usage a token")
.setAction(async function (taskArgs, hre) {
	console.log('owner:', getAccount(taskArgs.name).address);
	console.log('to : ' + taskArgs.to);
	console.log('tokenIdOrAmount : ' + taskArgs.tokenIdOrAmount);

	const contract = await getContract(hre, taskArgs.name);
	const txRes = await contract.approve(taskArgs.to, taskArgs.tokenIdOrAmount);

	console.log(`Transaction Hash: ${txRes.hash}`);
});

task("burn", "Burns a token from the contract. The approval is cleared when the token is burned.")
.addOptionalParam("name", "The contract name")
.addOptionalParam("account", "The account address of burn a token")
.addPositionalParam("tokenIdOrAmount", "The id or amount of a token to burn")
.setAction(async function (taskArgs, hre) {
	console.log('name : ' + taskArgs.name);
	console.log('account : ' + taskArgs.account);
	console.log('tokenIdOrAmount : ' + taskArgs.tokenIdOrAmount);

	console.log(getAccount(taskArgs.name).address);
	const contract = await getContract(hre, taskArgs.name);

	let txRes;
	if (!taskArgs.account) {
		txRes = await contract.burn(taskArgs.tokenIdOrAmount);
	} else {
		txRes = await contract.burnFrom(taskArgs.account, taskArgs.tokenIdOrAmount);
	}

	console.log(`Transaction Hash: ${txRes.hash}`);
});

task("burnToken", "Burns a token from the contract.")
.addOptionalParam("name", "The contract name")
.addPositionalParam("account", "The account address of burn a token")
.addPositionalParam("amount", "The id or amount of a token to burn")
.setAction(async function (taskArgs, hre) {
	console.log('name : ' + taskArgs.name);
	console.log('account : ' + taskArgs.account);
	console.log('amount : ' + hre.ethers.utils.parseEther(taskArgs.amount));

	const contract = await getContract(hre, taskArgs.name);
    const txRes = await contract.burn(taskArgs.amount, hre.ethers.utils.parseEther(taskArgs.amount));

	console.log(`Transaction Hash: ${txRes.hash}`);
});