import React from 'react';
import Eos from 'eosjs';

export class Share extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      noteTable: [], // to store the table rows from smart contract
      submitted: 0,
    };
    this.signalAccess = this.signalAccess.bind(this);
  }

  signalAccess() {
    const eos = Eos({keyProvider: "5K5P6dcWUFYrHRH8SuTKWHBva2zzjnB6weE41q1Bg7SBHiAUjsr"});

    var actionData = {
      _requestee: "accountb",
      _price: 0,
    };

    eos.transaction({
      actions: [{
          account: "accounta",
          name: "sigshare",
          authorization: [{
            actor: "accountb",
            permission: 'active',
          }],
          data: actionData,
        }],
      });
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

  checkSubmitted() {

  }

  componentDidMount() {
    this.getTable();
    this.checkSubmitted();
  }

  render() {
    return (
        <section id="wrapper" >
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
                            <td style={{textAlign:"center"}}>Signal Access</td>
                          </tr>

                        </thead>
                        <tbody>
                        <tr>
                          <td>UK Medical Data</td>
                          <td>Medical records PDF containing all key UK information</td>
                          <td style={{textAlign:"center"}}><a onClick={this.signalAccess} className="button small">Signal Access</a></td>
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
