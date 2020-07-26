/*!

=========================================================
* Timetable - Timetable Display logic
=========================================================

Block for displaying Timetable of Selected Courses

=========================================================

*/

import React from "react";

import {
    Row,
    Col,
    Button,
    Badge
} from "reactstrap";

class Timetable extends React.Component {

    drawTable() {

        //160 Rows
        // 6AM - 9PM support
        // 15 hours, 5 minute intervals, 12 chunks per hour (12*15)

        var table_data = [];
        var time = 600;
        for (var i = 0; i < 160; i++) {

            var r_key = i + "_r";

            var ti_key = i + "_ti";

            var su_key = i + "_su";
            var mo_key = i + "_mo";
            var tu_key = i + "_tu";
            var we_key = i + "_we";
            var th_key = i + "_th";
            var fr_key = i + "_fr";
            var sa_key = i + "_sa";

            //add time to every hour
            var time_ind = i % 12 === 0 ? String(600 + (i/12)*100) : "";

            var b3_key = i + "_b3";

            table_data.push(
            <Row key = {r_key}>
                
            <Col className = "timetb-row timetb-col" key ={ti_key}>
                <span className = "timetb-time">{time_ind}</span></Col>
            <Col className = "timetb-row timetb-col" key ={su_key}><br></br></Col>
            <Col className = "timetb-row timetb-col" key ={mo_key}></Col>
            <Col className = "timetb-row timetb-col" key ={tu_key}></Col>
            <Col className = "timetb-row timetb-col" key ={we_key}></Col>
            <Col className = "timetb-row timetb-col" key ={th_key}></Col>
            <Col className = "timetb-row timetb-col" key ={fr_key}></Col>
            <Col className = "timetb-row timetb-col" key ={sa_key}></Col>

            <Col className = "timetb-row timetb-col" key ={b3_key}></Col>
            </Row>);

          };
          //console.log(table_data);
        return table_data;
    }

    render() {

        var tables = this.drawTable()

        return (
            <>
                <div>
                <Row>
                    <Col><br></br></Col>                     
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                {tables}
                <Row>
                    <Col></Col>
                    <Col className = "timetb-footing">Sun</Col>                        
                    <Col className = "timetb-footing">Mon</Col>
                    <Col className = "timetb-footing">Tue</Col>
                    <Col className = "timetb-footing">Wed</Col>
                    <Col className = "timetb-footing">Thu</Col>
                    <Col className = "timetb-footing">Fri</Col>
                    <Col className = "timetb-footing">Sat</Col>
                    <Col></Col>
                </Row>
                </div>
            </>
        );
    }
}

export default Timetable;