/*!

=========================================================
* Term - Term Selection logic
=========================================================



=========================================================

*/

import React from "react";

import {
    Container,
    Row,
    Col,
    Button,
    Card,
    Modal
} from "reactstrap";

class Terms extends React.Component {

    render() {

        const term_count = this.props.termlist.length;

        return (
            <>
                <main className="profile-page" ref="main">
                    <section className="section-app-limit section-shaped my-0"></section> {/* Sets spacing from top */}
                    <section className="section">
                        <Container>
                            <Card className="card-profile shadow mt--300">
                                <div className="px-4">
                                    <Row className="justify-content-center">
                                        <Col className="order-lg-2" lg="3">
                                            <div className="card-profile-image">
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    <img
                                                        alt="..."
                                                        className="rounded-circle"
                                                        src={require("assets/img/theme/system_seal.png")}
                                                    />
                                                </a>
                                            </div>
                                        </Col>
                                        <Col
                                            className="order-lg-3 text-lg-right align-self-lg-center"
                                            lg="4"
                                        />
                                        <Col className="order-lg-1" lg="4">
                                            <div className="card-profile-stats d-flex justify-content-center">
                                                <div>
                                                    <span className="heading">{term_count}</span>
                                                    <span className="description">Terms Available</span>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="text-center mt-5">
                                    <h1>
                                        University of Hawaiʻi
                                    </h1>
                                    <h4>
                                        {this.props.schoolname}
                                    </h4>
                                    <h5>
                                        Please select your term below
                                    </h5>
                                    </div>
                                    <div className="mt-3 py-3 border-top text-center">
                                        <Row className="justify-content-center">
                                            <Col lg="9">
                                            {this.props.termlist.map(term => 

                                            (
                                                <div className ="mb-1" key={term.strTermCode}>
                                                <Button
                                                    block
                                                    color="default"
                                                    type="button"
                                                    onClick={() => this.props.setTerm(term)}>{term.strTermDesc}</Button></div>
                                            )
                                            
                                            )}
                                        </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Card>
                        </Container>
                    </section>
                </main>
            </>
        );
    }
}

export default Terms;