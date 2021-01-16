import React, { Component } from 'react';
import './Counter.css'


class Counter extends Component{

    constructor()
    {
        super(); //needed to use "this.whatever"
        this.state = {
            counter : 0,
        }
    }

    render=()=> {
        return (
          <div className="counter">
            <CounterButton by={1}/>
            <CounterButton by={5}/>
            <CounterButton by={10}/>
            <span className="count">{this.state.counter}</span>
            <button onClick={this.reset}>RESET</button>
          </div>
        );
      }
}

class CounterButton extends Component{

    //Define the initial state in a constructor
    //State => counter 0
    constructor()
    {
        super(); //needed to use "this.whatever"
        this.state = {
            counter : 0,
            secondCounter : 100
        }

        /* Only needed when not using arrow functions
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
        */
    }

    //With no arrow function
    // render(){
    //     return (
    //             <div className="counter">
    //                 <button onClick={this.increment}>+1</button>
    //                 <button onClick={this.decrement}>-1</button>
    //                 <span className="count">{this.state.counter}</span>
    //                 <button onClick={this.reset}>RESET</button>
    //             </div> 
    //             )

    //with arrow function
    render=()=> {
        return (
                <div className="CounterButton">
                    <button onClick={this.increment}>+{this.props.by}</button>
                    <button onClick={this.decrement}>-{this.props.by}</button>
                </div> 
                )
  }

    increment=()=>  //Update the state - counter++
    {
        console.log('Increment');
        this.setState({//does a merge with current state
            counter : this.state.counter+this.props.by
        })
    }

    decrement=()=>
    {
        console.log('Decrement');
        this.setState({
            counter : this.state.counter-this.props.by
        })
    }

    reset=()=>
    {
        console.log('RESET');
        this.setState({
            counter : 0
        })
    }
}


CounterButton.defaultProps = {
    by:1
}

export default Counter;