import React, { Component } from "react";
import Event from "./Event";

const EVENT_HEIGHT = 23;

const s = {
    wrapper: {
        position: "relative",
        height: "100%",
    },
    calendarEvent: {
        fontSize: ".8rem",
    },
    hiddenCount: {
        position: "absolute",
        bottom: 0,
        right: 0,
        fontSize: ".9rem",
        fontWieght: 100,
    },
};

class MonthDayEvents extends Component {
    constructor(props) {
        super(props);
        this.state = { maxHeight: 0 };
    }

    componentDidMount() {
        this.componentdidRender();
    }

    componentDidUpdate(prevProps, prevState) {
        this.componentdidRender();
    }

    eventMouseOverHandler(e) {
        e.stopPropagation();
    }

    componentdidRender() {
        if (this.props.events.length > 0) {
            const w = this.refs.wrapper;
            const c = w.parentElement; //container
            let maxHeight = c.clientHeight - 16;
            console.log("MH:", maxHeight);
            if (this.state.maxHeight !== maxHeight) {
                this.setState({ maxHeight });
            }
        }
    }

    render() {
        const events = this.props.events;
        const visibleCount = Math.floor(this.state.maxHeight / EVENT_HEIGHT);
        const hiddenCount = events.length - visibleCount;
        return (
            <div ref="wrapper" style={s.wrapper}>
                {(this.state.maxHeight > 0) &&
                    <div onMouseOver={this.eventMouseOverHandler}>
                        {events.map((e, i) => (
                            (i < visibleCount) && <Event key={i} {...e} style={s.calendarEvent} />
                        ))}
                        {(hiddenCount > 0) && <div style={s.hiddenCount}>+{hiddenCount}</div>}
                    </div>}
            </div>
        );
    }
}

export default MonthDayEvents;