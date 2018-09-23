import React from 'react';
import Eos from 'eosjs';

export class Share extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      noteTable: [], // to store the table rows from smart contract
      submitted: 0,
      loggedInAddress: "accounta",
      loggedInPrivateKey: "5JJDpNLf3e2fGtMzRfhifMkpz5LD3rtXXzLtAtvGT4gE4wEWfZA",
      grantedAccess: false,
      price: null,
    };
    this.signalAccess = this.signalAccess.bind(this);
  }

  signalAccess() {
    const eos = Eos({keyProvider: this.state.loggedInPrivateKey});

    var actionData = {
      _requestee: this.state.loggedInAddress,
      _price: this.state.price,
    };

    eos.transaction({
      actions: [{
          account: "contract1",
          name: "sigshare",
          authorization: [{
            actor: this.state.loggedInAddress,
            permission: 'active',
          }],
          data: actionData,
        }],
      });
  }

  updateState(evt) {
  let target = evt.target;
  let id = target.id;
  let newState = this.state;

  switch (id) {
    case 'price':
      newState.price = target.value;
      break;

    default:
      console.log("Not updating any state.");
    }

  this.setState(newState);

  }

  getTable() {
    const eos = Eos();
    eos.getTableRows({
      "json": true,
      "code": "accounta",   // contract who owns the table
      "scope": "accounta",  // scope of the table
      "table": "datasharing",    // name of the table as specified by the contract abi
      "limit": 100,
    }).then(result => this.setState({ noteTable: result.rows }));
  }

  componentDidMount() {
    this.getTable();
  }

  render() {
    return (
        <section id="wrapper" >
        <p style={{paddingLeft: "10px", paddingTop: "10px"}}>Connected to the EOS Blockchain as "{this.state.loggedInAddress}"</p>
            <header>
                <div className="inner">
                    <h2>Share Your Data</h2>
                </div>
            </header>

            {/* Content */}
            <div className="wrapper">
                <div className="inner">

                    <h3 className="major">What Data Are You Willing to Share?</h3>
                    <div className="table-wrapper">
                      <table>
                        <thead>
                          <tr>
                            <td>Data Type</td>
                            <td>Data Description</td>
                            <td style={{textAlign:"center", width:"100px"}}>Price (EOS)</td>
                            <td style={{textAlign:"center"}}>Signal Access</td>
                            <td style={{textAlign:"center"}}>Granted Access?</td>
                          </tr>

                        </thead>
                        <tbody>
                        <tr>
                          <td>UK Medical Data</td>
                          <td>PDF of UK medical records</td>
                          <input type="number" id="price" min="0" onChange={evt => this.updateState(evt)}></input>
                          <td style={{textAlign:"center"}}><a onClick={this.signalAccess} className="button small">Signal Access</a></td>
                          {this.state.grantedAccess && <td style={{textAlign:"center"}}><i style={{marginBottom: "0px", verticalAlign: "middle"}} className="fas fa-check fa-1x"></i></td>}
                          {!this.state.grantedAccess && <td style={{textAlign:"center"}}><i style={{marginBottom: "0px", verticalAlign: "middle"}} className="fas fa-times fa-1x"></i></td>}
                        </tr>

                        <tr>
                          <td>Bank Statement</td>
                          <td>A recent bank account statement</td>
                          <input type="number" id="price" min="0" onChange={evt => this.updateState(evt)}></input>
                          <td style={{textAlign:"center"}}><a className="button small">Signal Access</a></td>
                          <td style={{textAlign:"center"}}><i style={{marginBottom: "0px", verticalAlign: "middle"}} className="fas fa-times fa-1x"></i></td>
                        </tr>

                        <tr>
                          <td>Driving License</td>
                          <td>A scanned copy of a driving license</td>
                          <input type="number" id="price" min="0" onChange={evt => this.updateState(evt)}></input>
                          <td style={{textAlign:"center"}}><a className="button small">Signal Access</a></td>
                          <td style={{textAlign:"center"}}><i style={{marginBottom: "0px", verticalAlign: "middle"}} className="fas fa-times fa-1x"></i></td>
                        </tr>

                        <tr>
                          <td>UK Passport</td>
                          <td>A scanned copy of a UK passport</td>
                          <input type="number" id="price" min="0" onChange={evt => this.updateState(evt)}></input>
                          <td style={{textAlign:"center"}}><a className="button small">Signal Access</a></td>
                          <td style={{textAlign:"center"}}><i style={{marginBottom: "0px", verticalAlign: "middle"}} className="fas fa-times fa-1x"></i></td>
                        </tr>

                        <tr>
                          <td>Facebook Data</td>
                          <td>A download of all data from Facebook</td>
                          <input type="number" id="price" min="0" onChange={evt => this.updateState(evt)}></input>
                          <td style={{textAlign:"center"}}><a className="button small">Signal Access</a></td>
                          <td style={{textAlign:"center"}}><i style={{marginBottom: "0px", verticalAlign: "middle"}} className="fas fa-times fa-1x"></i></td>
                        </tr>

                        <tr>
                          <td>Google History</td>
                          <td>A download of all search engine searches</td>
                          <input type="number" id="price" min="0" onChange={evt => this.updateState(evt)}></input>
                          <td style={{textAlign:"center", verticalAlign:"center"}}><a className="button small">Signal Access</a></td>
                          <td style={{textAlign:"center"}}><i style={{marginBottom: "0px", verticalAlign: "middle"}} className="fas fa-times fa-1x"></i></td>
                        </tr>

                        </tbody>

                      </table>
                    </div>
                </div>
            </div>
        </section>
    );
  }
}
