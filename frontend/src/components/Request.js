import React from 'react';
import Eos from 'eosjs';

export class Request extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      noteTable: [], // to store the table rows from smart contract
      url: null,
      loggedInAddress: "accountc",
      loggedInPrivateKey: "5Hrm938iQPziYAK2NcRqLPPPiNpjLXChVcW9W29KoGfDXHHu9us",
    };
  }

  updateState(evt) {
  let target = evt.target;
  let id = target.id;
  let newState = this.state;

  switch (id) {
    case 'url':
      newState.url = target.value;
      break;

    default:
      console.log("Not updating any state.");
    }

  this.setState(newState);

  }

  requestAccess(requestee) {
    const eos = Eos({keyProvider: this.state.loggedInPrivateKey});

    var actionData = {
      _requestor: this.state.loggedInAddress,
      _requestee: requestee,
      _url: this.state.url,
    };

    eos.transaction({
      actions: [{
          account: "contract1",
          name: "requestdata",
          authorization: [{
            actor: this.state.loggedInAddress,
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
      "code": "contract1",   // contract who owns the table
      "scope": "contract1",  // scope of the table
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
                  <h2>Request Access To Data</h2>
              </div>
          </header>

          {/* Content */}
          <div className="wrapper">
              <div className="inner">

              <h3 className="major">Make Requests For Specific Data</h3>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <td style={{textAlign:"center"}}>Data Type</td>
                      <td style={{textAlign:"center"}}>Account Name</td>
                      <td style={{textAlign:"center"}}>Price (EOS)</td>
                      <td style={{textAlign:"center"}}>Secure URL</td>
                      <td style={{textAlign:"center"}}>Make Request</td>
                    </tr>

                  </thead>
                  <tbody>

                  {this.state.noteTable.map((item, i) => {
                   return [
                       <tr key={i}>
                         <td style={{textAlign:"center"}}>UK Medical Data</td>
                         <td style={{textAlign:"center"}}>{item.requestee}</td>
                         <td style={{textAlign:"center"}}>{item.price}</td>
                         <td><input type="text" id="url" placeholder="Secure URL where data is to be shared" onChange={evt => this.updateState(evt)}></input></td>
                         <td style={{textAlign:"center"}}><a onClick={() => this.requestAccess(item.requestee)} className="button small">Request Access</a></td>
                       </tr>,
                   ];
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
