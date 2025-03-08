import * as web3 from "@solana/web3.js";
import "dotenv/config";
import {
    getKeypairFromEnvironment,
    airdropIfRequired,
} from "@solana-developers/helpers"

const PING_PROGRAM_ADDRESS = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
const PING_PROGRAM_DATA_ADDRESS = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";
const CLUSTER_NAME = "devnet";




const payer = getKeypairFromEnvironment("SECRET_KEY");
const connection = new web3.Connection(web3.clusterApiUrl(CLUSTER_NAME));

const newBalance = await airdropIfRequired(
    connection,
    payer.publicKey,
    1 * web3.LAMPORTS_PER_SOL,
    0.5 * web3.LAMPORTS_PER_SOL,
);


// How to talk to a program in the Blockchain

/*

    1. create a transaction
    2. create an instruction
    3. add the instruction to the transaction
    4. send the transaction

*/

// 1. create a transaction
const transaction = new web3.Transaction();
const programId = new web3.PublicKey(PING_PROGRAM_ADDRESS);
const pingProgramDataId = new web3.PublicKey(PING_PROGRAM_DATA_ADDRESS);


// 2. create an instruction

// Data nedded top create an Instruction
/* 
const instruction = new TransactionInstruction({
  programId: PublicKey;
  keys: [
    {
      pubkey: Pubkey,
      isSigner: boolean,
      isWritable: boolean,
    },
  ],
  data?: Buffer;
});
*/

const instruction = new web3.TransactionInstruction({
    keys: [
        {
            pubkey: pingProgramDataId,
            isSigner: false,
            isWritable: true,
        }
    ],
    programId
});



// 3. add the instruction to the transaction
transaction.add(instruction);


// 4. send the transaction
const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [payer],
);

console.log(`✅ Transaction completed! Signature is ${signature}`);


// A signature that i received: 2GfrustpxEsA6Ta4h1c9HcfYx2Q3JqNpbeJMQRX1h8NLJP9pNvBGhQ9wcKvaTLpYhhrNVXvsyR9i12iWoFxnNidj

/* console.log(
    `You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`,
  ); */