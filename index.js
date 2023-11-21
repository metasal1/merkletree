import { Connection, PublicKey, Keypair, Transaction } from "@solana/web3.js";
import { MPL_BUBBLEGUM_PROGRAM_ID, createc } from "@metaplex-foundation/mpl-bubblegum";
import { createAllocTreeIx } from "@solana/spl-account-compression";
import base58 from "bs58";  

const BUBBLEGUM_PROGRAM_ID = new PublicKey("BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY");
const connection = new Connection("https://api.devnet.solana.com");

const payer = Keypair.fromSecretKey(new Uint8Array([
  54,  10, 207, 157,  72,  43, 119,  86, 102,  64, 155,
   8, 215, 251,  10, 193, 222, 251,  34,  93,  16,  17,
 176, 145, 169, 173, 200,  76,  92, 129, 185, 107,   9,
 164, 203, 227, 213, 189,  66, 151, 143, 184,  39,  19,
 105, 138,  12, 224, 186, 178, 141, 240, 205, 171,  24,
 166, 117, 110,   2,   5, 195, 158, 222,  95
]))
console.log('payer', payer.publicKey.toBase58());
console.log('secret', base58.encode(payer.secretKey));
// await connection.requestAirdrop(
//     payer.publicKey,
//     10000000000,
//   );
const maxDepthSizePair = {
    maxDepth: 14,
    maxBufferSize: 64,
  };
const canopyDepth = 10;
const treeKeypair = Keypair.generate();
console.log('treeKeypair', treeKeypair.publicKey.toBase58());

const [treeAuthority, _bump] = PublicKey.findProgramAddressSync(
    [treeKeypair.publicKey.toBuffer()],
    new PublicKey(MPL_BUBBLEGUM_PROGRAM_ID),
  );
console.log('treeAuthority', treeAuthority.toBase58());
  // allocate the tree's account on chain with the `space`
const allocTreeIx = await createAllocTreeIx(
    connection,
    treeKeypair.publicKey,
    payer.publicKey,
    maxDepthSizePair,
    canopyDepth,
  );

  const createTreeIx = createCreateTreeInstruction(
    {
      payer: payer.publicKey,
      treeCreator: payer.publicKey,
      treeAuthority,
      merkleTree: treeKeypair.publicKey,
      compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
      // NOTE: this is used for some on chain logging
      logWrapper: SPL_NOOP_PROGRAM_ID,
    },
    {
      maxBufferSize: maxDepthSizePair.maxBufferSize,
      maxDepth: maxDepthSizePair.maxDepth,
      public: false,
    },
    BUBBLEGUM_PROGRAM_ID,
  );

  const tx = new Transaction().add(allocTreeIx).add(createTreeIx);
  tx.feePayer = payer.publicKey;
  
  // send the transaction
  const txSignature = await sendAndConfirmTransaction(
    connection,
    tx,
    // ensuring the `treeKeypair` PDA and the `payer` are BOTH signers
    [treeKeypair, payer],
    {
      commitment: "confirmed",
      skipPreflight: true,
    },
  );