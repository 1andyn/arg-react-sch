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
    Row,
    Col,
    Button,
    Card,
    Modal
} from "reactstrap";

import Select from 'react-select'

class Builder extends React.Component {
    /*
    Constructor(props) {
        this.state = {
            school : this.props.school,
            term : this.props.term,
            sub : "",
            sub_list: this.props.sublist,
            crs_list : [],
            clp_list : []
        }
    };
    */
    
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
                                                    defaultValue={{ strSubDesc: "Select course subject...", strSubCode: "" }} />
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
                                                    onClick={e => e.preventDefault()}
                                                    block
                                                    >
                                                    Build
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="mt-3 py-3 border-top text-center">
                                        Test Text
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