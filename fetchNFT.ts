import { findLeafAssetIdPda } from '@metaplex-foundation/mpl-bubblegum'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import {  publicKey } from '@metaplex-foundation/umi'
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api'
import base58 from 'bs58'

const umi = createUmi(`https://devnet.helius-rpc.com/?api-key=85b1b62b-6788-41cd-8979-13152d8ebf4c`)
umi.use(dasApi())

const merkleTree = publicKey('F7zzfhVJg3aD5hoMoDYwWTZhRiARaAyC4RC3P922LhV7')
const collection = publicKey('3L156kAxj2Yuij54YFMKKSu8gsvKk84Pc7pdFJ4ifDVG')

const leafIndex = 0; // Initialize leafIndex with a value

const [assetId, bump] = await findLeafAssetIdPda(umi, {
    merkleTree,
    leafIndex,
})
