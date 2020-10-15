import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    AreaSeries,
    BarSeries,
    SplineSeries,
    ScatterSeries,
    ArgumentAxis,
    ValueAxis,
    Title,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';

import {
    ValueScale,
    Stack,
    Animation,
} from '@devexpress/dx-react-chart';
import { connectProps } from '@devexpress/dx-react-core';
import { connect } from 'react-redux';
import { fetchListStatistic } from '../../redux/actions/statistic';

const oilProduction = [
    {
        month: '1', wasDelivered: 241.142, canceled: 482.150, totalMoney: 17,
    }, {
        month: '2', wasDelivered: 511.334, canceled: 437.343, totalMoney: 104,
    }, {
        month: '3', wasDelivered: 324.359, canceled: 374.867, totalMoney: 23.7,
    }, {
        month: '4', wasDelivered: 410.060, canceled: 297.513, totalMoney: 28.3,
    }, {
        month: '5', wasDelivered: 413.505, canceled: 279.225, totalMoney: 79.6,
    }, {
        month: '6', wasDelivered: 516.157, canceled: 437.966, totalMoney: 52.4,
    }, {
        month: '7', wasDelivered: 241.142, canceled: 482.150, totalMoney: 17,
    }, {
        month: '8', wasDelivered: 511.334, canceled: 437.343, totalMoney: 104,
    }, {
        month: '9', wasDelivered: 324.359, canceled: 374.867, totalMoney: 23.7,
    }, {
        month: '10', wasDelivered: 410.060, canceled: 297.513, totalMoney: 28.3,
    }, {
        month: '11', wasDelivered: 413.505, canceled: 279.225, totalMoney: 79.6,
    }, {
        month: '12', wasDelivered: 516.157, canceled: 437.966, totalMoney: 52.4,
    },
    
]
const consumptionSeriesName = 'Consumption';
const consumptionColor = 'blue';
const priceColor = '#F29D1F';

const makeLabel = (symbol, color) => ({ text, style, ...restProps }) => (
    <ValueAxis.Label
        text={`${text} ${symbol}`}
        style={{
            fill: color,
            ...style,
        }}
        {...restProps}
    />
);
const PriceLabel = makeLabel('VND', priceColor);
const LabelWithThousand = makeLabel('Đơn', consumptionColor);

const patchProps = ({ hoverIndex, ...props }) => ({
    state: props.index === hoverIndex ? 'hovered' : null,
    ...props,
});

const BarPoint = props => (
    <BarSeries.Point {...patchProps(props)} />
);

const pointOptions = { size: 7 };
const getPointOptions = state => (state ? { size: 2 } : { size: 0 });

const AreaPoint = (props) => {
    const patched = patchProps(props);
    return <ScatterSeries.Point point={getPointOptions(patched.state)} {...patched} />;
};

const AreaWithPoints = ({ state, ...props }) => (
    <React.Fragment>
        <AreaSeries.Path {...props} />
        <ScatterSeries.Path {...props} />
    </React.Fragment>
);

const SplinePoint = props => (
    <ScatterSeries.Point point={pointOptions} {...patchProps(props)} />
);

const SplineWithPoints = props => (
    <React.Fragment>
        <SplineSeries.Path {...props} />
        <ScatterSeries.Path {...props} />
    </React.Fragment>
);

const series = [
    { name: 'Đã giao', key: 'wasDelivered', color: '#5FF5B2', scale: 'oil'},
    { name: 'Bị hủy', key: 'canceled', color: '#217DFC', scale: 'oil'},
    {
        name: 'Tổng tiền thu về', key: 'totalMoney', color: '#F29D1F', scale: 'price', type: SplineSeries,
    },
];

const legendRootStyle = {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
};
const LegendRoot = props => (
    <Legend.Root {...props} style={legendRootStyle} />
);

const legendItemStyle = {
    flexDirection: 'column',
    marginLeft: '-2px',
    marginRight: '-2px',
};
const LegendItem = props => (
    <Legend.Item {...props} style={legendItemStyle} />
);

const legendLabelStyle = {
    whiteSpace: 'nowrap',
};
const LegendLabel = props => (
    <Legend.Label {...props} style={legendLabelStyle} />
);


const stacks = [
    { series: series.filter(obj => !obj.type).map(obj => obj.name) },
];

const modifyOilDomain = domain => [domain[0], 10000];
const modifyPriceDomain = () => [0, 10000000000];

const getHoverIndex = ({ target }) => (target ? target.point : -1);

class Demo extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: oilProduction,
            target: null,
        };

        this.changeHover = target => this.setState({
            target: target ? { series: consumptionSeriesName, point: target.point } : null,
        });
        const {listStatistic, fetchListStatistic} = props
        this.createComponents();
        this.createSeries();
    }

    componentDidMount() {
        this.props.fetchListStatistic()
    }

    
    componentDidUpdate(prevProps, prevState, props) {
        if (getHoverIndex(prevState) !== getHoverIndex(this.state)) {
            this.BarPoint.update();
            this.SplinePoint.update();
            this.AreaPoint.update();
            this.TooltipContent.update();
        }
        this.setState({data: this.props.listStatistic})
    }

    createComponents() {
        const getHoverProps = () => ({
            hoverIndex: getHoverIndex(this.state),
        });
        this.BarPoint = connectProps(BarPoint, getHoverProps);
        this.SplinePoint = connectProps(SplinePoint, getHoverProps);
        this.AreaPoint = connectProps(AreaPoint, getHoverProps);
    }

    createSeries() {
        this.series = series.map(({
            name, key, color, type, scale,
        }) => {
            const props = {
                key: name,
                name,
                valueField: key,
                argumentField: 'month',
                color,
                scaleName: scale || 'oil',
                pointComponent: this.BarPoint,
            };
            if (type === AreaSeries) {
                props.seriesComponent = AreaWithPoints;
                props.pointComponent = this.AreaPoint;
            } else if (type) {
                props.seriesComponent = SplineWithPoints;
                props.pointComponent = this.SplinePoint;
            }
            return React.createElement(type || BarSeries, props);
        });
    }

    render() {
        const { data } = this.state;

        return (
            <Paper>
                <Chart
                    data={data}
                >
                    <ValueScale
                        name="oil"
                        modifyDomain={modifyOilDomain}
                    />
                    <ValueScale
                        name="price"
                        modifyDomain={modifyPriceDomain}
                    />

                    <ArgumentAxis />
                    <ValueAxis
                        scaleName="oil"
                        labelComponent={LabelWithThousand}
                    />
                    <ValueAxis
                        scaleName="price"
                        position="right"
                        labelComponent={PriceLabel}
                    />

                    <Title
                        text="Thống kê năm nay"
                    />

                    {this.series}

                    <Animation />
                    <Legend
                        position="bottom"
                        rootComponent={LegendRoot}
                        itemComponent={LegendItem}
                        labelComponent={LegendLabel}
                    />
                    <Stack stacks={stacks} />
                </Chart>
            </Paper>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      listStatistic: state.statistic.listStatistic,
    };
  };
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchListStatistic: () => {
        dispatch(fetchListStatistic());
      },
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(Demo);