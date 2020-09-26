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
} from "reactstrap";

class Timetable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timetableBase: [],
            timetableOverlap: [],
            twelveHr: this.props.timeformat
        }

    }

    //build daily time tables once mounted
    componentDidMount() {
        this.buildDailyTimetables();
    }

    debugOutput() {
        console.log(this.state.timetableBase);
        console.log(this.state.timetableOverlap);
    }

    buildDailyTimetables() {

        var timetableBaseData = [];

        var courseData = this.props.courses;
        for(var i = 0; i < courseData.length; i++) {
            var day_data;
            for(var z = 0; z < 2; z++) {
                if (z === 0) {
                    day_data = courseData[i].arrDays;
                } else {
                   day_data = courseData[i].arrDays2;
                }
                
                for(var j = 0; j < day_data.length; j++) {
                    
                    var startEnd = [courseData[i].intTimeStart, courseData[i].intTimeEnd, courseData[i].strCRN, day_data[j]];
                    var startEnd2 = [courseData[i].intTimeStart2, courseData[i].intTimeEnd2, courseData[i].strCRN, day_data[j]];

                    timetableBaseData.push(startEnd);
                    timetableBaseData.push(startEnd2);

                }
            }
        }

        //sort based on sort time
        timetableBaseData.sort((crs_1, crs_2) => parseInt(crs_1[0]) - parseInt(crs_2[0]));

        //overlap data TO DO: Implement
        var timetableOverlapData = [];

        var courseTimeData = timetableBaseData;

        for(i = 0; i < courseTimeData.length - 1; i++) {
            if (courseTimeData[i][3] === "TBA" || courseTimeData[i][0] === 0)
                continue;
            for(j = i + 1; j < courseTimeData.length; j++){
                if (courseTimeData[j][3] === "TBA" || courseTimeData[j][0] === 0)
                    continue;
                if (courseTimeData[i][3] === courseTimeData[j][3] &&
                    courseTimeData[i][0] <= courseTimeData[j][0] &&
                    courseTimeData[j][0] <= courseTimeData[i][1]) {
                        //overlap, time is on same day
                        // list is sorted in ascending order so first course should start earlier to equal 
                        // if end time of first course is after the start of the second course, there is overlap
                        var startOverlap = Math.min(courseTimeData[i][0], courseTimeData[j][0]);
                        var endOverlap = Math.min(courseTimeData[i][1], courseTimeData[j][1]);
                        var overlapRow = [startOverlap, endOverlap, courseTimeData[i][2] + "," + courseTimeData[j][2], courseTimeData[i][3]];
                        timetableOverlapData.push(overlapRow);
                    }

            }

        }

        this.setState({
            timetableBase: timetableBaseData,
            timetableOverlap: timetableOverlapData
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

    getFormattingForDay(day, time){

        var timeContainer = this.state.timetableBase;
        var timeContainerOverlap = this.state.timetableOverlap;

        /*

        0 = Start Time
        1 = End Time
        2 = CRN
        3 = DAY

        */

        //overlap gets priority
        for(var i = 0; i < timeContainerOverlap.length; i++) {
            if(timeContainerOverlap[i][0] <= time 
                && time <= timeContainerOverlap[i][1] 
                && timeContainerOverlap[i][3] === day) {
                return " timetb-ol";
            }   
        }

        //console.log(this.state.timetableBase);
        for(i = 0; i < timeContainer.length; i++) {
            if(timeContainer[i][0] <= time 
                && time <= timeContainer[i][1] 
                && timeContainer[i][3] === day) {
                return " timetb-rg";
            }   
        }

        return "";

    }

    timeTableStart() {
        //table is sorted so check for first non-zero value
        var timetable = this.state.timetableBase;
        var padding = 30; //pad half an hour
        for(var x = 0; x < timetable.length; x++) {
            if(timetable[x][0] !== 0)
                return timetable[x][0] - padding;
        }
        return 0;
    }

    timeTableEnd() {
        //traverse backwards look for largest end
        var timetable = this.state.timetableBase;
        var padding = 30; //pad half an hour
        var maxEnd = 0;
        for(var x = timetable.length - 1; x >= 0; x--) {
            maxEnd = Math.max(maxEnd, timetable[x][1] + padding);
        }
        return maxEnd;
    }

    drawTable() {

        //216 Rows
        // 5AM - 10PM support (based on querying MongoDB for limits)

        var tableData = [];
        var timeStart = this.timeTableStart();
        var timeEnd = this.timeTableEnd();

        if(timeStart === timeEnd)
            return (<Row className ="timetb-msg"><span>
                Please add courses (non TBA) before trying to build schedules!</span></Row>);
        
        for (var i = 0; i < 216; i++) {

            var rowKey = i + "_r";
            var timeIndicatorKey = i + "_ti";

            //unique key for column
            var suKey = i + "_su";
            var moKey = i + "_mo";
            var tuKey = i + "_tu";
            var weKey = i + "_we";
            var thKey = i + "_th";
            var frKey = i + "_fr";
            var saKey = i + "_sa";

            //add time to every hour
            var timeIndicator = i % 12 === 0 ? String(500 + (i/12)*100) : "";
            var time = 500 + (i/12)*100;

            timeIndicator = this.timeFormat(timeIndicator);

            //don't build logic if the time is out of the bounds of the start and end
            if(time < timeStart || time > timeEnd)
                continue;

            //color for timeblock
            var suColor = this.getFormattingForDay("U", time);
            var moColor = this.getFormattingForDay("M", time);
            var tuColor = this.getFormattingForDay("T", time);
            var weColor = this.getFormattingForDay("W", time);
            var thColor = this.getFormattingForDay("R", time);
            var frColor = this.getFormattingForDay("F", time);
            var saColor = this.getFormattingForDay("S", time);

            var b3_key = i + "_b3";

            tableData.push(
            <Row key = {rowKey}>
                
            <Col className = "timetb-row timetb-col" key ={timeIndicatorKey}>
                <span className = "timetb-time">{timeIndicator}</span></Col>
            <Col className = {"timetb-row timetb-col" + suColor} key ={suKey}><br></br></Col>
            <Col className = {"timetb-row timetb-col" + moColor} key ={moKey}></Col>
            <Col className = {"timetb-row timetb-col" + tuColor} key ={tuKey}></Col>
            <Col className = {"timetb-row timetb-col" + weColor} key ={weKey}></Col>
            <Col className = {"timetb-row timetb-col" + thColor} key ={thKey}></Col>
            <Col className = {"timetb-row timetb-col" + frColor} key ={frKey}></Col>
            <Col className = {"timetb-row timetb-col" + saColor} key ={saKey}></Col>

            <Col className = "timetb-row" key ={b3_key}></Col>
            </Row>);

          };
          //console.log(tableData);
        return tableData;
    }

    drawTableFooter(){
        var timeStart = this.timeTableStart();
        var timeEnd = this.timeTableEnd();

        if(timeStart === timeEnd)
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