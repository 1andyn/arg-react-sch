/*!

=========================================================
* Builder - Schedule Builder Logic
=========================================================

Used for selecting subject and courses and proceeding to build course schedules

=========================================================

*/

import React from "react";

import {
    Container,
    Badge,
    Row,
    Col,
    Button,
    Card,
    Modal,
    Input,
    FormGroup,
    ListGroup,
    ListGroupItem
} from "reactstrap";

import Timetable from "views/App/Timetable.js";
import Filters from "views/App/Filters.js";
import Select from 'react-select'
import moment from 'moment';

//end points
const end = require('./Endpoints');

class Builder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sub: "",
            vcpList: new Map(),
            crsList: [],
            clpList: [],
            twelveHr : true,
            filter: "",
            dayFilterU: false,
            dayFilterM: false,
            dayFilterT: false,
            dayFilterW: false,
            dayFilterR: false,
            dayFilterF: false,
            dayFilterS: false,
            fullFilter: false,
            tbaFilter: false,
            minTimeStart: moment().hour(6).minute(0).second(0),
            maxTimeEnd: moment().hour(22).minute(0).second(0)
        }

        //filter binds
        this.toggleFullFilter = this.toggleFullFilter.bind(this);
        this.toggleTBAFilter = this.toggleTBAFilter.bind(this);
        this.toggleDayFilter = this.toggleDayFilter.bind(this);
        this.setStartMinimum = this.setStartMinimum.bind(this);
        this.setEndMaximum = this.setEndMaximum.bind(this);

        //option bind
        this.toggleTwelveHour = this.toggleTwelveHour.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.toggleVirtual = this.toggleVirtual.bind(this);

        this.addSelectedToClipboard = this.addSelectedToClipboard.bind(this);
        this.deleteCrnFromClipboard = this.deleteCrnFromClipboard.bind(this);

    };

    setStartMinimum = (min) => {
        this.setState ({ minTimeStart : min });
    };

    setEndMaximum = (max) => {
        this.setState ({ maxTimeEnd : max });
    };

    toggleFullFilter = () => {
        this.setState ({ fullFilter : !this.state.fullFilter });
    };

    toggleTBAFilter = () => {
        this.setState ({ tbaFilter : !this.state.tbaFilter });
    };

    toggleDayFilter = (day) => {
        switch(day) {
            case 'u':
                this.setState({ dayFilterU : !this.state.dayFilterU });
                break;
            case 'm':
                this.setState({ dayFilterM : !this.state.dayFilterM });
                break;
            case 't':
                this.setState({ dayFilterT : !this.state.dayFilterT });
                break;
            case 'w':
                this.setState({ dayFilterW : !this.state.dayFilterW });
                break;
            case 'r':
                this.setState({ dayFilterR : !this.state.dayFilterR });
                break;
            case 'f':
                this.setState({ dayFilterF : !this.state.dayFilterF });
                break;
            case 's':
                this.setState({ dayFilterS : !this.state.dayFilterS });
                break;
            default:
                break; //do nothing
        }
    };

    subject_select(sub_code) {

        //console.log("Sub to set to: " + sub_code.strSubCode)
        //retrieve subject list for school
        const apiUrl = end.crs_d + "/courses/" + this.props.school + "/" + this.props.term + "/" + sub_code.strSubCode;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => this.setSortedCourseList(data))
        //clears old vcpList when changing subjects and set subject code
        this.setState({
            sub: sub_code.strSubCode,
            vcpList: new Map()
        });

    };

    setSortedCourseList(data) {
        var temp_data = data;
        temp_data.sort((crs_1, crs_2) => parseInt(crs_1.strCRN) - parseInt(crs_2.strCRN));
        this.setState({
            crsList: temp_data
        });

    };

    toggleVirtual(event) {
        const item = event.target.id;
        const isChecked = event.target.checked;
        this.setState(prevState => ({ checkedItems: prevState.vcpList.set(item, isChecked) }));
    };

    deleteCrnFromClipboard(crn) {
        var data = this.state.clpList;
        var index = this.binarySearchCRN(crn, data);

        data.splice(index,1);
        this.setState({
            clpList : data
        });

    };

    helpDisplayCourseList() {
        return this.state.crsList.length === 0 ? (<div className = "cl-centered"><h5>Select courses by looking through subjects!</h5></div>) : '' ;
    }

    helpDisplayClipList() {
        return this.state.clpList.length === 0 ? (<div className = "cl-centered"><h6>Add courses from the list to the left!</h6></div>) : '' ;
    }


    binarySearchCRN(crn, datasource) {
        //binary search, expects datasource that has a strCRN element

        var data = datasource
        var left = 0;
        var right = data.length - 1;
        //binary search since clipboard is sorted
        while (left <= right) {
            var mid = parseInt(left + (right - left) / 2);
            //console.log("Left: " + left + " Mid: " + mid + " Right: " + right + " CRN: " + crn);
            if (parseInt(data[mid].strCRN) === parseInt(crn)) {
                return mid;
            } else if (data[mid].strCRN > crn) {
                //mid point is greater than crn
                right = mid - 1;
            } else {
                //mid is less than crn
                left = mid + 1;
            }
        }

        //not found
        return -1;

    }

    addCRNtoClipboard(crn) {
        //perform binary search on existing clipboard list to ensure
        //we don't already have the value
        //binary search since clipboard is sorted

        var clip_data = this.state.clpList;
        if (this.binarySearchCRN(crn, clip_data) !== -1 ) {
            //CRN already in clipboard
            return -1;
        };

        //not found in clip board, look for course in course list to get data for deep copy
        var index = this.binarySearchCRN(crn, this.state.crsList);
        //create a deep copy since crsList gets destroyed every subject change
        var copy_obj = JSON.parse(JSON.stringify(this.state.crsList[index]));
        clip_data.push(copy_obj);
        //sort clipboard so we can use binary search in future
        clip_data.sort((crs_1, crs_2) => parseInt(crs_1.strCRN) - parseInt(crs_2.strCRN));
        this.setState({ clpList: clip_data });
        //console.log("Added crn to clipboard: " + crn);
    };

    addSelectedToClipboard() {
        for (var [crn, checked] of this.state.vcpList) {
            if (checked) {
                this.addCRNtoClipboard(crn);
            }
        }
    };

    //for modal logic
    state = {};
    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };

    setFilter(value) {
        this.setState({
            filter : value
        });
    }

    filterCheck(crn) {
        if(this.state.filter === "") 
            return ("");

        //filter only matches on course name, course desc, or CRN
        var index = this.binarySearchCRN(crn, this.state.crsList);
        if(index === -1)
            return("");

        var course = this.state.crsList[index];

        if((course.strCRN).toString().toLowerCase().indexOf(this.state.filter) !== -1 
            || (course.strTitle).toString().toLowerCase().indexOf(this.state.filter) !== -1 
            || (course.strCourse).toString().toLowerCase().indexOf(this.state.filter)  !== -1)
            return ("");

        //no match
        return("cl-filtered-item");
    }

    toggleTwelveHour() {
        if(this.state.twelveHr) {
            this.setState({twelveHr : false});
        } else {
            this.setState({twelveHr : true});
        }
    }

    timeFormat(time) {

        time = String(time);

        if (time === "") return "";
        if (time === "0" || time === "TBA") return "TBA";

        if(this.state.twelveHr) {
            if(time.length === 4) {
                var hr = parseInt(time.substr(0,2));
                var tag = hr >= 12 ? "PM" : "AM";
                hr = (hr > 12) ? (hr % 12) : hr;
                return String(hr) + ":" + time.substr(2) + " " + tag;
            } else {
                return time.substr(0,1) + ":" + time.substr(1) + " AM";
            }

        } else {
            if(time.length === 4) {
                return time.substr(0,2) + ":" + time.substr(2);
            } else {
                return time.substr(0,1) + ":" + time.substr(1);
            }
        }
    }

    render() {

        return (
            <>
                <main className="profile-page" ref="main">
                    <section className="section-app-limit-builder section-shaped my-0"></section> {/* Sets spacing from top */}
                    <section className="section">
                        <Container>
                            <Card className="card-profile shadow mt--300">
                                <div className="px-4">
                                    <div className="mt-3">
                                        <Row>
                                            <Col sm={8}>
                                                <Select
                                                    options={this.props.sublist}
                                                    getOptionLabel={(option) => option.strSubDesc}
                                                    getOptionValue={(option) => option.strSubCode}
                                                    onChange={value => this.subject_select(value)} />
                                            </Col>
                                            <Col s={4}>
                                                <Button
                                                    className=""
                                                    color="info"
                                                    onClick={this.addSelectedToClipboard}
                                                    block
                                                >
                                                    Add
                                                </Button>
                                            </Col>                                           
                                            <Col s={4}>
                                                <Button
                                                    className=""
                                                    color="default"
                                                    onClick={() => this.toggleModal("Builder")}
                                                    block
                                                >
                                                    Build
                                                </Button>
                                                <Modal
                                                    className="modal-dialog-centered"
                                                    isOpen={this.state.Builder}
                                                    toggle={() => this.toggleModal("Builder")}
                                                >
                                                    <div>
                                                        <Timetable 
                                                            courses = {this.state.clpList}
                                                            timeformat = {this.state.twelveHr}
                                                        />
                                                    </div>
                                                    <div className="modal-footer mt-3"></div>
                                                    <ListGroup>    
                                                        <ListGroupItem className="timetb-listitem">
                                                            <div>
                                                                <Badge className="text-uppercase" color="danger">Work in progress</Badge>
                                                            </div>
                                                        </ListGroupItem>
                                                            <div>

                                                            {this.state.clpList.map(clip => (
                                                                <ListGroupItem key={clip.strCRN + "_clp"} className="timetb-listitem">
                                                                <Row>
                                                                    <Col s={1} className="timetb-foot-nr">
                                                                        <Badge className="text-uppercase" color="primary">{clip.strCRN}</Badge>
                                                                        <Badge className="text-uppercase ml-1" color="prime-dark">{clip.strCourse}</Badge>
                                                                    </Col>
                                                                    <Col s={3}className="timetb-foot-nr">
                                                                        <Badge className="text-uppercase" color="primary" pill>
                                                                            {this.timeFormat(clip.intTimeStart) + " - " + this.timeFormat(clip.intTimeEnd)}</Badge>
                                                                        <Badge className="text-uppercase badge-day ml-1" color="success">{clip.arrDays.map(day => (<span key={clip.strCrn+day}>{day}</span>))}</Badge>
                                                                        <Badge className="text-uppercase ml-1" color="info">Room: {clip.strRoom}</Badge>
                                                                    </Col>
                                                                    <Col s={3} className="timetb-foot-nr">
                                                                        <Badge className="text-uppercase" color="primary" pill>
                                                                            {clip.strRoom2 === "" ? "" : this.timeFormat(clip.intTimeStart2)
                                                                            + " - " + this.timeFormat(clip.intTimeEnd2)}</Badge>
                                                                        {clip.strRoom2 === "" ? "" : clip.arrDays2.map(day => (
                                                                        <Badge className="text-uppercase badge-day ml-1" color={day === "TBA" ? "warning" : "success"} key={clip.strCrn + "_2" + day}>{day}</Badge>))}
                                                                        <Badge className="text-uppercase ml-1" color="info-less">{clip.strRoom2 === "" ? "" : "Room: " + clip.strRoom2}</Badge>
                                                                    </Col>
                                                                </Row>
                                                                </ListGroupItem>
                                                            ))}

                                                            </div>
                                                        <ListGroupItem className="timetb-listitem">
                                                            <div>
                                                                <Button
                                                                    className="ml-auto float-right"
                                                                    color="link"
                                                                    data-dismiss="modal"
                                                                    type="button"
                                                                    onClick={() => this.toggleModal("Builder")}
                                                                >
                                                                    Close
                                                                </Button>
                                                            </div>
                                                        </ListGroupItem>
                                                        </ListGroup>
                                                </Modal>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="mt-2">
                                        <Row>
                                            <Col sm={8}>
                                                <FormGroup>
                                                    <Input onChange={event => this.setFilter(event.target.value)} name="searchtext" id="SearchFilter" placeholder="CRN or Course name after selecting Subject" />
                                                </FormGroup>
                                            </Col>
                                            <Col s={4}>
                                            <Button
                                                    className=""
                                                    color="secondary"
                                                    onClick={() => this.toggleModal("FilterModal")}
                                                    block
                                                >
                                                    Filters
                                            </Button>
                                            <Modal
                                                    className="modal-dialog-centered"
                                                    isOpen={this.state.FilterModal}
                                                    toggle={() => this.toggleModal("FilterModal")}
                                                >
                                                        <div className="modal-header">
                                                        <h6 className="modal-title" id="modal-title-default">
                                                            Filters
                                                        </h6>
                                                        <button
                                                            aria-label="Close"
                                                            className="close"
                                                            data-dismiss="modal"
                                                            type="button"
                                                            onClick={() => this.toggleModal("FilterModal")}
                                                        >
                                                            <span aria-hidden={true}>×</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <Filters
                                                            dayFilterU = {this.state.dayFilterU}
                                                            dayFilterM = {this.state.dayFilterM}
                                                            dayFilterT = {this.state.dayFilterT}
                                                            dayFilterW = {this.state.dayFilterW}
                                                            dayFilterR = {this.state.dayFilterR}
                                                            dayFilterF = {this.state.dayFilterF}
                                                            dayFilterS = {this.state.dayFilterS}
                                                            fullFilter = {this.state.fullFilter}
                                                            tbaFilter = {this.state.tbaFilter}
                                                            minTimeStart = {this.state.minTimeStart}
                                                            maxTimeEnd = {this.state.maxTimeEnd}
                                                            setStartMinimum = {this.setStartMinimum}
                                                            setEndMaximum = {this.setEndMaximum}
                                                            toggleFullFilter = {this.toggleFullFilter}
                                                            toggleTBAFilter = {this.toggleTBAFilter}
                                                            toggleDayFilter = {this.toggleDayFilter} />
                                                    </div>
                                            </Modal>
                                            </Col>
                                            <Col s={4}>
                                            <Button
                                                    className=""
                                                    color="primary"
                                                    onClick={() => this.toggleModal("Options")}
                                                    block
                                                >
                                                    Options
                                            </Button>
                                            <Modal
                                                    className="modal-dialog-centered"
                                                    isOpen={this.state.Options}
                                                    toggle={() => this.toggleModal("Options")}
                                                >
                                                        <div className="modal-header">
                                                        <h6 className="modal-title" id="modal-title-default">
                                                            Options
                                                        </h6>
                                                        <button
                                                            aria-label="Close"
                                                            className="close"
                                                            data-dismiss="modal"
                                                            type="button"
                                                            onClick={() => this.toggleModal("Options")}
                                                        >
                                                            <span aria-hidden={true}>×</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="mb-3">	
                                                        <small className="text-uppercase font-weight-bold">	
                                                            12-hr Mode
                                                        </small>	
                                                        </div>
                                                        <label className="custom-toggle">	
                                                        <input type="checkbox" onChange ={this.toggleTwelveHour} defaultValue={this.state.twelveHr}/>	
                                                        <span className="custom-toggle-slider rounded-circle" />	
                                                        </label>
                                                        <p>
                                                            This functionality is still being developed.
                                                            Hang tight!
                                                        </p>
                                                    </div>
                                            </Modal>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="mt-1 py-3 border-top">
                                        <Row>
                                            <Col sm={8}>
                                                <div className="border-right section-scroll">
                                                    <ListGroup>
                                                        {this.helpDisplayCourseList()}
                                                        {this.state.crsList.map(crs => (
                                                            <ListGroupItem key={"grp_" + crs.strCRN} className = {this.filterCheck(crs.strCRN)}>
                                                                <Row>
                                                                    <Col><h6 className="mb-0 heading-title text-primary">{crs.strTitle}</h6></Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xs={3}><span className ="less-strong">{crs.strCourse}</span></Col>
                                                                    <Col xs={4}><span>{crs.strInstr}</span></Col>
                                                                    <Col xs={4}>
                                                                        <Badge className="text-uppercase less-strong" 
                                                                            color={crs.intSeats > 0 ? crs.intSeats > 2 ? "primary": "warning" : "danger"}>Seats: {crs.intSeats} </Badge>
                                                                        <Badge className="text-uppercase less-strong ml-1" 
                                                                            color={crs.intWaitAvail > 0 ? crs.intWaitAvail > 2 ? "primary": "warning" : "danger"}>Wait: {crs.intWaitAvail}</Badge></Col>
                                                                    <Col xs={1}>
                                                                        <div className="custom-control custom-checkbox float-right">
                                                                            <input
                                                                                className="custom-control-input"
                                                                                id={crs.strCRN}
                                                                                type="checkbox"
                                                                                onClick={this.toggleVirtual}
                                                                            />
                                                                            <label className="custom-control-label" htmlFor={crs.strCRN}>
                                                                            </label>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xs={2}><span className="text-success strong">{crs.strCRN}</span></Col>
                                                                    <Col xs={3}>
                                                                        <Badge className="text-uppercase" color="primary" pill>
                                                                            {this.timeFormat(crs.intTimeStart) + " - " + this.timeFormat(crs.intTimeEnd)}</Badge>
                                                                    </Col>
                                                                    <Col xs={2}>{crs.arrDays.map(day => (
                                                                        <Badge className="text-uppercase badge-day" color={day === "TBA" ? "warning" : "success"} key={crs.strCrn + "_" + day}>{day}</Badge>
                                                                    ))}</Col>
                                                                    <Col xs={4}><Badge className="text-uppercase" color="info-less">Room: {crs.strRoom}</Badge></Col>
                                                                    <Col></Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xs={2}></Col>
                                                                    <Col xs={3}>
                                                                        <Badge className="text-uppercase" color="primary" pill>
                                                                            {crs.strRoom2 === "" ? "" : this.timeFormat(crs.intTimeStart2)
                                                                            + " - " + this.timeFormat(crs.intTimeEnd2)}</Badge></Col>
                                                                    <Col xs={2}>{crs.strRoom2 === "" ? "" : crs.arrDays2.map(day => (
                                                                        <Badge className="text-uppercase badge-day" color={day === "TBA" ? "warning" : "success"} key={crs.strCrn + "_2" + day}>{day}</Badge>
                                                                    ))}</Col>
                                                                    <Col xs={4}><Badge className="text-uppercase" color="info-less">{crs.strRoom2 === "" ? "" : "Room: " + crs.strRoom2}</Badge></Col>
                                                                    <Col></Col>
                                                                </Row>
                                                            </ListGroupItem>
                                                        ))}
                                                    </ListGroup>
                                                </div>
                                            </Col>
                                            <Col s={4} className = "section-no-x-flow clip-list-col">
                                                <div className="section-scroll">
                                                    <ListGroup className = "clip-list-col">
                                                        {this.helpDisplayClipList()}
                                                        {this.state.clpList.map(clip =>
                                                            <ListGroupItem className="lgi-clp" key={clip.strCRN + "_clp"}>
                                                                <Row className = "clip-row-title clip-row-width">
                                                                    <Col>
                                                                        <div className="clp-list-title">{clip.strTitle}</div>
                                                                    </Col>
                                                                </Row>
                                                                <Row className = "clip-row-width">
                                                                    <Col>
                                                                        <Badge className="text-uppercase" color="primary">{clip.strCourse}</Badge>
                                                                        <Badge className="text-uppercase ml-1" color="success" pill>{clip.strCRN}</Badge>
                                                                    </Col>
                                                                    <div className = "float-right">
                                                                        <Badge 
                                                                            className="badge-button text-uppercase" 
                                                                            color="warning" 
                                                                            onClick={() => this.deleteCrnFromClipboard(clip.strCRN)}
                                                                            pill>
                                                                            <span className="btn-inner--icon">
                                                                                <i className="fa fa-trash" />
                                                                            </span>
                                                                        </Badge>
                                                                        </div>
                                                                </Row>
                                                            </ListGroupItem>)}
                                                    </ListGroup>
                                                </div>
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

export default Builder;