import { generateSigner, createSignerFromKeypair, keypairIdentity, percentAmount } from '@metaplex-foundation/umi'
import { createNft, mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'

const wallet = new Uint8Array([254, 149, 24, 6, 64, 64, 115, 121, 242, 159, 191, 89, 133, 147, 24, 20, 187, 156, 121, 161, 238, 138, 41, 146, 214, 226, 121, 101, 218, 67, 15, 250, 12, 53, 37, 169, 219, 170, 175, 249, 223, 0, 140, 96, 13, 239, 51, 105, 174, 4, 18, 98, 54, 166, 38, 236, 71, 232, 246, 192, 170, 199, 57, 154])

const umi = createUmi(`https://devnet.helius-rpc.com/?api-key=85b1b62b-6788-41cd-8979-13152d8ebf4c`)
const myKeypair = umi.eddsa.createKeypairFromSecretKey(wallet);
console.log('myKeypair', myKeypair.publicKey.toString())
const myKeypairSigner = createSignerFromKeypair("eddsa", myKeypair);
umi.use(keypairIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const collectionMint = generateSigner(umi)

const coll = createNft(umi, {
  mint: collectionMint,
  name: 'Pet Legends ',
  uri: 'https://petlegends.com/collection/metadata.json',
  sellerFeeBasisPoints: percentAmount(10),
  isCollection: true,
}).sendAndConfirm(umi)

console.log('collection', coll)
console.log('collection mint', collectionMint.publicKey)