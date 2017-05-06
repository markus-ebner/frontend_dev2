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
        //slet src = "money-bag.png";
        let moveAllowed = false;
        if (this.state.tooMuchMoneyToHold)
            hint = "You have no hands free for another bag of money! You have to bring money to the safe!";

        if (this.state.hands.length < 2)
            moveAllowed = true;

        return (
            <div className="bank">
                <button
                    disabled={ this.state.tooMuchMoneyToHold } onClick={this.addMoneyBag}>Make money
                </button>
                <button
                    disabled={ moveAllowed } onClick={ this.moveMoneyBag } >Transfer money to the safe
                </button>
                <p className="hint">{hint}</p>
                <Heading value="Make money money, make money money money!" />
                <div className="make-money">
                    {
                        this.state.hands.map((value,idx) => {
                            return <Money value={"hand"+idx} src={value}/>
                        })
                    }
                </div>
                <Heading value="Safe:" />
                <div className="safe">
                    {
                        this.state.safe.map((value,idx) => {
                            return <Money value={"safe"+idx} src={value}/>
                        })
                    }
                </div>
            </div>
        );
    };

    addMoneyBag = () => {
        let src = "money-bag.png";
        if (this.state.hands.length === 0)
            src = "open-money-bag.png";
        this.setState({
            hands: [...this.state.hands, src],
            safe: this.state.safe,
            tooMuchMoneyToHold: (this.state.hands.length >= 6)
        });
    };

    moveMoneyBag = () => {
        let src = "money-bag.png";
        this.setState({
            hands: [...this.state.hands].splice(0, this.state.hands.length-1),
            safe: [...this.state.safe, src],
            tooMuchMoneyToHold: (this.state.hands.length -2 >= 6)
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
