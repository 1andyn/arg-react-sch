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
import Terms from "views/App/Terms.js";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: "intro",
      school_system: "UH",
      school: "",
      school_list: [],
      term: "",
      term_list: [],
      restarted : false
    };
    //child function call will hit this parent
    this.startApp = this.startApp.bind(this);
    this.restartApp = this.restartApp.bind(this);
    this.setSchool = this.setSchool.bind(this);
    this.setTerm = this.setTerm.bind(this);
  }

  startApp = () => {
    this.setState({ stage: "select-school" });
    const apiUrl = 'http://localhost:3000/campus/list/';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => this.setState({school_list : data}))
  };

  restartApp = () => {
    this.setState({
      stage: "intro-restarted",
      school: "",
      school_list: [],
      term: "",
      term_list: [],
      restarted: true
    }, () => {
      window.setTimeout(() => {
        this.setState({restarted:false})
      }, 3000) //hide restart indication after 3 seconds
    });
  }

  setSchool (code) {
    console.log("School to set to: " + code.strSchoolDesc)
    //retrieve term list for school
    const apiUrl = 'http://localhost:3000/term/' + code.strSchoolCode;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => this.setState({term_list : data}))
    this.setState({
      school: code.strSchoolDesc, 
      stage: "select-term"
    });

  }

  setTerm (code) {
    console.log("Term to set to: " + code.strTermCode)
    this.setState({
      term: code.strTermCode
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
                  <div className = "nav-wrapper">
                  <UncontrolledAlert color="success" fade={true} isOpen = {this.state.restarted}>
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
            <School schoolist = {this.state.school_list} 
              setSchool={this.setSchool}/>
          </section>
          <AppFooter />
        </>
      );
    }  else if (this.state.stage === "select-term") {
      return (
        <>
          <section className="section section-hero section-shaped">
            <AppNavbar restartApp={this.restartApp} />
            <div className="shape shape-default"></div>
            <Terms 
              schoolname = {this.state.school}
              termlist = {this.state.term_list} 
              setTerm={this.setTerm}/>
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
