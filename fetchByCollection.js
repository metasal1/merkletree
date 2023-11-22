import { findLeafAssetIdPda } from '@metaplex-foundation/mpl-bubblegum'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import {  publicKey } from '@metaplex-foundation/umi'
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api'

const umi = createUmi(`https://devnet.helius-rpc.com/?api-key=85b1b62b-6788-41cd-8979-13152d8ebf4c`)
umi.use(dasApi())

const collectionMint = publicKey('3L156kAxj2Yuij54YFMKKSu8gsvKk84Pc7pdFJ4ifDVG')
const rpcAssetList = await umi.rpc.getAssetsByGroup({
    groupKey: 'collection',
    groupValue: collectionMint,
  })

  console.log('Asset List: ', rpcAssetList)