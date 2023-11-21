import { generateSigner, createSignerFromKeypair, keypairIdentity } from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { createTree, mplBubblegum } from '@metaplex-foundation/mpl-bubblegum'
import base58 from 'bs58'

const wallet = new Uint8Array([
  54,  10, 207, 157,  72,  43, 119,  86, 102,  64, 155,
   8, 215, 251,  10, 193, 222, 251,  34,  93,  16,  17,
 176, 145, 169, 173, 200,  76,  92, 129, 185, 107,   9,
 164, 203, 227, 213, 189,  66, 151, 143, 184,  39,  19,
 105, 138,  12, 224, 186, 178, 141, 240, 205, 171,  24,
 166, 117, 110,   2,   5, 195, 158, 222,  95
])

const umi = createUmi('https://devnet.helius-rpc.com/?api-key=85b1b62b-6788-41cd-8979-13152d8ebf4c')
const myKeypair = umi.eddsa.createKeypairFromSecretKey(wallet);
const myKeypairSigner = createSignerFromKeypair("eddsa",myKeypair);
umi.use(keypairIdentity(myKeypairSigner));
umi.use(mplBubblegum())

const merkleTree = generateSigner(umi)

const builder = await createTree(umi, {
  merkleTree,
  maxDepth: 3,
  maxBufferSize: 8,
})
const build = await builder.sendAndConfirm(umi)
const sig = base58.encode(build.signature)

console.log('sig', sig)
console.log('tree', merkleTree.publicKey)