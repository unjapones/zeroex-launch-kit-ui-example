import React from 'react'
import { withWeb3 } from 'react-web3-provider'
import { HttpClient } from '@0x/connect'
import getRelayerClient from './lib/getRelayerClient'
import CreateOrderExample from './containers/CreateOrderExample'
import AssetPairs from './containers/AssetPairs'

interface IAppProps {
  web3?: any
}
interface IAppState {
  ethAccount: string
}

class App extends React.Component<IAppProps, IAppState> {
  private relayerClient: HttpClient

  constructor(props: any) {
    super(props)
    this.relayerClient = getRelayerClient()
    this.state = { ethAccount: '' }
  }

  public componentDidUpdate(prevProps: any) {
    const { web3 } = this.props
    if (prevProps.web3 !== web3) {
      const { ethAccount } = this.state
      web3.eth.getAccounts().then((accounts: string[]) => {
        if (ethAccount !== accounts[0]) {
          this.setState({ ethAccount: accounts[0] })
        }
      })
    }
  }

  public render() {
    const { ethAccount } = this.state
    const { web3 } = this.props
    if (web3 && ethAccount !== '') {
      return (
        <div className="App">
          <AssetPairs />
          <CreateOrderExample
            relayerClient={this.relayerClient}
            provider={web3.currentProvider}
            makerAddress={ethAccount}
            makerAssetSymbol="WETH"
            takerAssetSymbol="ZRX"
          />
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

export default App
export const AppWithWeb3 = withWeb3(App)
