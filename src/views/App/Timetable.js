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
    Col
    //Button
    //Badge
} from "reactstrap";

class Timetable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tt_base: [],
            tt_base_o: [],
            twelve_hr: this.props.timeformat
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

        for(i = 0; i < course_timedata.length - 1; i++) {
            if (course_timedata[i][3] === "TBA" || course_timedata[i][0] === 0)
                continue;
            for(j = i + 1; j < course_timedata.length; j++){
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


    timeFormat(time) {

        if (time === "") return "";

        if(this.state.twelve_hr) {
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

    timeTableStart() {
        //table is sorted so check for first non-zero value
        var timetable = this.state.tt_base;
        var padding = 30; //pad half an hour
        for(var x = 0; x < timetable.length; x++) {
            if(timetable[x][0] !== 0)
                return timetable[x][0] - padding;
        }
        return 0;
    }

    timeTableEnd() {
        //traverse backwards look for largest end
        var timetable = this.state.tt_base;
        var padding = 30; //pad half an hour
        var max_end = 0;
        for(var x = timetable.length - 1; x >= 0; x--) {
            max_end = Math.max(max_end, timetable[x][1] + padding);
        }
        return max_end;
    }

    drawTable() {

        //216 Rows
        // 5AM - 10PM support (based on querying MongoDB for limits)

        var table_data = [];
        var time_start = this.timeTableStart();
        var time_end = this.timeTableEnd();

        if(time_start === time_end)
            return (<Row className ="timetb-msg"><span>
                Please add courses (non TBA) before trying to build schedules!</span></Row>);
        
        for (var i = 0; i < 216; i++) {

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
            var time_ind = i % 12 === 0 ? String(500 + (i/12)*100) : "";
            var time = 500 + (i/12)*100;

            time_ind = this.timeFormat(time_ind);

            //don't build logic if the time is out of the bounds of the start and end
            if(time < time_start || time > time_end)
                continue;

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

            <Col className = "timetb-row" key ={b3_key}></Col>
            </Row>);

          };
          //console.log(table_data);
        return table_data;
    }

    drawTableFooter(){
        var time_start = this.timeTableStart();
        var time_end = this.timeTableEnd();

        if(time_start === time_end)
            return (<Row></Row>);

        return (
            <Row>
            <Col></Col>
            <Col className = "timetb-footing"><span>Sun</span></Col>                        
            <Col className = "timetb-footing"><span>Mon</span></Col>
            <Col className = "timetb-footing"><span>Tue</span></Col>
            <Col className = "timetb-footing"><span>Wed</span></Col>
            <Col className = "timetb-footing"><span>Thu</span></Col>
            <Col className = "timetb-footing"><span>Fri</span></Col>
            <Col className = "timetb-footing"><span>Sat</span></Col>
            <Col></Col>
            </Row>
        );
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
                {this.drawTableFooter()}
                </div>
            </>
        );
    }
}

export default Timetable;