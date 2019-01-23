import React from "react";
import Layout from "../../components/Layout";
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

class CampaignNew extends React.Component {
  state = {
    minimumContribution: "",
    errorMessage: "",
    loading: false
  };
  async onSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({ from: accounts[0] });
      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  }

  render() {
    return (
      <Layout>
        <h3>Create a campaign</h3>
        <Form
          onSubmit={this.onSubmit.bind(this)}
          error={!!this.state.errorMessage}
        >
          <Form.Field>
            <label>Minimum contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              placeholder="in wei"
              value={this.state.minimumContribution}
              onChange={event =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
          <Message
            error
            header="Oops... something went wrong!"
            content={this.state.errorMessage}
          />
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
