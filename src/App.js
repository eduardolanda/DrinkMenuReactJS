import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import "./App.css";

//Components
import Navbar from "./components/Navbar";
import Drink from "./components/Drink";
import { Container } from "@material-ui/core";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.svar = "margarita";
    this.API_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${
      this.svar
    }`;
    this.state = {
      persons: []
    };
    this.getValue = this.getValue.bind(this);
  }

  getData() {
    axios.get(this.API_URL).then(res => {
      let persons = res.data.drinks;
      this.setState({ persons });
    });
  }

  getValue(event) {
    if (event.key === "Enter") {
      this.svar = event.target.value;
      this.API_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${
        this.svar
      }`;
      this.getData();
    }
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className="App">
        <Navbar getValue={this.getValue} />
        <div className="GridIt">
          {this.state.persons.map(person => (
            <Drink
              key={person.idDrink}
              title={person.strDrink}
              glass={person.strGlass}
              image={person.strDrinkThumb}
              instructions={person.strInstructions}
              ing1={person.strIngredient1}
              ing2={person.strIngredient2}
              ing3={person.strIngredient3}
              ing4={person.strIngredient4}
              ing5={person.strIngredient5}
              ing6={person.strIngredient6}
            />
          ))}
        </div>
      </div>
    );
  }
}
