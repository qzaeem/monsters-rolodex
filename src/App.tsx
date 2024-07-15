import { useState, useEffect, ChangeEvent } from "react";
// import { Component } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";
import { getData } from "./utils/data.utils";

export type Monster = {
  id: string;
  name: string;
  email: string;
}

// Functional Component
const App = () => {
  const [searchField, setSearchField] = useState(""); // Array destructuring! useState return array of
  // two values. First is the value to be set, second is the method to set that value. Initial
  // value is passed to useState function.
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [ filteredMonsters, setFilteredMonsters ] = useState(monsters);

  // useEffect gets called the very first time this function runs. It gets called again every subsequent
  // time one or more of the values in the array (second argument) change.
  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then((response) => response.json()) // Every .then() that returns a value is gonna return a
    //   // promise that has been resolved.
    //   .then((users) => setMonsters(users));

    const fetchUsers = async () => {
      const users = await getData<Array<Monster>>("https://jsonplaceholder.typicode.com/users");
      setMonsters(users);
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [ searchField, monsters ]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };
  
  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        className="monsters-search-box"
        onChangeHandler={onSearchChange}
        placeHolder="Search monsters"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

// Class Component
/*
class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  // Runs whenever the component mounts. Mounting is when React renders a component onto the page.
  // Only happens once throughout a component's life.
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json()) // Every .then() that returns a value is gonna return a
      // promise that has been resolved.
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          }
          // () => { // Callback for when the state is set.
          //   console.log(this.state);
          // }
        )
      );
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();

    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox
          className="monsters-search-box"
          onChangeHandler={onSearchChange}
          placeHolder="Search monsters"
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}
*/

export default App;
