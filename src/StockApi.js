import React, { Component } from 'react'
import Plot from 'react-plotly.js';
import './App.css';

export class StockApi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: []
        }
    }

    componentDidMount() {
        this.fetchStock();
    }

    fetchStock() {
        const pointerToThis = this;
        console.log(pointerToThis);
        const API_KEY = 'HGJWFG4N8AQ66ICD';
        let StockSymbol = 'IBM' //StockSymbol is the company for which we want to fetch the data
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`
        let stockChartXValuesFunction = []; //we will be ploting our graph on these axes
        let stockChartYValuesFunction = [];

        fetch(API_Call)
            .then(
                function (response) {
                    return response.json();
                }
            )
            .then(
                function (data) {
                    console.log(data);

                    for (var key in data['Time Series (Daily)']) {
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
                    }
                    
                    pointerToThis.setState({
                        stockChartXValues: stockChartXValuesFunction,  //giving the values ffrom the api
                        stockChartYValues: stockChartYValuesFunction
                    });
                }

            )
    }
    render() {
        return (
            <div className='container'>
                <h1>Stock Market Analysis</h1>
                {/* now plot the graph  */}
                <Plot
                    data={[
                        {
                            x: this.state.stockChartXValues,
                            y: this.state.stockChartYValues,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'red' },
                        },

                    ]}
                    layout={{ width: 920, height: 540, title: 'A Fancy Plot' }}
                />
            </div>
        )
    }
}

export default StockApi
