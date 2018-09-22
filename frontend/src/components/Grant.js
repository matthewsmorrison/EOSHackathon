import React from 'react';

export class Grant extends React.Component {
    render() {
        return (
            <section id="wrapper" >
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
                                <td>Requestor</td>
                                <td colSpan={3}>Type</td>
                              </tr>

                            </thead>
                            <tbody>
                              <tr>
                                <td>HospitalX</td>
                                <td>UK Medical Records</td>
                                <td style={{textAlign:"center"}}><a className="button small">Grant Access</a></td>
                                <td style={{textAlign:"center"}}><a className="button small">Deny Access</a></td>
                              </tr>

                              <tr>
                                <td>HospitalY</td>
                                <td>UK Medical Records</td>
                                <td style={{textAlign:"center"}}><a className="button small">Grant Access</a></td>
                                <td style={{textAlign:"center"}}><a className="button small">Deny Access</a></td>
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
