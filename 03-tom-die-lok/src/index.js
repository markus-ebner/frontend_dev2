/**
 * Created by markusebner on 05.05.17.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Money extends React.Component {
    render() {
        return (
            <div className="money">
                <img key={this.props.value} src={this.props.src} alt="Money"/>
            </div>
        );
    }
}

class Bank extends React.Component {
    constructor() {
        super();
        this.state = {
            hands: [],
            safe: [],
            tooMuchMoneyToHold: false
        };
    };

    render() {
        let hint;
        let src;
        if(this.state.tooMuchMoneyToHold)
            hint = "You have no hands free for another bag of money! You have to bring money to the safe!";
        console.log(this.state.hands.length);
        if(this.state.hands.length === 0)
            src = "open-money-bag.png";
        else
            src = "money-bag.png";

        return (
            <div className="bank">
                <button
                    disabled={ this.state.tooMuchMoneyToHold } onClick={this.addMoneyBag}>Make money
                </button>
                <button onClick={ this.moveMoneyBag } >Transfer money to the safe</button>
                <p className="hint">{hint}</p>
                <Heading value="Make money money, make money money money!" />
                <div className="make-money">
                    {
                        this.state.hands.map((idx) => {
                            return <Money value={idx} src={src}/>
                        })
                    }
                </div>
                <Heading value="Safe:" />
                <div className="safe">
                    {
                        this.state.safe.map((idx) => {
                            return <Money value={idx} src={src}/>
                        })
                    }
                </div>
            </div>
        );
    };

    addMoneyBag = () => {
        this.setState({
            hands: ([...this.hands].push(this.hands.length+1)),
            safe: this.safe,
            tooMuchMoneyToHold: (this.hands.length > 6)
        });
    };
    moveMoneyBag = () => {
        if(this.hands.length > 0)
            this.setState({
                hands: ([...this.hands].pop()),
                safe: ([...this.safe].push(this.safe.length+1)),
                tooMuchMoneyToHold: this.tooMuchMoneyToHold
            });
    };
}

// ========================================

ReactDOM.render(
    <Bank />,
    document.getElementById('root')
);

function Heading(props) {
    return (<h2 className="heading">{props.value}</h2>);
}
