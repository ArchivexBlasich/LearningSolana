import * as web3 from "@solana/web3.js";
import "dotenv/config";
import {
    getKeypairFromEnvironment,
} from "@solana-developers/helpers"

const suppliedToPubkey = process.argv[2] || null;

if(!suppliedToPubkey) {
    console.log("Please enter a public key you want to send Sol");
    process.exit(1);
}

const SOLToTransfer = process.argv[3] || null;

if(!SOLToTransfer) {
    console.log("Please enter the amount of Sol you want to transfer");
    process.exit(1);
} 
    
let solToTransfer = parseFloat(SOLToTransfer);



// establish a conection to the devnet

const conection = new web3.Connection(web3.clusterApiUrl("devnet"));
const payer = getKeypairFromEnvironment("SECRET_KEY");

const currentSolInAccount = await conection.getBalance(payer.publicKey);

if (solToTransfer > currentSolInAccount) {
    console.log(`The account ${payer.publicKey} Dont have enough Sol to Transfer`);
    process.exit(1);
}


// Create Transaction
const transaction = new web3.Transaction();
const toPubkey = new web3.PublicKey(suppliedToPubkey);

// Create instruction
const instruction = web3.SystemProgram.transfer({
    fromPubkey: payer.publicKey,
    toPubkey,
    lamports: solToTransfer * web3.LAMPORTS_PER_SOL,
})

// Add instruction to the transaction
transaction.add(instruction);

const signature = await web3.sendAndConfirmTransaction(
    conection,
    transaction,
    [payer],
);

console.log(`Transaction of ${solToTransfer}\n
from ${payer.publicKey.toBase58()}\n
to ${suppliedToPubkey}\n
signarute = ${signature}
`);