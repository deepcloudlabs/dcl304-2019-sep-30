import React from 'react';
import './Lottery.css';

export default class Lottery extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            numbers: []
        };
        this.drawNumbers = this.drawNumbers.bind(this);
        this.clearNumbers = this.clearNumbers.bind(this);
    }

    /*
        async componentDidMount() {
            let nums = await this.draw(1, 49, 6);
            this.setState({
                numbers: nums
            });
        }
      */
    componentDidMount() {
        let numbers = Array.from(this.state.numbers);
        Lottery.draw(this.props.min, this.props.max, this.props.size).then(nums => {
            numbers.push(nums);
            this.setState({
                numbers
            });
        });
    }

    static async draw(min = 1, max = 50, size = 6) {
        min = Number(min);
        max = Number(max);
        size = Number(size);
        let numbers = [];
        while (numbers.length !== size) {
            let num = Math.floor(Math.random() * (max - min + 1)) + min;
            if (!numbers.includes(num))
                numbers.push(num);
        }
        numbers.sort((x, y) => x - y);
        return numbers;
    }

    drawNumbers() {
        let numbers = Array.from(this.state.numbers);
        Lottery.draw(this.props.min, this.props.max, this.props.size).then(nums => {
            numbers.push(nums);
            this.setState({
                numbers
            });
        });
    }

    clearNumbers() {
        this.setState({
            numbers: []
        });
    }

    render() {
        return (
            <div className="container">
                <p/>
                <button className="btn btn-success" onClick={this.drawNumbers}>Draw</button>
                <button className="btn btn-danger" onClick={this.clearNumbers}>Clear</button>
                <p/>
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                    <tr>{
                        Array.from(Array(this.props.size).keys()).map((i) => {
                            return (
                                <th key={i}>Column #{i+1}</th>
                            );
                        })
                    }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.numbers.map((nums, i) => {
                            return (
                                <tr key={i}>{
                                    nums.map((num, j) => {
                                        return (
                                            <td key={this.props.size * i + j}>
                                                {num}
                                            </td>
                                        );
                                    })
                                }</tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}