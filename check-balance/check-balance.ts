import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { getDomainKeySync } from "@bonfida/spl-name-service"

// My publickey in the DEVNET

/*const publickey = new PublicKey("Dmj4Pdcr7Z3Bx4yKgRMfXAAU818nA4wfxSTwqfC3QLwY");
const connection = new Connection("https://api.mainNet.solana.com", "confirmed"); */


// Search a publickey in the MAINNET, using Solana Neme System
function getPublicKey(): PublicKey {
    try{
        const publickey =  getDomainKeySync(process.argv[2]);
        return new PublicKey(publickey.pubkey);
    }
    catch{
        console.log(`"Provide a public key to check the balance of!"`);
        throw new Error("Provide a valid public key to check the balance of!");
    }
}

try{
    const publickey = getPublicKey();
    const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
    const balanceInLamports = await connection.getBalance(publickey);
    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
    console.log(
        `💰 Finished! The balance for the wallet at address ${publickey} is ${balanceInSOL}!`,
    );
}
catch(error){
    console.log(error);
}
