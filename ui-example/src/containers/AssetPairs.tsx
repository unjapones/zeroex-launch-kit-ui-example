import React from 'react'
import * as log from 'loglevel'
import { HttpClient } from '@0x/connect';
import { AssetPairsResponse, AssetPairsItem, ERC20AssetData } from '@0x/types';
import { assetDataUtils } from '0x.js'
import getRelayerClient from '../lib/getRelayerClient'
import { ERC20TokenNames } from '../common/constants'

const logger = log.getLogger('AssetPairs');

interface IAssetPairsState {
  assetPairs: AssetPairsItem[]
}

/**
 * Super basic (no pagination, nor error handling) list of asset pairs retrieval example.
 * @extends React
 */
class AssetPairs extends React.Component {
  public state: IAssetPairsState
  private relayerClient: HttpClient | undefined

  constructor(props: any) {
    super(props)
    this.state = {
      assetPairs: []
    }
  }

  public async componentDidMount() {
    try {
      this.relayerClient = await getRelayerClient()
      const response: AssetPairsResponse = await this.relayerClient.getAssetPairsAsync()
      this.setState({
        assetPairs: response.records
      })
    } catch (error) {
      logger.error(error)
    }
  }

  public render() {
    const assetPairs: AssetPairsItem[] = this.state.assetPairs
    const listItems = this.mapAssetPairToListItems(assetPairs)
    const assetPairsUnorderedListContent = (
      <ul className="AssetPairs">
        {listItems}
      </ul>
    )
    const noAssetPairsContent = (
      <p>No asset pairs found.</p>
    )

    return listItems.length > 0 ? assetPairsUnorderedListContent : noAssetPairsContent
  }

  private mapAssetPairToListItems(assetPairs: AssetPairsItem[]) {
    return assetPairs.map((ap: AssetPairsItem) => {
      const tokenDataA: ERC20AssetData = assetDataUtils.decodeAssetDataOrThrow(ap.assetDataA.assetData) as ERC20AssetData
      const tokenAddressA: string = tokenDataA.tokenAddress
      const tokenDataB: ERC20AssetData = assetDataUtils.decodeAssetDataOrThrow(ap.assetDataB.assetData) as ERC20AssetData
      const tokenAddressB: string = tokenDataB.tokenAddress
      // @TODO: names are hardcoded in 'common/constants.ts'. We probably could get them
      // by iteracting with the blockchain
      const tokenNameA: string = ERC20TokenNames[tokenAddressA]
      const tokenNameB: string = ERC20TokenNames[tokenAddressB]

      const key: string = `${ap.assetDataA.assetData}/${ap.assetDataB.assetData}`
      return (
        <li key={key}>{`${tokenNameA}/${tokenNameB}`}</li>
      )
    })
  }
}

export default AssetPairs
