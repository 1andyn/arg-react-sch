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
            sub : "",
            vcp_list: new Map(),
            crs_list : [],
            clp_list : []
        }

        this.toggleVirtual = this.toggleVirtual.bind(this)
    };

    subject_select(sub_code) {
        //console.log("Sub to set to: " + sub_code.strSubCode)
        //retrieve subject list for school
        const apiUrl = 'http://localhost:3000/courses/' + this.props.school + "/" + this.props.term + "/" + sub_code.strSubCode;
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => this.setState({crs_list : data}))
        this.setState({
            sub : sub_code.strSubCode,
            vcp_list: new Map()
        })
        //clears old vcp_list when changing subjects
    };

    toggleVirtual(event) {
        const item = event.target.id;
        const isChecked = event.target.checked;
        this.setState(prevState => ({ checkedItems: prevState.vcp_list.set(item, isChecked) }));
        console.log(this.state.vcp_list);
    }
    
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
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                    block
                                                >
                                                Add
                                                </Button>
                                            </Col>
                                            <Col s={4}>
                                                <Button
                                                    className=""
                                                    color="default"
                                                    href="#pablo"
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
                                                <div className = "border-right section-scroll">
                                                    <ListGroup>
                                                        {this.state.crs_list.map(crs => (
                                                            <ListGroupItem key={"grp_"+crs.strCRN}>
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
                                                                    <Col><span className ="text-success">{crs.strCRN}</span></Col>
                                                                    <Col xs={4}>
                                                                        <Badge className="text-uppercase" color= "primary" pill>
                                                                        {crs.intTimeStart === 0 ? "Start: TBA" : "Start: " + crs.intTimeStart }</Badge>
                                                                        <Badge className="text-uppercase" color= "primary" pill>
                                                                        {crs.intTimeEnd === 0 ? "End: TBA" : "End: " + crs.intTimeEnd }</Badge>
                                                                    </Col>
                                                                    <Col xs={3}>{ crs.arrDays.map(day => (
                                                                        <Badge className="text-uppercase" color= "success" key = {crs.strCrn + "_" + day} pill>{day}</Badge>
                                                                    ))}</Col> 
                                                                    <Col><Badge className="text-uppercase" color= "info-less">Room: {crs.strRoom}</Badge></Col>
                                                                    <Col></Col> 
                                                                </Row>
                                                                <Row>
                                                                    <Col></Col>
                                                                    <Col xs={4}>
                                                                        <Badge className="text-uppercase" color= "primary" pill>
                                                                        {crs.strRoom2 === "" ? "" : crs.intTimeStart2 === 0 ? "Start: " + crs.intTimeStart2 : "Start: TBA" }</Badge>
                                                                        <Badge className="text-uppercase" color= "primary" pill>
                                                                        {crs.strRoom2 === "" ? "" : crs.intTimeEnd2 === 0 ? "End: " + crs.intTimeEnd2 : "End: TBA" }</Badge></Col>
                                                                    <Col xs = {3}>{ crs.strRoom2 === "" ? "" : crs.arrDays2.map(day => (
                                                                        <Badge className="text-uppercase" color= "success" key = {crs.strCrn + "_2" + day} pill>{day}</Badge>
                                                                    ))}</Col> 
                                                                    <Col><Badge className="text-uppercase" color= "info-less">{crs.strRoom2 === "" ? "" : "Room: " + crs.strRoom2}</Badge></Col>
                                                                    <Col></Col> 
                                                                </Row>
                                                            </ListGroupItem>
                                                        ))}
                                                    </ListGroup>
                                                </div>
                                            </Col>
                                            <Col s={4}>
                                                <div className ="section-scroll">
                                                <ListGroup>
                                                        {this.state.clp_list.map(clip => 
                                                            <ListGroupItem>{clip}</ListGroupItem>)}
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