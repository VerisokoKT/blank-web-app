/**
 * Created by kib357 on 05/03/16.
 */

import React from "react";
import Loader from "../../misc/Loader";
import widgetsDataStore from "../../../stores/widgetsDataStore";
import widgetsActuators from "../../../actions/widgetsActuators";
import NvChart from "./charts/NvChart";
import Table from "./Table";
import {widgetTypes, storeEvents} from "constants";

class Widget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "v": 1,
            "wParams": {},
            "loading": true,
            "data": widgetsDataStore.get(props.widgetId),
        };
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        widgetsDataStore.on(storeEvents.CHANGED, this._onChange);
        this._loadData();
    }

    componentWillUnmount() {
        widgetsDataStore.removeListener(storeEvents.CHANGED, this._onChange);
        clearTimeout(this.timer);
        clearInterval(this.interval);
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.params) !== JSON.stringify(this.props.params) ||
            (nextProps.itemId && nextProps.itemId !== this.props.itemId)) {
            this._loadData(nextProps);
        }
    }

    _onChange() {
        if (widgetsDataStore.lastUpdatedWidgetId === this.props.widgetId) {
            let data = widgetsDataStore.get(this.props.widgetId);
            // console.log("DATA LOADED:", this.props.widgetId);
            this.setState({ "data": data, "v": this.state.v + 1, "loading": false });
        }
    }

    _loadData(props) {
        props = props || this.props;
        this.setState({ "loading": true }, () => {
            // console.log("LOAD REQUEST:", this.props.widgetId);
            widgetsActuators.load(props.storeName, props.widgetId, Object.assign({}, props.params, this.state.wParams), props.itemId);
        });
    }

    render() {
        let widget = this.getWidget(this.props.widgetDesc.type);
        return (
            <div style={this.props.widgetDesc.style} className="widget">
                {this.props.widgetDesc.label && <h3>{this.props.widgetDesc.label}</h3>}
                {this.state.data != null && widget}
                {this.state.loading && <div className="loader-wrapper"><Loader className="xs"/></div>}
            </div>
        );
    }

    setWParams(key, value) {
        let params = this.state.wParams;
        params[key] = value;
        this.setState({ "wParams": params }, () => {
            this._loadData();
        });
    }

    getWidget(wType) {
        switch (wType) {
            case widgetTypes.chartNvD3:
                return <NvChart render={this.props.widgetDesc.render}
                    didLoadData={this.props.widgetDesc.didLoadData}
                    params={Object.assign({}, this.props.params, this.state.wParams) }
                    v={this.state.v}
                    data={this.state.data}/>;
            case widgetTypes.table:
                return <Table columns={this.props.widgetDesc.columns}
                    data={this.state.data}
                    v={this.state.v}
                    orderBy={this.state.wParams.$orderBy}
                    onOrder={this.setWParams.bind(this, "$orderBy") }/>;
            default:
                return <p>Invalid widget type </p>;
        }
    }
}

Widget.propTypes = {};
Widget.defaultProps = {};

export default Widget;
