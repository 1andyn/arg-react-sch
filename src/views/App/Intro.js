/*!

=========================================================
* Intro - Stores Intro to application section
=========================================================

Application Introduction display

=========================================================

*/

import React from "react";

// reactstrap components
import { 
  Button, 
  Container, 
  Row, 
  Col, 
  UncontrolledTooltip,
  NavLink 
} from "reactstrap";

class Intro extends React.Component {

  render() {
    return (
        <>
            {/* Background, don't remove */}
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
                        onClick= {this.props.startApp}
                      >
                        <span className="btn-inner--icon mr-1">
                          <i className="ni ni-send" />
                        </span>
                        <span className="btn-inner--text">Click to Start</span>
                      </Button>{" "}
                    </div>
                    <div className="mt-5">
                      <small className="text-white font-weight-bold mb-0 mr-2">
                        Plan out your course schedule before registering for class! 
                        <p>*Under development*</p>
                      </small>
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
      </>
    );
  }
}

export default Intro;
