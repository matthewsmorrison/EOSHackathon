import React from 'react';

export const Home = () => (
    <div>
        {/* Banner */}
        <section id="banner">
            <div className="inner">
                <div className="logo"><span className="icon fa-diamond"></span></div>
                <h2>SecuriShare</h2>
                <p>Decentralised Private File Sharing</p>
            </div>
        </section>

        {/* Wrapper */}
        <section id="wrapper">
            {/* One */}
            <section id="one" className="wrapper spotlight style1">
                <div className="inner">
                    <a className="image"><img src="images/data.jpg" alt="" /></a>
                    <div className="content">
                        <h2 className="major">Control Access</h2>
                        <p>Using the EOS Blockchain, each entity using your data has to make an explicit request.</p>
                    </div>
                </div>
            </section>

            {/* Two */}
            <section id="two" className="wrapper alt spotlight style2">
                <div className="inner">
                    <a className="image"><img src="images/server.jpg" alt="" /></a>
                    <div className="content">
                        <h2 className="major">Retain Ownership</h2>
                        <p>You never have to upload your documents to a third party service. Peer-to-peer sharing.</p>
                    </div>
                </div>
            </section>

            {/* Three */}
            <section id="three" className="wrapper spotlight style3">
                <div className="inner">
                    <a className="image"><img src="images/code.jpg" alt="" /></a>
                    <div className="content">
                        <h2 className="major">100% Transparency</h2>
                        <p>All of the smart contract code is deployed on the EOS network.</p>
                    </div>
                </div>
            </section>

            {/* Four */}
            <section id="four" className="wrapper alt style1">
                <div className="inner">
                    <h2 className="major">The Team</h2>
                    <p>This proof-of-concept was created as part of the EOS Hackathon in London in September 2018.</p>

                    <section className="features">
                        <article>
                            <h3 className="major">Matthew Morrison</h3>
                            <p>Responsible for smart contract and front-end development.
                                <span> </span>
                                <a href="https://github.com/matthewsmorrison">GitHub</a>
                            </p>
                        </article>

                        <article>
                            <h3 className="major">Bastien Moyroud</h3>
                            <p>Responsible for front-end and server-side development.
                                <span> </span>
                                <a href="https://github.com/bmoyroud">GitHub</a>
                            </p>
                        </article>

                        <article>
                            <h3 className="major">Mohammed Hussan</h3>
                            <p>Responsible for smart contract and front-end development.
                                <span> </span>
                                <a href="https://github.com/Mo-Hussain">GitHub</a>
                            </p>
                        </article>
                    </section>
                </div>
            </section>
        </section>
    </div>
);
