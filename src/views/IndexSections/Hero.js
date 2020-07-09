/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { 
  Button, 
  Container, 
  Row, 
  Col, 
  Modal,
  UncontrolledTooltip,
  NavLink 
} from "reactstrap";

class Hero extends React.Component {
  state = {};

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  render() {
    return (
      <>
        <div className="position-relative">
          <section className="section section-hero section-shaped">
            {/* Background, don't remove */}
            <div className="shape shape-default">
            </div>
            <Container 
             className="shape-container d-flex align-items-center py-lg"
             id="introdisp">
              <div className="col px-0">
                <Row className="align-items-center justify-content-center">
                  <Col className="text-center" lg="6">
                    <NavLink
                      id="argrectsch-logo">
                    <img
                      alt="..."
                      className="img-fluid"
                      src={require("assets/img/brand/arg-react-sch.png")}
                      style={{ width: "200px" }}
                    />
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="argrectsch-logo">
                      Argon React Scheduler
                    </UncontrolledTooltip>
                    <p className="lead text-white">
                      University of Hawai‘i Semester Planner
                    </p>
                    <div className="btn-wrapper mt-5">
                      <Button
                        className="btn-white btn-icon mb-3 mb-sm-0"
                        color="default"
                        href=""
                        size="lg"
                        onClick={() => this.toggleModal("defaultModal")}
                      >
                        <span className="btn-inner--icon mr-1">
                          <i className="ni ni-send" />
                        </span>
                        <span className="btn-inner--text">Click to Start</span>
                      </Button>{" "}
                      <Modal
                        className="modal-dialog-centered"
                        isOpen={this.state.defaultModal}
                        toggle={() => this.toggleModal("defaultModal")}
                      >
                        <div className="modal-header">
                          <h6 className="modal-title" id="modal-title-default">
                            Work in progress
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
                            This hasn't been implemented yet. Hang tight!
                          </p>
                          <p>
                            Still in development.
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
                    <div className="mt-5">
                      <small className="text-white font-weight-bold mb-0 mr-2">
                        Plan out your course schedule before registering for class!
                      </small>
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
          </section>
        </div>
      </>
    );
  }
}

export default Hero;
