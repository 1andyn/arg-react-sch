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
    ListGroup,
    ListGroupItem
} from "reactstrap";

import Select from 'react-select'

class Builder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sub: "",
            vcp_list: new Map(),
            crs_list: [],
            clp_list: []
        }

        this.toggleVirtual = this.toggleVirtual.bind(this);
        this.addSelectedToClipboard = this.addSelectedToClipboard.bind(this);
        this.deleteCrnFromClipboard = this.deleteCrnFromClipboard.bind(this);
    };

    subject_select(sub_code) {

        //console.log("Sub to set to: " + sub_code.strSubCode)
        //retrieve subject list for school
        const apiUrl = 'http://localhost:3000/courses/' + this.props.school + "/" + this.props.term + "/" + sub_code.strSubCode;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => this.setSortedCourseList(data))
        //clears old vcp_list when changing subjects and set subject code
        this.setState({
            sub: sub_code.strSubCode,
            vcp_list: new Map()
        });

    };

    setSortedCourseList(data) {
        var temp_data = data;
        temp_data.sort((crs_1, crs_2) => parseInt(crs_1.strCRN) - parseInt(crs_2.strCRN));
        this.setState({
            crs_list: temp_data
        });

    };

    toggleVirtual(event) {
        const item = event.target.id;
        const isChecked = event.target.checked;
        this.setState(prevState => ({ checkedItems: prevState.vcp_list.set(item, isChecked) }));
    };

    deleteCrnFromClipboard(crn) {
        console.log("Delete clicked for: " + crn);

        var data = this.state.clp_list;
        var index = this.binarySearchCRN(crn, data);

        data.splice(index,1);
        this.setState({
            clp_list : data
        });

    };


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

        var clip_data = this.state.clp_list;
        if (this.binarySearchCRN(crn, clip_data) !== -1 ) {
            //CRN already in clipboard
            return -1;
        };

        //not found in clip board, look for course in course list to get data for deep copy
        var index = this.binarySearchCRN(crn, this.state.crs_list);
        //create a deep copy since crs_list gets destroyed every subject change
        var copy_obj = JSON.parse(JSON.stringify(this.state.crs_list[index]));
        clip_data.push(copy_obj);
        //sort clipboard so we can use binary search in future
        clip_data.sort((crs_1, crs_2) => parseInt(crs_1.strCRN) - parseInt(crs_2.strCRN));
        this.setState({ clp_list: clip_data });
        //console.log("Added crn to clipboard: " + crn);
    };

    addSelectedToClipboard() {
        for (var [crn, checked] of this.state.vcp_list) {
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
                                                    onClick={() => this.toggleModal("defaultModal")}
                                                    block
                                                >
                                                    Build
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
                                                            This functionality is still being developed.
                                                            Hang tight!
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
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="mt-3 py-3 border-top">
                                        <Row>
                                            <Col sm={8}>
                                                <div className="border-right section-scroll">
                                                    <ListGroup>
                                                        {this.state.crs_list.map(crs => (
                                                            <ListGroupItem key={"grp_" + crs.strCRN}>
                                                                <Row>
                                                                    <Col><h6 className="mb-0 heading-title text-primary">{crs.strTitle}</h6></Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xs={3}>{crs.strCourse}</Col>
                                                                    <Col xs={4}>{crs.strInstr}</Col>
                                                                    <Col xs={3}><Badge className="text-uppercase" color={crs.intSeats === 0 ? "warning" : "primary"}>Seats: {crs.intSeats} </Badge>
                                                                        <Badge className="text-uppercase" color={crs.intWaitAvail === 0 ? "warning" : "primary"}>Wait: {crs.intWaitAvail}</Badge></Col>
                                                                    <Col>
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
                                                                    <Col><span className="text-success">{crs.strCRN}</span></Col>
                                                                    <Col xs={4}>
                                                                        <Badge className="text-uppercase" color="primary" pill>
                                                                            {crs.intTimeStart === 0 ? "Start: TBA" : "Start: " + crs.intTimeStart}</Badge>
                                                                        <Badge className="text-uppercase" color="primary" pill>
                                                                            {crs.intTimeEnd === 0 ? "End: TBA" : "End: " + crs.intTimeEnd}</Badge>
                                                                    </Col>
                                                                    <Col xs={3}>{crs.arrDays.map(day => (
                                                                        <Badge className="text-uppercase" color="success" key={crs.strCrn + "_" + day} pill>{day}</Badge>
                                                                    ))}</Col>
                                                                    <Col><Badge className="text-uppercase" color="info-less">Room: {crs.strRoom}</Badge></Col>
                                                                    <Col></Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col></Col>
                                                                    <Col xs={4}>
                                                                        <Badge className="text-uppercase" color="primary" pill>
                                                                            {crs.strRoom2 === "" ? "" : crs.intTimeStart2 === 0 ? "Start: " + crs.intTimeStart2 : "Start: TBA"}</Badge>
                                                                        <Badge className="text-uppercase" color="primary" pill>
                                                                            {crs.strRoom2 === "" ? "" : crs.intTimeEnd2 === 0 ? "End: " + crs.intTimeEnd2 : "End: TBA"}</Badge></Col>
                                                                    <Col xs={3}>{crs.strRoom2 === "" ? "" : crs.arrDays2.map(day => (
                                                                        <Badge className="text-uppercase" color="success" key={crs.strCrn + "_2" + day} pill>{day}</Badge>
                                                                    ))}</Col>
                                                                    <Col><Badge className="text-uppercase" color="info-less">{crs.strRoom2 === "" ? "" : "Room: " + crs.strRoom2}</Badge></Col>
                                                                    <Col></Col>
                                                                </Row>
                                                            </ListGroupItem>
                                                        ))}
                                                    </ListGroup>
                                                </div>
                                            </Col>
                                            <Col s={4} className = "section-no-x-flow">
                                                <div className="section-scroll">
                                                    <ListGroup className = "">
                                                        {this.state.clp_list.map(clip =>
                                                            <ListGroupItem key={clip.strCRN + "_clp"}>
                                                                <Row>
                                                                    <Col>
                                                                        <Badge className="text-uppercase" color="prime-dark">{clip.strTitle}</Badge>
                                                                    </Col>
                                                                    <Col>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col>
                                                                        <Badge className="text-uppercase" color="primary">{clip.strCourse}</Badge>
                                                                        <Badge className="text-uppercase" color="success" pill>{clip.strCRN}</Badge>
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