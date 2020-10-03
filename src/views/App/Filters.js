/*!

=========================================================
* Filters - Filter Display logic
=========================================================

Block for displaying Filters in Builder Modal Popup

=========================================================

*/

import React from "react";

import {
    Row,
    Col,
    Container,
    Badge
} from "reactstrap";

import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';

const timeFormat = 'h:mm a';

class Filters extends React.Component {   

    timeStartSelect(value) {
        this.props.setStartMinimum(value);
    }

    timeEndSelect(value) {
        this.props.setEndMaximum(value);
    }

    toggleHideFull() {
        this.props.toggleFullFilter();
    };

    toggleTBAFilter() {
        this.props.toggleTBAFilter();
    };

    toggleDayFilters(day) {
        this.props.toggleDayFilter(day);
    }

    render() {
        return (
            <>
                <Container>
                    <Row>
                        <Col s={3}>
                            <Row>
                                <Col xs={7}>
                                    <div className="mr-3">
                                        <small className="text-uppercase font-weight-bold">
                                            Hide <b>Full</b> Courses (No seats)
                                        </small>
                                    </div>
                                </Col>
                                <Col xs={2}>
                                    <label className="mt-1 custom-toggle">
                                        <input type="checkbox" onChange={() => this.toggleHideFull()} checked={this.props.fullFilter} />
                                        <span className="custom-toggle-slider rounded-circle" />
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={7}>
                                    <div className="mr-3">
                                        <small className="text-uppercase font-weight-bold">
                                            Hide <b>Sunday</b> Courses
                                        </small>
                                    </div>
                                </Col>
                                <Col xs={2}>
                                    <label className="mt-1 custom-toggle">
                                    <input type="checkbox" onChange={() => this.toggleDayFilters('u')} checked={this.props.dayFilterU} />
                                        <span className="custom-toggle-slider rounded-circle" />
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={7}>
                                    <div className="mr-3">
                                        <small className="text-uppercase font-weight-bold">
                                            Hide <b>Monday</b> Courses
                                        </small>
                                    </div>
                                </Col>
                                <Col xs={2}>
                                    <label className="mt-1 custom-toggle">
                                    <input type="checkbox" onChange={() => this.toggleDayFilters('m')} checked={this.props.dayFilterM} />
                                        <span className="custom-toggle-slider rounded-circle" />
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={7}>
                                    <div className="mr-3">
                                        <small className="text-uppercase font-weight-bold">
                                            Hide <b>Tuesday</b> Courses
                                        </small>
                                    </div>
                                </Col>
                                <Col xs={2}>
                                    <label className="mt-1 custom-toggle">
                                    <input type="checkbox" onChange={() => this.toggleDayFilters('t')} checked={this.props.dayFilterT} />
                                        <span className="custom-toggle-slider rounded-circle" />
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={7}>
                                    <div className="mr-3">
                                        <small className="text-uppercase font-weight-bold">
                                            Hide <b>Wednesday</b> Courses
                                        </small>
                                    </div>
                                </Col>
                                <Col xs={2}>
                                    <label className="mt-1 custom-toggle">
                                    <input type="checkbox" onChange={() => this.toggleDayFilters('w')} checked={this.props.dayFilterW} />
                                        <span className="custom-toggle-slider rounded-circle" />
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={7}>
                                    <div className="mr-3">
                                        <small className="text-uppercase font-weight-bold">
                                            Hide <b>Thursday</b> Courses
                                        </small>
                                    </div>
                                </Col>
                                <Col xs={2}>
                                    <label className="mt-1 custom-toggle">
                                    <input type="checkbox" onChange={() => this.toggleDayFilters('r')} checked={this.props.dayFilterR} />
                                        <span className="custom-toggle-slider rounded-circle" />
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={7}>
                                    <div className="mr-3">
                                        <small className="text-uppercase font-weight-bold">
                                            Hide <b>Friday</b> Courses
                                        </small>
                                    </div>
                                </Col>
                                <Col xs={2}>
                                    <label className="mt-1 custom-toggle">
                                    <input type="checkbox" onChange={() => this.toggleDayFilters('f')} checked={this.props.dayFilterF} />
                                        <span className="custom-toggle-slider rounded-circle" />
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={7}>
                                    <div className="mr-3">
                                        <small className="text-uppercase font-weight-bold">
                                            Hide <b>Saturday</b> Courses
                                        </small>
                                    </div>
                                </Col>
                                <Col xs={2}>
                                    <label className="mt-1 custom-toggle">
                                    <input type="checkbox" onChange={() => this.toggleDayFilters('s')} checked={this.props.dayFilterS} />
                                        <span className="custom-toggle-slider rounded-circle" />
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={7}>
                                    <div className="mr-3">
                                        <small className="text-uppercase font-weight-bold">
                                            Hide <b>TBA</b> Courses
                                        </small>
                                    </div>
                                </Col>
                                <Col xs={2}>
                                    <label className="mt-1 custom-toggle">
                                    <input type="checkbox" onChange={() => this.toggleTBAFilter()} checked={this.props.tbaFilter} />
                                        <span className="custom-toggle-slider rounded-circle" />
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <p>
                                <Badge className="text-uppercase" color="primary" pill>More filters to be added in the future</Badge>
                                </p>
                            </Row>
                        </Col>
                        <Col s={3}>
                            <Row>
                                <div className="mb-3">
                                <p>Earliest Start Time:</p>
                                <TimePicker
                                    showSecond={false}
                                    defaultValue={this.props.minTimeStart}
                                    className="timeStartPicker"
                                    onChange={(value) => this.timeStartSelect(value)}
                                    format={timeFormat}
                                    use12Hours
                                    inputReadOnly
                                />
                                </div>
                            </Row>
                            <Row>
                                <div className="mb-3">
                                <p>Latest End Time:</p>
                                <TimePicker
                                    showSecond={false}
                                    defaultValue={this.props.maxTimeEnd}
                                    className="timeEndPicker"
                                    onChange={(value) => this.timeEndSelect(value)}
                                    format={timeFormat}
                                    use12Hours
                                    inputReadOnly
                                />
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Filters;