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
            tt_base: [],
            tt_base_o: []
        }

    }

    //build daily time tables once mounted
    componentDidMount() {
        this.buildDailyTimetables();
    }

    debugOutput() {
        console.log(this.state.tt_base);
        console.log(this.state.tt_base_o);
    }

    buildDailyTimetables() {

        var tt_base_d = [];

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
                    
                    var start_end = [course_data[i].intTimeStart, course_data[i].intTimeEnd, course_data[i].strCRN, day_data[j]];
                    var start_end2 = [course_data[i].intTimeStart2, course_data[i].intTimeEnd2, course_data[i].strCRN, day_data[j]];

                    tt_base_d.push(start_end);
                    tt_base_d.push(start_end2);

                }
            }
        }

        //sort based on sort time
        tt_base_d.sort((crs_1, crs_2) => parseInt(crs_1[0]) - parseInt(crs_2[0]));

        //overlap data TO DO: Implement
        var tt_base_o_d = [];

        var course_timedata = tt_base_d;

        for(var i = 0; i < course_timedata.length - 1; i++) {
            if (course_timedata[i][3] === "TBA" || course_timedata[i][0] === 0)
                continue;
            for(var j = i + 1; j < course_timedata.length; j++){
                if (course_timedata[j][3] === "TBA" || course_timedata[j][0] === 0)
                    continue;
                if (course_timedata[i][3] === course_timedata[j][3] &&
                    course_timedata[i][0] <= course_timedata[j][0] &&
                    course_timedata[j][0] <= course_timedata[i][1]) {
                        //overlap, time is on same day
                        // list is sorted in ascending order so first course should start earlier to equal 
                        // if end time of first course is after the start of the second course, there is overlap
                        var start_ol = Math.min(course_timedata[i][0], course_timedata[j][0]);
                        var end_ol = Math.min(course_timedata[i][1], course_timedata[j][1]);
                        var ol_row = [start_ol, end_ol, course_timedata[i][2] + "," + course_timedata[j][2], course_timedata[i][3]];
                        tt_base_o_d.push(ol_row);
                    }

            }

        }

        this.setState({
            tt_base: tt_base_d,
            tt_base_o: tt_base_o_d
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

        var time_container = this.state.tt_base;
        var time_container_ol = this.state.tt_base_o;

        /*

        0 = Start Time
        1 = End Time
        2 = CRN
        3 = DAY

        */

        //overlap gets priority
        for(var i = 0; i < time_container_ol.length; i++) {
            if(time_container_ol[i][0] <= time && time <= time_container_ol[i][1] && time_container_ol[i][3] === day) {
                return " timetb-ol";
            }   
        }

        //console.log(this.state.tt_base);
        for(i = 0; i < time_container.length; i++) {
            if(time_container[i][0] <= time && time <= time_container[i][1] && time_container[i][3] === day) {
                return " timetb-rg";
            }   
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
            var time = 600 + (i/12)*100;

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
        //this.debugOutput();

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