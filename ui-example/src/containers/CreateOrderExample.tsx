import React from 'react';
import * as log from 'loglevel';
import { BigNumber } from '@0x/utils';
import { HttpClient } from '@0x/connect';
import { Provider, MetamaskSubprovider } from '@0x/subproviders';
import { Order, generatePseudoRandomSalt, orderHashUtils, signatureUtils, assetDataUtils } from '@0x/order-utils';
import getRelayerClient from '../lib/getRelayerClient';
import { getTokenAddressBySymbol } from '../common/constants';
import BuyForm from './BuyForm';

const logger = log.getLogger('CreateOrderExample');

const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';
const ZERO_AMOUNT = new BigNumber(0);

// @TODO: https://github.com/0xProject/0x-monorepo/blob/4b95e3d684/packages/contract-addresses/src/index.ts
// Kovan network
const EXCHANGE_ADDRESS = '0x35dd2932454449b14cee11a94d3674a936d5d7b2';
const EXPIRATION_TIME = new BigNumber('3600');

export interface ICreateOrderExampleProps {
  relayerClient: HttpClient;
  provider: Provider;
  makerAddress: string;
}

// @TODO:
// 1. Refactor.
// - BuyForm: is not useful: change it to make it maker/taker (like 0x-portal).
//   - It should accept pairs, of assets to make it dynamic.
// - Take out the Order handling code from the component and place it on a different TS module/file.
//   - Take out constants, check if 0x provide some of them.
//   - Network config should be taken from provider.
// 2. What's the deal with maker/takerAssetAmount? how do we calculate it?
class CreateOrderExample extends React.Component<ICreateOrderExampleProps> {
  private relayerClient: HttpClient;
  private provider: Provider;

  constructor(props: any | ICreateOrderExampleProps) {
    super(props);
    this.relayerClient = props.relayerClient;
    this.provider = props.provider;
    this.submitOrder = this.submitOrder.bind(this);
  }

  public async submitOrder(args:{ amount: BigNumber }) {
    const { makerAddress } = this.props;

    const order: Order = {
      // @TODO: why is the following needed? (not-doing it raises an exception)
      makerAddress: makerAddress.toLowerCase(),
      makerAssetData: assetDataUtils.encodeERC20AssetData(getTokenAddressBySymbol('WETH')),
      makerAssetAmount: new BigNumber('100000000000000000000000'),
      takerAssetData: assetDataUtils.encodeERC20AssetData(getTokenAddressBySymbol('ZRX')),
      takerAssetAmount: new BigNumber('100000000000000000000'),
      salt: generatePseudoRandomSalt(),
      exchangeAddress: EXCHANGE_ADDRESS,
      expirationTimeSeconds: EXPIRATION_TIME,
      takerAddress: NULL_ADDRESS,
      senderAddress: NULL_ADDRESS,
      feeRecipientAddress: NULL_ADDRESS,
      makerFee: ZERO_AMOUNT,
      takerFee: ZERO_AMOUNT,
    };

    // Generate the order hash and sign it
    const orderHashHex = orderHashUtils.getOrderHashHex(order);
    const signature = await signatureUtils.ecSignHashAsync(
      new MetamaskSubprovider(this.provider),
      orderHashHex,
      makerAddress
    );
    const signedOrder = { ...order, signature };

    await this.relayerClient.submitOrderAsync(signedOrder, { networkId: 42});
    logger.info('Order successfully submitted');
  }

  public render() {
    return <BuyForm decimals={7} onSubmit={this.submitOrder} />;
  }

  public async componentDidMount() {
    try {
      this.relayerClient = this.relayerClient || await getRelayerClient();
    } catch (error) {
      logger.error(error)
    }
  }
}

export default CreateOrderExample;
