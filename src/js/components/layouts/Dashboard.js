import React, {Component} from "react";
import Widget from "../forms/viewers/Widget";
import DateRange from "../forms/inputs/date/DateRange";

const defaultDateRange = [
    //86400000
    new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString(),
    new Date(new Date().setUTCHours(23, 59, 59, 999)).toISOString(),
];

class Dashboard extends Component {
    constructor(props) {
        super(props);
        let paramsStr = sessionStorage.getItem(props.storeName + "-dashboard-params"),
            params = {
                "dateRange": defaultDateRange,
            };
        console.log(params);
        if (paramsStr) {
            try {
                params = JSON.parse(paramsStr);
            } catch (e) {
                console.error("cannot load dashboard params from sessionStorage");
            }
        }
        this.state = {
            "params": params,
        };
        this.dateRangeChangedHandler = this.dateRangeChangedHandler.bind(this);
    }

    dateRangeChangedHandler(value) {
        value = value || defaultDateRange;
        this.setState({ "params": { "dateRange": value } });
    }

    render() {
        let widgetsDescs = this.props.storeDesc.widgets;
        let widgets = widgetsDescs.map(wd => {
            return <Widget storeName={this.props.storeName}
                params={this.state.params}
                key={"widget-" + wd._id}
                widgetId={wd._id}
                widgetDesc={wd}/>;
        });
        return (
            <div className="fill relative flex column layout-dashboard">
                <div className="scroll fill">
                    <div className="dashboard-wrapper">
                        <div style={{ "width": "300px" }}>
                            <DateRange value={this.state.params.dateRange} onChange={this.dateRangeChangedHandler} utc={true} required={true}/>
                        </div>
                        {widgets}
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;