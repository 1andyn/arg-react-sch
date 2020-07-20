/*!

=========================================================
* School - School Selection logic
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

class School extends React.Component {

    //for modal logic
    state = {};
    toggleModal = state => {
        this.setState({
          [state]: !this.state[state]
        });
      };

    render() {

        const school_count = this.props.schoolist.length;

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
                                        >
                                            <div className="card-profile-actions py-4 mt-lg-0">
                                                <Button
                                                    className="float-right"
                                                    color="default"
                                                    href="#pablo"
                                                    onClick={() => this.toggleModal("defaultModal")}
                                                    size="sm"
                                                >
                                                    I don't see my campus!
                                             </Button>
                                                <Modal
                                                    className="modal-dialog-centered"
                                                    isOpen={this.state.defaultModal}
                                                    toggle={() => this.toggleModal("defaultModal")}
                                                >
                                                    <div className="modal-header">
                                                        <h6 className="modal-title" id="modal-title-default">
                                                            We're sorry!
                                                        </h6>
                                                        <button
                                                            aria-label="Close"
                                                            className="close"
                                                            data-dismiss="modal"
                                                            type="button"
                                                            onClick={() => this.toggleModal("defaultModal")}
                                                        >
                                                            <span aria-hidden={true}>×</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <p>
                                                            This web app builds course information off of the <a href ="https://www.sis.hawaii.edu/uhdad/avail.classes">
                                                                Course Availability
                                                                </a> web site. If your campus is available on the webpage, 
                                                                this web app doesn't support it yet. If your campus is not on the webpage,
                                                                this web app cannot pull courses for the campus.
                                                         </p>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <Button
                                                            className="ml-auto"
                                                            color="link"
                                                            data-dismiss="modal"
                                                            type="button"
                                                            onClick={() => this.toggleModal("defaultModal")}
                                                        >
                                                            Close
                                                        </Button>
                                                    </div>
                                                </Modal>
                                            </div>
                                        </Col>
                                        <Col className="order-lg-1" lg="4">
                                            <div className="card-profile-stats d-flex justify-content-center">
                                                <div>
                                                    <span className="heading">{school_count}</span>
                                                    <span className="description">Campuses Available</span>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="text-center mt-5">
                                        <h1>
                                            University of Hawaiʻi
                                    </h1>
                                        <h5>
                                            Please select your campus below
                                    </h5>
                                    </div>
                                    <div className="mt-3 py-3 border-top text-center">
                                        <Row className="justify-content-center">
                                            <Col lg="9">
                                            {this.props.schoolist.map(school => 

                                            (
                                                <div className ="mb-1" key={school.strSchoolCode}>
                                                <Button
                                                    block
                                                    color="default"
                                                    type="button"
                                                    onClick={() => this.props.setSchool(school)}>{school.strSchoolDesc}</Button></div>
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

export default School;