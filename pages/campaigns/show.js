import React from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import { Card, Grid } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributionForm from "../../components/ContributionForm";

class CampaignShow extends React.Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getContractSummary().call();
    return {
      address: props.query.address,
      minimumContribute: summary[0],
      balance: summary[1],
      requestsCounts: summary[2],
      approversCounts: summary[3],
      managerAddress: summary[4]
    };
  }
  renderSummary() {
    const items = [
      {
        header: this.props.managerAddress,
        meta: "Address of Campaign Manager",
        description:
          "This address created campaign and can create requests to withdraw the money",
        style: { overflowWrap: "break-word" }
      },
      {
        header: this.props.minimumContribute,
        meta: "Minimum contribution in (wei)",
        description: "User must contribute at least that amount of wei",
        style: { overflowWrap: "break-word" }
      },
      {
        header: this.props.requestsCounts,
        meta: "Number of requests",
        description:
          "How many requests to withdraw the money are actually pending",
        style: { overflowWrap: "break-word" }
      },
      {
        header: this.props.approversCounts,
        meta: "Number of approvers",
        description: "Number of people who already donated campaign",
        style: { overflowWrap: "break-word" }
      },
      {
        header: web3.utils.fromWei(this.props.balance, "ether"),
        meta: "Campaign balance in ether",
        description: "How much money is already collected",
        style: { overflowWrap: "break-word" }
      }
    ];
    return <Card.Group items={items} />;
  }
  render() {
    return (
      <Layout>
        <Grid>
          <Grid.Column width={10}>{this.renderSummary()}</Grid.Column>
          <Grid.Column width={6}>
            <ContributionForm address={this.props.address} />
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
