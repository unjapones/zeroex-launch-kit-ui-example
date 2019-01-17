import React, { Component } from 'react'
import { AssetPairs } from './asset_pairs'

class App extends Component {
  constructor(props: any) {
    super(props)
  }

  public render() {
    return (
      <div className="App">
        <header>
          <p>
            <code>ui-example</code>
          </p>
        </header>
        <AssetPairs />
      </div>
    )
  }
}

export { App }
