import React, { Component } from "react";
import moment from "moment";
import Header from "./calendar/Header";
import Month from "./calendar/Month";

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.moment = moment; //moment.utc();
        const now = this.moment();
        this.dateProp = "dateTime";
        this.state = Object.assign({ year: now.year(), month: now.month(), day: now.date() });
        this.getEvents = this.getEvents.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleMonthChange = this.handleMonthChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
    }

    handleDateChange(value) {
        const d = this.moment(value);
        this.setState({ year: d.year(), month: d.month(), day: d.date() });
    }

    handleMonthChange(e) {
        this._handleChange("month", e.target.value);
    }

    handleYearChange(e) {
        this._handleChange("year", e.target.value);
    }

    _handleChange(part, value) {
        const d = this.moment([this.state.year, this.state.month, this.state.day]);
        d[part](value);
        this.setState({ year: d.year(), month: d.month(), day: d.date() });
    }

    getEvents(date) {
        date = this.moment(date).utc();
        const min = date.toISOString();
        const max = date.add(24, "hours").toISOString();
        return (this.props.items || [])
            .filter(i => {
                const itemDate = i[this.dateProp];
                return itemDate >= min && itemDate < max;
            });
    }

    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <Header
                    {...this.state}
                    onMonthChange={this.handleMonthChange}
                    onYearChange={this.handleYearChange}
                    />
                <div style={{ flex: "2 0", display: "flex", overflow: "auto" }}>
                    <Month
                        {...this.state}
                        moment={this.moment}
                        getEvents={this.getEvents}
                        onDateChange={this.handleDateChange}
                        create={this.props.create}
                        select={this.props.select}
                        dateProp={this.dateProp}
                        />
                </div>
            </div>
        );
    }
}

export default Calendar;