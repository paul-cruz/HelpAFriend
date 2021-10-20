import getConfig from '../config';
import { keyStores, Near, connect, WalletConnection, WalletAccount, utils } from 'near-api-js';

export const {
	GAS,
	networkId, nodeUrl, walletUrl, nameSuffix,
	contractName, contractMethods
} = getConfig();

export const getWallet = async () => {
	const near = await connect({
		networkId, nodeUrl, walletUrl, deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() },
	});
	const wallet = new WalletAccount(near);
	return { near, wallet };
};

export const getPublicProjects = async (wallet) => {
	const response = await wallet.account().functionCall({
		contractId: contractName,
		methodName: 'getPublicProjects',
		GAS
	});
	return response;
};

export const getFriends = async (wallet) => {
	const response = await wallet.account().functionCall({
		contractId: contractName,
		methodName: 'getFriends',
		GAS
	});
	return response;
};

export const getFriendProjects = async (wallet, data) => {
	const response = await wallet.account().functionCall({
		contractId: contractName,
		methodName: 'getFriendProjects',
		args: data,
		GAS
	});
	return response;
};

export const registerUser = async (wallet) => {
	const response = await wallet.account().functionCall({
		contractId: contractName,
		methodName: 'register',
		GAS
	});
	return response;
};

export const donatePublicProject = async (wallet, data) => {
	const response = await wallet.account().functionCall({
		contractId: contractName,
		methodName: 'donatePublicProject',
		args: data,
		GAS
	});
	return response;
};