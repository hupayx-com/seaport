const { task } = require("hardhat/config");
require('dotenv').config();
const { getAccount, getContractName, getContractAddressConduit } = require("./helpers");

task("accounts", "Prints the list of accounts").setAction(async function (taskArgs, hre) {
	const accounts = await hre.ethers.getSigners();
  
	for (const account of accounts) {
	    console.log(account.address);
	}
});

task("check-balance", "Prints out the balance of your account")
.setAction(async function (taskArgs, hre) {
	const [deployer] = await ethers.getSigners();
	console.log(`Account balance: ${(await deployer.getBalance()).toString()}`);
});

task("deploy", "Deploys the " + getContractName() + ".sol contract")
.addOptionalParam("name", "The contract name to create")
.addOptionalParam("param", "The parameter of contract constructor to create")
.setAction(async function (taskArgs, hre) {
	console.log(`Task deploy start. The contract name is ` + getContractName(taskArgs.name));

	let account = getAccount(taskArgs.name);
	let deployed;
	const contractFactory = await hre.ethers.getContractFactory(getContractName(taskArgs.name), account);
	
	if (getContractName(taskArgs.name) == 'Seaport') {
		deployed = await contractFactory.deploy(getContractAddressConduit());
	} else {
		deployed = await contractFactory.deploy();
	}
	
	console.log(`Contract deployed to address: ${deployed.address}`);
});