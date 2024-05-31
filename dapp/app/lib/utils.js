import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import getConfig from "./config";
import { providers, connect, keyStores } from "near-api-js";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function fetchNearUsdtPrice() {
  try {
    // Make API request
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=near-protocol,tether&vs_currencies=usd"
    );

    // Parse response as JSON
    const data = await response.json();

    // Extract NEAR/USDT price
    const nearUsdtPrice = data.tether.usd;

    // Log the price
    console.log("NEAR/USDT Price:", nearUsdtPrice);

    return nearUsdtPrice;
  } catch (error) {
    console.error("Error fetching NEAR/USDT price:", error);
    return 0;
  }
}

export async function getBalance(accountId) {
  const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();
  const connectionConfig = {
    networkId: "testnet",
    keyStore: myKeyStore, // first create a key store
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://testnet.mynearwallet.com/",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://testnet.nearblocks.io",
  };
  const nearConnection = await connect(connectionConfig);
  const account = await nearConnection.account(accountId);
  const balance = await account.getAccountBalance();

  return balance;
}

export async function viewMethod(contractId, method, args = {}) {
  const network = getConfig(process.env.NEXT_PUBLIC_APP_ENV);
  const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

  const res = await provider.query({
    request_type: "call_function",
    account_id: contractId,
    method_name: method,
    args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
    finality: "optimistic",
  });
  return JSON.parse(Buffer.from(res.result).toString());
}

export const prettyTruncate = (str = "", len = 8, type) => {
  if (str && str.length > len) {
    if (type === "address") {
      const front = Math.ceil(len / 2);
      const back = str.length - (len - front);
      return `${str.slice(0, front)}...${str.slice(back)}`;
    }
    return `${str.slice(0, len)}...`;
  }

  return str;
};
