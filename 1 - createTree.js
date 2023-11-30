import { generateSigner, createSignerFromKeypair, keypairIdentity, publicKey } from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { createTree, mplBubblegum } from '@metaplex-foundation/mpl-bubblegum'
import base58 from 'bs58'

const umi = createUmi('https://devnet.helius-rpc.com/?api-key=85b1b62b-6788-41cd-8979-13152d8ebf4c')

const wallet = new Uint8Array([254, 149, 24, 6, 64, 64, 115, 121, 242, 159, 191, 89, 133, 147, 24, 20, 187, 156, 121, 161, 238, 138, 41, 146, 214, 226, 121, 101, 218, 67, 15, 250, 12, 53, 37, 169, 219, 170, 175, 249, 223, 0, 140, 96, 13, 239, 51, 105, 174, 4, 18, 98, 54, 166, 38, 236, 71, 232, 246, 192, 170, 199, 57, 154])
const merkleTreeWallet = new Uint8Array([180, 20, 141, 111, 23, 156, 197, 182, 163, 103, 61, 155, 43, 173, 95, 64, 212, 113, 119, 223, 27, 56, 144, 208, 163, 228, 161, 240, 54, 25, 208, 69, 13, 72, 16, 192, 101, 0, 16, 249, 168, 127, 252, 251, 183, 108, 8, 123, 114, 231, 64, 148, 221, 96, 161, 189, 176, 54, 120, 145, 171, 49, 211, 172])

const payer = umi.eddsa.createKeypairFromSecretKey(wallet);
const payerSigner = createSignerFromKeypair("eddsa", payer);

// const merkleTreeKeypair = umi.eddsa.createKeypairFromSecretKey(merkleTreeWallet);
// const merkleTree = createSignerFromKeypair(umi, merkleTreeKeypair);
umi.use(keypairIdentity(payerSigner));
umi.use(mplBubblegum())

const merkleTree = generateSigner(umi)

console.log('merkleTree', merkleTree)

const builder = await createTree(umi, {
  merkleTree,
  maxDepth: 13,
  maxBufferSize: ,
  canopyDepth: 11
})

const build = await builder.sendAndConfirm(umi)
const sig = base58.encode(build.signature)

console.log('tree', merkleTree.publicKey)
console.log('sig', sig)