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
import Builder from "views/App/Builder.js";

//end points
const end = require('./Endpoints');

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
    const apiUrl = end.crs_d + "/campus/list/";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
                //prioritize MANOA
                var schools = data;
                schools.sort((crs_1, crs_2) => {
                if (crs_1.strSchoolCode === "MAN") return -1;
                if (crs_2.strSchoolCode === "MAN") return 1;
                return (crs_1.strSchoolCode) - (crs_2.strSchoolCode);
                });
      this.setState({school_list : schools})});
  };

  restartApp = () => {
    this.setState({
      stage: "intro-restarted",
      school: "",
      school_code: "",
      school_list: [],
      sub_list: [],
      term: "",
      term_list: [],
      restarted: true
    }, () => {
      window.setTimeout(() => {
        this.setState({restarted:false})
      }, 2500) //hide restart indication after 3 seconds
    });
  }

  setSchool (code) {
    //console.log("School to set to: " + code.strSchoolDesc)
    //retrieve term list for school
    const apiUrl = end.crs_d + "/term/" + code.strSchoolCode;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => this.setState({term_list : data}))
    this.setState({
      school: code.strSchoolDesc, 
      school_code : code.strSchoolCode,
      stage: "select-term"
    });

  }

  setTerm (code) {
    //console.log("Term to set to: " + code.strTermCode)
        //retrieve subject list for school
        const apiUrl = end.crs_d + "/subs/" + this.state.school_code + "/" + code.strTermCode;
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => this.setState({sub_list : data}))
          this.setState({
            term: code.strTermCode,
            stage: "builder"
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
              setTerm = {this.setTerm} />
          </section>
        </>
      );
    } else if (this.state.stage === "builder") {
      return (
        <>
          <section className="section section-hero section-shaped">
            <AppNavbar restartApp={this.restartApp} />
            <div className="shape shape-default"></div>
            <Builder 
              school = {this.state.school_code}
              term = {this.state.term}
              sublist = {this.state.sub_list} />
          </section>
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
