/*!

=========================================================
* Options - Options Display logic
=========================================================

Block for displaying Options in Builder Modal Popup

=========================================================

*/

import React from "react";

import {
    Row,
    Col,
    Container
} from "reactstrap";

class Options extends React.Component {   

    toggleHourSetting() {
        this.props.toggleTwelveHour();
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
                                            12-Hour Time Format
                                        </small>
                                    </div>
                                </Col>
                                <Col xs={2}>
                                    <label className="mt-1 custom-toggle">
                                        <input type="checkbox" onChange={() => this.toggleHourSetting()} checked={this.props.twelveHr} />
                                        <span className="custom-toggle-slider rounded-circle" />
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <p>
                                    <b>This functionality is still being developed.</b>
                                </p>
                            </Row>
                        </Col>
                        <Col s={3}>
                            <Row>
                            </Row>
                            <Row>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Options;