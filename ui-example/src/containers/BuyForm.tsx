import React from 'react';
import PropTypes from 'prop-types';
import { Button, Control, Input, Field, Label } from 'bloomer';

interface IBuyFormProps {
  decimals: number;
  onSubmit: (args: any) => void;
}
interface IBuyFormState {
  amount: number;
}

class BuyForm extends React.Component<IBuyFormProps, IBuyFormState> {
  constructor(props: IBuyFormProps) {
    super(props);
    this.state = { amount: 0 };
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public onAmountChange(evt: React.BaseSyntheticEvent) {
    this.setState({ amount: evt.target.value });
  }

  public onSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    const { amount } = this.state;
    const { onSubmit } = this.props;
    onSubmit({ amount });
  }

  public render() {
    const { decimals } = this.props;
    const { amount } = this.state;
    // @TODO: use bignumber.js accordingly
    const step = 10 ** -decimals;

    return (
      <form onSubmit={this.onSubmit} noValidate>
        <Field>
          <Label>ZRX</Label>
          <Control>
            <Input
              type="number"
              min="0"
              max="1"
              step={step}
              placeholder="0"
              name="amount"
              value={amount}
              onChange={this.onAmountChange}
            />
          </Control>
        </Field>
        <Field>
          <Control>
            <Button isColor="primary" type="submit">
              Buy ZRX
            </Button>
          </Control>
        </Field>
      </form>
    );
  }
}

export default BuyForm;
