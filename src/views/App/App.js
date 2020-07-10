/*!

=========================================================
* App - Stores primary Application Functionality
=========================================================



=========================================================

*/
import React from "react";

//reactstrap components
import { UncontrolledAlert,
Container } from "reactstrap";

// core components
import AppNavbar from "components/Navbars/AppNavbar.js";
import AppFooter from "components/Footers/AppFooter.js";
import Intro from "views/App/Intro.js";
import School from "views/App/School.js";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: "intro",
      school_system: "UH",
      school: ""
    };
    //child function call will hit this parent
    this.startApp = this.startApp.bind(this);
    this.restartApp = this.restartApp.bind(this);
  }

  startApp = () => {
    this.setState({ stage: "select-school" });
  };

  restartApp = () => {
    this.setState({
      stage: "intro-restarted",
      school: ""
    });
  }

  render() {

    if (this.state.stage === "intro") {
      return (
        <>
          <AppNavbar restartApp={this.restartApp} />
          <div className="position-relative">
            <section className="section section-hero section-shaped">
              <div className="shape shape-default"></div>
              <Intro startApp={this.startApp} />
            </section>
          </div>
          <AppFooter />
        </>
      );
      } else if (this.state.stage === "intro-restarted") {
        return (
          <>
            <AppNavbar restartApp={this.restartApp} />
            <div className="position-relative">
              <section className="section section-hero section-shaped">
                <div className="shape shape-default"></div>
                <Container>
                  <div class = "nav-wrapper">
                  <UncontrolledAlert color="success" fade={true}>
                    <span className="alert-inner--icon">
                      <i className="ni ni-like-2" />
                    </span>
                    <span className="alert-inner--text ml-1">
                      <strong>Success!</strong> The app was restarted!
                    </span>
                  </UncontrolledAlert>
                  </div>
                </Container>
                <Intro startApp={this.startApp} />
              </section>
            </div>
            <AppFooter />
          </>
        );
    } else if (this.state.stage === "select-school") {
      return (
        <>
          <section className="section section-hero section-shaped">
            <AppNavbar restartApp={this.restartApp} />
            <div className="shape shape-default"></div>
            <School />
          </section>
          <AppFooter />
        </>
      );
    } else {
      return (
        <>
          <AppNavbar restartApp={this.restartApp} />
          <div className="position-relative">
            <section className="section section-hero section-shaped">
              <div className="shape shape-default"></div>
            </section>
          </div>
          <AppFooter />
        </>
      );
    }
  }
}

export default App;
