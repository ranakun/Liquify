import React, { Component } from "react";
import Navbar from "./navbar";
import Main from "./Main";
import Web3 from "web3";
import Tether from "../truffle_abis/Tether.json";
import RWD from "../truffle_abis/RWD.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";
import ParticleSettings from "./ParticleSettings";

class App extends Component {
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("No ethereum detected! check your metamask");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    // console.log(networkId);

    //LOAD Tether TOKEN
    const tetherData = Tether.networks[networkId];
    if (tetherData) {
      const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
      this.setState({ tether });
      let tetherBalance = await tether.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ tetherBalance: tetherBalance.toString() });
    } else {
      window.alert("tether contract not deployed to detect network");
    }

    const rwdData = RWD.networks[networkId];
    if (rwdData) {
      const rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
      let rwdBalance = await rwd.methods.balanceOf(this.state.account).call();
      this.setState({
        rewardBalance: rwdBalance.toString(),
        rwd: rwd,
      });
    } else {
      window.alert("Contract not deployed on the blockchain");
    }

    const decentralBankData = DecentralBank.networks[networkId];
    if (decentralBankData) {
      const decentralBank = new web3.eth.Contract(
        DecentralBank.abi,
        decentralBankData.address
      );
      this.setState({ decentralBank });
      let stakingBalance = await decentralBank.methods
        .stakingBalance(this.state.account)
        .call();
      this.setState({ stakingBalance: stakingBalance.toString() });
      // console.log("staking balance", stakingBalance);
    } else {
      window.alert("Contract not deployed on the blockchain");
    }

    this.setState({ loading: false });
  }

  async UNSAFE_componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  //function to stake tokens - using deposit button
  stakeTokens = (amount) => {
    this.setState({ loading: true });
    this.state.tether.methods
      .approve(this.state.decentralBank._address, amount)
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.state.decentralBank.methods
          .depositTokens(amount)
          .send({ from: this.state.account })
          .on("transactionHash", (hash) => {
            this.setState({ loading: false });
          });
      });
  };

  //Unstaking the tokens--the function yhat is called upon clicking the withdraw button
  unstakeTokens = () => {
    this.setState({ loading: true });
    this.state.decentralBank.methods
      .unstakeTokens()
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.setState({ loading: false });
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: "loading",
      tether: {},
      rwd: {},
      decentralBank: {},
      stakingBalance: "0",
      tetherBalance: "0",
      rewardBalance: "0",
      loading: true,
    };
  }
  render() {
    let content;
    {
      this.state.loading
        ? (content = (
            <div
              id="loader"
              // className="card  "
              style={{ margin: "30px", fontStyle: "bold", color: "white" }}
            >
              <p className=" text-center">LOADING...PLEASE WAIT...</p>
            </div>
          ))
        : (content = (
            <Main
              stakingBalance={this.state.stakingBalance}
              rewardBalance={this.state.rewardBalance}
              tetherBalance={this.state.tetherBalance}
              loading={this.state.loading}
              stakeTokens={this.stakeTokens}
              unstakeTokens={this.unstakeTokens}
              decentralBank={this.decentralBank}
            />
          ));
    }
    return (
      <React.Fragment>
        <div className="App" style={{ position: "relative" }}>
          <div style={{ position: "absolute" }}>
            <ParticleSettings />
          </div>
          <Navbar account={this.state.account} />
          <div className="container-fluid mt-5 " style={{ maxWidth: "900px" }}>
            <div className="row">
              <main role="main" className="col-lg-12 ml-auto mr-auto">
                <div>{content}</div>
              </main>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
