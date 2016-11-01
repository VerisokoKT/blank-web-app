import React, { Component } from "react";
import moment from "moment";
import Header from "./calendar/Header";
import Month from "./calendar/Month";
import filtersActions from "../../actions/filtersActuators";
import filtersStore from "../../stores/filtersStore";

const s = {
    wrapper: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    period: {
        flex: "2 0",
        display: "flex",
        overflow: "auto",
        opacity: 0,
        marginLeft: "-32px",
        transition: "margin-left .2s linear",
    },
    showPeriod: {
        opacity: 1,
        marginLeft: 0,
        transition: "all .2s linear",
    },
};

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.moment = moment; //moment.utc();
        this.dateProp = "dateTime";
        const currentFilter = (filtersStore.getFilters(props.storeName)[this.dateProp] || {}).$ne;
        let d = currentFilter ? this.moment(currentFilter.slice(1)) : this.moment();
        if (!d.isValid()) {
            d = this.moment();
        }
        this.state = Object.assign({ year: d.year(), month: d.month(), day: d.date() });
        this.getEvents = this.getEvents.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleMonthChange = this.handleMonthChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
    }

    componentDidMount() {
        const currentFilter = (filtersStore.getFilters(this.props.storeName)[this.dateProp] || {}).$ne;
        if (!currentFilter) {
            setTimeout(() => {
                console.log("Setting initial filter for calendar in store ", this.props.storeName);
                this._setFilter();
            });
        }
    }

    handleDateChange(value) {
        const d = this.moment(value);
        this.setState({ year: d.year(), month: d.month(), day: d.date() }, () => {
            this._setFilter(true);
        });
    }

    handleMonthChange(e) {
        this._handleChange("month", e.target.value);
    }

    handleYearChange(e) {
        this._handleChange("year", e.target.value);
    }

    _handleChange(part, value) {
        let d = this.moment([this.state.year, this.state.month, this.state.day]);
        d[part](value);
        this.setState({ year: d.year(), month: d.month(), day: d.date() }, () => {
            this._setFilter();
        });
    }

    _setFilter(noReloadItems) {
        const d = this.moment([this.state.year, this.state.month, this.state.day]);
        const range = this.moment([this.state.year, this.state.month]);
        filtersActions.setFilter(this.props.storeName, this.dateProp, {
            $gte: range.toISOString(),
            $lte: range.add(1, "month").toISOString(),
            $ne: "$" + d.toISOString(),
        }, true, noReloadItems);
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
            <div style={s.wrapper}>
                <Header
                    {...this.state}
                    onMonthChange={this.handleMonthChange}
                    onYearChange={this.handleYearChange}
                    />
                <div style={Object.assign({}, s.period, this.props.ready ? s.showPeriod : null)}>
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