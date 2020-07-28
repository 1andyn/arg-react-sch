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

    constructor(props) {
        super(props);
        this.state = {
            tt_su: [],
            tt_su_o: [],
            tt_mo: [],
            tt_mo_o: [],
            tt_tu: [],
            tt_tu_o: [],
            tt_we: [],
            tt_we_o: [],
            tt_th: [],
            tt_th_o: [],
            tt_fr: [],
            tt_fr_o: [],
            tt_sa: [],
            tt_sa_o: [],
        }

        
    }

    //build daily time tables once mounted
    componentDidMount() {
        this.buildDailyTimetables();
    }

    buildDailyTimetables() {

        console.log("build called");

        var tt_su_d = [];
        var tt_mo_d = [];
        var tt_tu_d = [];
        var tt_we_d = [];
        var tt_th_d = [];
        var tt_fr_d = [];
        var tt_sa_d = [];

        //overlap data TO DO: Implement
        var tt_su_o_d = [];
        var tt_mo_o_d = [];
        var tt_tu_o_d = [];
        var tt_we_o_d = [];
        var tt_th_o_d = [];
        var tt_fr_o_d = [];
        var tt_sa_o_d = [];

        var course_data = this.props.courses;
        for(var i = 0; i < course_data.length; i++) {
            var day_data;
            for(var z = 0; z < 2; z++) {
                if (z === 0) {
                    day_data = course_data[i].arrDays;
                } else {
                   day_data = course_data[i].arrDays2;
                }
                
                for(var j = 0; j < day_data.length; j++) {
                    
                    var start_end = [course_data[i].intTimeStart, course_data[i].intTimeEnd];
                    var start_end2 = [course_data[i].intTimeStart2, course_data[i].intTimeEnd2];

                    if(day_data[j] === "U") {
                        tt_su_d.push(start_end);
                        tt_su_d.push(start_end2);
                    } else if (day_data[j] === "M") {
                        tt_mo_d.push(start_end);
                        tt_mo_d.push(start_end2);
                    } else if (day_data[j] === "T") {
                        tt_tu_d.push(start_end);
                        tt_tu_d.push(start_end2);
                    } else if (day_data[j] === "W") {
                        tt_we_d.push(start_end);
                        tt_we_d.push(start_end2);
                    } else if (day_data[j] === "R") {
                        tt_th_d.push(start_end);
                        tt_th_d.push(start_end2);
                    } else if (day_data[j] === "F") {
                        tt_fr_d.push(start_end);
                        tt_fr_d.push(start_end2);
                    } else if (day_data[j] === "S") {
                        tt_sa_d.push(start_end);
                        tt_sa_d.push(start_end2);
                    }
                }
            }
        }

        this.setState({
            tt_su: tt_su_d,
            tt_mo: tt_mo_d,
            tt_tu: tt_tu_d,
            tt_we: tt_we_d,
            tt_th: tt_th_d,
            tt_fr: tt_fr_d,
            tt_sa: tt_sa_d,
            tt_su_o: tt_su_o_d,
            tt_mo_o: tt_mo_o_d,
            tt_tu_o: tt_tu_o_d,
            tt_we_o: tt_we_o_d,
            tt_th_o: tt_th_o_d,
            tt_fr_o: tt_fr_o_d,
            tt_sa_o: tt_sa_o_d
        });

    }
    /*

    U = Sunday
    M = Monday
    T = Tuesday
    W = Wednesday
    R = Thursday
    F = Friday
    S = Saturday

    */

    getFormattingForDay(day, time){

        var time_container;
        if(day === "U") {
            time_container = this.state.tt_su;
        } else if (day === "M") {
            time_container = this.state.tt_mo;
        } else if (day === "T") {
            time_container = this.state.tt_tu;
        } else if (day === "W") {
            time_container = this.state.tt_we;
        } else if (day === "R") {
            time_container = this.state.tt_th;
        } else if (day === "F") {
            time_container = this.state.tt_fr;
        } else if (day === "S") {
            time_container = this.state.tt_sa;
        }

        for(var i = 0; i < time_container.length; i++) {
            if(time_container[i][0] >= time && time <= time_container[i][1])
                return " timetb_rg";
        }

        return "";

    }




    drawTable() {

        //160 Rows
        // 6AM - 9PM support
        // 15 hours, 5 minute intervals, 12 chunks per hour (12*15)

        var table_data = [];
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
            var time = 600 + i*5;

            var sel_u = this.getFormattingForDay("U", time);
            var sel_m = this.getFormattingForDay("M", time);
            var sel_t = this.getFormattingForDay("T", time);
            var sel_w = this.getFormattingForDay("W", time);
            var sel_r = this.getFormattingForDay("R", time);
            var sel_f = this.getFormattingForDay("F", time);
            var sel_s = this.getFormattingForDay("S", time);

            var b3_key = i + "_b3";

            table_data.push(
            <Row key = {r_key}>
                
            <Col className = "timetb-row timetb-col" key ={ti_key}>
                <span className = "timetb-time">{time_ind}</span></Col>
            <Col className = {"timetb-row timetb-col" + sel_u} key ={su_key}><br></br></Col>
            <Col className = {"timetb-row timetb-col" + sel_m} key ={mo_key}></Col>
            <Col className = {"timetb-row timetb-col" + sel_t} key ={tu_key}></Col>
            <Col className = {"timetb-row timetb-col" + sel_w} key ={we_key}></Col>
            <Col className = {"timetb-row timetb-col" + sel_r} key ={th_key}></Col>
            <Col className = {"timetb-row timetb-col" + sel_f} key ={fr_key}></Col>
            <Col className = {"timetb-row timetb-col" + sel_s} key ={sa_key}></Col>

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