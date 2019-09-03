import React, { Component } from "react";
import SushiContainer from "./containers/SushiContainer";
import Table from "./containers/Table";

// Endpoint!
const API = "http://localhost:3000/sushis";

class App extends Component {
  state = {
    sushis: [],
    sushiIndex: 0,
    eatenArray: [],
    budget: 100
  };

  componentDidMount() {
    fetch(API)
      .then(res => {
        return res.json();
      })
      .then(sushis => {
        sushis.map(sushi => (sushi.eaten = false));
        this.setState({
          sushis: sushis
        });
        console.log(sushis);
      });
  }

  getSushis() {
    console.log("grabbing more sushis");
    let sushiArray = this.state.sushis.slice(
      this.state.sushiIndex,
      this.state.sushiIndex + 4
    );
    return sushiArray;
  }

  getMoreSushi = () => {
    console.log("I want more!");
    if (this.state.sushiIndex + 4 >= this.state.sushis.length) {
      this.setState({ sushiIndex: 0 });
    } else {
      this.setState({ sushiIndex: this.state.sushiIndex + 4 });
    }
  };

  eatSushi = eatenSushi => {
    if (this.state.budget >= eatenSushi.price) {
      let newSushiArray = this.state.sushis.map(sushi => {
        if (sushi.id === eatenSushi.id) {
          //do stuff
          sushi.eaten = true;
        }
        return sushi;
      });

      let newEatenArray = this.state.eatenArray;
      newEatenArray.push(eatenSushi);

      this.setState({
        sushis: newSushiArray,
        eatenArray: newEatenArray,
        budget: this.state.budget - eatenSushi.price
      });
    }
  };

  render() {
    return (
      <div className="app">
        <SushiContainer
          sushis={this.getSushis()}
          getMoreSushi={this.getMoreSushi}
          eatSushi={this.eatSushi}
        />
        <Table eatenArray={this.state.eatenArray} budget={this.state.budget} />
      </div>
    );
  }
}

export default App;
