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
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledTooltip,
  Modal,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

class AppNavbar extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out"
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: ""
    });
  };

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  render() {
    
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
                {/* ------------------------------ nav bar image logic web ------------------------------------*/}
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img
                  alt="..."
                  src={require("assets/img/brand/argon-react-white.png")}
                />
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                {/* ------------------------------ nav bar image logic mobile ------------------------------------*/}
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                          alt="..."
                          src={require("assets/img/brand/argon-react-dark.png")}
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                {/* ------------------------------ page drop down for dev comp ------------------------------------*/}
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Development - TO BE DELETED</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem to="/profile-page" tag={Link}>
                        Test Dev Components Page
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
                {/* ------------------------------ github repo link block ------------------------------------*/}
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="https://github.com/1andyn/arg-react-sch"
                      id="tooltip112445449"
                      target="_blank"
                    >
                      <i className="fa fa-github" />
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Github
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip112445449">
                      Project Repository
                    </UncontrolledTooltip>
                  </NavItem>
                  <NavItem className="d-none d-lg-block ml-lg-4">
                {/* ------------------------------ restart button logic block ------------------------------------*/}
                  <Button 
                   className="btn-neutral btn-icon"
                   color="default" 
                   id="tooltip969535472"
                   onClick={() => this.toggleModal("notificationModal")}
                   >
                  <span className="btn-inner--icon">
                        <i className="fa fa-undo mr-2" />
                  </span>
                  <span className="nav-link-inner--text ml-1">
                    Restart
                  </span>
                  </Button>
                  <Modal
                   className="modal-dialog-centered modal-danger"
                   contentClassName="bg-gradient-danger"
                   isOpen={this.state.notificationModal}
                   toggle={() => this.toggleModal("notificationModal")}
                  >
                  <div className="modal-header">
                    <h6 className="modal-title" id="modal-title-notification">
                      This hasn't been implemented yet!
                    </h6>
                    <button
                      aria-label="Close"
                      className="close"
                      data-dismiss="modal"
                      type="button"
                      onClick={() => this.toggleModal("notificationModal")}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="py-3 text-center">
                      <i className="ni ni-bell-55 ni-3x" />
                      <h4 className="heading mt-4">Notice</h4>
                      <p>
                        This functionality hasn't been implemented. Please refresh the page to restart in the meantime.
                      </p>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <Button className="btn-white" color="default" type="button">
                      Ok, Got it
                    </Button>
                    <Button
                      className="text-white ml-auto"
                      color="link"
                      data-dismiss="modal"
                      type="button"
                      onClick={() => this.toggleModal("notificationModal")}
                    >
                      Close
                    </Button>
                  </div>
                </Modal>
                  <UncontrolledTooltip 
                   delay={0} 
                   target="tooltip969535472"
                   placement="right">
                      Click to Restart
                  </UncontrolledTooltip>
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default AppNavbar;
