import React, { Component } from 'react';
import './chessBoard.css';

export default class ChessBoard extends Component {
    constructor() {
        super();
        this.state = {
            cellCount: 0,
            x: 0,
            y: 0
        }
        this.travelLimit = 0;
        this.travelcount = 0;
    }

    handleSubmit = () => {
        let ele = this.refs.celEle;
        let val = ele.value;
        document.body.removeEventListener('keyup', (e) => { });
        if (val > 0) {
            this.setState({ cellCount: ele.value });
            document.body.addEventListener('keyup', (e) => {
                this.escFunction(e.key);
            });
        } else {
            alert("Please enter positive integer value");
        }
    }

    handleChange = (event) => {
        let val = event.target.value;
        if (val > 0) {
            this.travelLimit = val;
            this.travelcount = 0;
        }
    }

    escFunction = (key) => {

        let { cellCount, x, y } = this.state;

        if (cellCount > 0 && (key === "ArrowUp" || key === "ArrowDown" || key === "ArrowLeft" || key === "ArrowRight")) {
            if (this.travelcount < this.travelLimit || this.travelLimit === 0) {
                if (key === "ArrowUp" && y > 0) {
                    this.setState(prevState => { return { y: prevState.y - 1 } });
                    this.travelcount++;
                } else if (key === "ArrowDown" && y < cellCount - 1) {
                    this.setState(prevState => { return { y: prevState.y + 1 } });
                    this.travelcount++;
                } else if (key === "ArrowLeft" && x > 0) {
                    this.setState(prevState => { return { x: prevState.x - 1 } });
                    this.travelcount++;
                } else if (key === "ArrowRight" && x < cellCount - 1) {
                    this.setState(prevState => { return { x: prevState.x + 1 } });
                    this.travelcount++;
                }
            } else {
                alert("Crossed Limit");
            }
        }
    }

    loadPosition = () => {
        let { x, y } = this.state;
        if (this.travelcount === this.travelLimit - 1) {
            return <h3>Cell position is: {x}, {y}</h3>
        }
    }

    loadRows = () => {
        let { cellCount, x, y } = this.state;

        let tr = [];
        for (let i = 0; i < cellCount; i++) {
            let td = [];
            for (let j = 0; j < cellCount; j++) {
                td.push(<td key={i + j} className={y === i && x === j ? 'yellowCell' : 'whiteCell'}></td>);
            }
            tr.push(<tr key={i}>{td}</tr>);
        }
        return tr;
    }

    render() {
        return (
            <div>
                <div>
                    <input type="text" className="formInput" id="nLength" ref="celEle" />
                </div>
                <div>
                    <input type="text" className="formInput" id="mLength" onChange={this.handleChange} />
                </div>
                <button onClick={this.handleSubmit} className="formButton">Submit</button>

                <div className="matrixBlock" id="createTable">
                    <table>
                        <tbody>
                            {this.loadRows()}
                        </tbody>
                    </table>
                </div>

                <div>
                    {this.loadPosition()}
                </div>
            </div>
        )
    }
}