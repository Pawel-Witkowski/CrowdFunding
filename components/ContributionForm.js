import React from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";
class ContributionForm extends React.Component {
  state = {
    value: "",
    loading: false
  };
  async onSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });

    const campaign = Campaign(this.props.address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether")
      });
      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (err) {}
    this.setState({ loading: false });
  }
  render() {
    return (
      <Form onSubmit={this.onSubmit.bind(this)}>
        <Form.Field>
          <label> Amount of ether to contibute</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>
        <Button loading={this.state.loading} primary>
          Contribute
        </Button>
      </Form>
    );
  }
}

export default ContributionForm;
