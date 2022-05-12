import React, { Component } from "react";
import tether from "../tether.png";
class Main extends Component {
  render() {
    return (
      <div id="content" className=" mt-5 align-center">
        <table className="table table-info  text-primary  text-center">
          <thead>
            <tr style={{ color: "black", fontWeight: "bold" }}>
              <th scope="col">Staking balance</th>
              <th scope="col">Reward balance</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ color: "black" }}>
              <td>
                {window.web3.utils.fromWei(this.props.stakingBalance, "Ether")}{" "}
                USDT
              </td>
              <td>
                {window.web3.utils.fromWei(this.props.rewardBalance, "Ether")}{" "}
                RWD
              </td>
            </tr>
          </tbody>
        </table>
        <div className=" card border-info  mt-3" style={{ opacity: "1" }}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              let amount;
              amount = this.input.value.toString();
              amount = window.web3.utils.toWei(amount, "Ether");
              this.props.stakeTokens(amount);
            }}
            className="mb-3"
          >
            <div style={{ borderSpacing: "0 1em" }}>
              <label className="ml-2">
                <b>Stake Tokens</b>
              </label>
              <span className="  float-right  mr-3">
                Balance:
                {window.web3.utils.fromWei(this.props.tetherBalance, "Ether")}
              </span>
              <div className="input-group mb-4 ml-1">
                <input
                  ref={(input) => {
                    this.input = input;
                  }}
                  type="text"
                  placeholder="0"
                  required
                  // style={{ border: "none" }}
                />
                <div className="input-group-open">
                  <div className="input-group-text">
                    <img src={tether} alt="tether" style={{ width: "30px" }} />
                    &nbsp;&nbsp;&nbsp;USDT
                  </div>
                </div>
              </div>
              <button
                type=" submit"
                className="btn btn-info  btn-lg mb-2"
                style={{ opacity: "1", fontFamily: "monospace" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-piggy-bank"
                  viewBox="0 0 16 16"
                >
                  <path d="M5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm1.138-1.496A6.613 6.613 0 0 1 7.964 4.5c.666 0 1.303.097 1.893.273a.5.5 0 0 0 .286-.958A7.602 7.602 0 0 0 7.964 3.5c-.734 0-1.441.103-2.102.292a.5.5 0 1 0 .276.962z" />
                  <path
                    fill-rule="evenodd"
                    d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069c0-.145-.007-.29-.02-.431.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a.95.95 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.735.735 0 0 0-.375.562c-.024.243.082.48.32.654a2.112 2.112 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595zM2.516 6.26c.455-2.066 2.667-3.733 5.448-3.733 3.146 0 5.536 2.114 5.536 4.542 0 1.254-.624 2.41-1.67 3.248a.5.5 0 0 0-.165.535l.66 2.175h-.985l-.59-1.487a.5.5 0 0 0-.629-.288c-.661.23-1.39.359-2.157.359a6.558 6.558 0 0 1-2.157-.359.5.5 0 0 0-.635.304l-.525 1.471h-.979l.633-2.15a.5.5 0 0 0-.17-.534 4.649 4.649 0 0 1-1.284-1.541.5.5 0 0 0-.446-.275h-.56a.5.5 0 0 1-.492-.414l-.254-1.46h.933a.5.5 0 0 0 .488-.393zm12.621-.857a.565.565 0 0 1-.098.21.704.704 0 0 1-.044-.025c-.146-.09-.157-.175-.152-.223a.236.236 0 0 1 .117-.173c.049-.027.08-.021.113.012a.202.202 0 0 1 .064.199z"
                  />
                </svg>
                &nbsp;DEPOSIT
              </button>
            </div>
          </form>
          <button
            onClick={(event) => {
              event.preventDefault();
              this.props.unstakeTokens();
            }}
            className="btn btn-info  btn-lg"
            style={{ opacity: "1" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-cash-coin"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
              />
              <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
              <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
              <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
            </svg>
            &nbsp;WITHDRAW
          </button>
          <div className="card-body text-center" style={{ color: "black" }}>
            
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
