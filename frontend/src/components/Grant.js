import React from 'react';
import Eos from 'eosjs';

export class Grant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      noteTable: [], // to store the table rows from smart contract
      loggedInAddress: "accounta",
      loggedInPrivateKey: "5JJDpNLf3e2fGtMzRfhifMkpz5LD3rtXXzLtAtvGT4gE4wEWfZA",
    };
  }

  getTable() {
    const eos = Eos();
    eos.getTableRows({
      "json": true,
      "code": "contract1",   // contract who owns the table
      "scope": "contract1",  // scope of the table
      "table": "request",    // name of the table as specified by the contract abi
      "limit": 100,
    }).then(result => this.setState({ noteTable: result.rows }));
  }

  markAsSent(id) {
    const eos = Eos({keyProvider: this.state.loggedInPrivateKey});

    var actionData = {
      _requestee: this.state.loggedInAddress,
      _id: id,
    };

    eos.transaction({
      actions: [{
          account: "contract1",
          name: "ackreq",
          authorization: [{
            actor: this.state.loggedInAddress,
            permission: 'active',
          }],
          data: actionData,
        }],
      });
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
                <h2>Grant Access To Your Data</h2>
            </div>
        </header>

        {/* Content */}
        <div className="wrapper">
          <div className="inner">

            <h3 className="major">Send Your Data Securely To The Requests Below</h3>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <td style={{textAlign:"center"}}>ID</td>
                    <td style={{textAlign:"center"}}>Data</td>
                    <td style={{textAlign:"center"}}>Requestor</td>
                    <td style={{textAlign:"center"}}>Submit Data</td>
                    <td style={{textAlign:"center"}}>Mark As Sent</td>
                    <td style={{textAlign:"center"}}>Data Sent?</td>
                  </tr>

                </thead>
                <tbody>
                  {this.state.noteTable.map((item, i) => {
                    if(item.requestee === this.state.loggedInAddress) {
                      return [
                          <tr key={i}>
                            <td style={{textAlign:"center"}}>{item.id}</td>
                            <td style={{textAlign:"center"}}>UK Medical Data</td>
                            <td style={{textAlign:"center"}}>{item.requestor}</td>
                            <td style={{textAlign:"center"}}><a href={item.url} target="_blank" className="button small">Submit</a></td>
                            <td style={{textAlign:"center"}}><a onClick={() => this.markAsSent(item.id)} className="button small">Mark As Sent</a></td>
                            {item.status === 0 && <td style={{textAlign:"center"}}><i style={{marginBottom: "0px", verticalAlign: "middle"}} className="fas fa-exclamation fa-1x"></i></td>}
                            {item.status === 1 && <td style={{textAlign:"center"}}><i style={{marginBottom: "0px", verticalAlign: "middle"}} className="fas fa-check fa-1x"></i></td>}
                          </tr>,
                      ];
                    }

                    return [];

                  })}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
