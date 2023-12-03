import React, { Component } from 'react';
import { Dropdown, DropdownButton, MenuItem } from 'react-bootstrap';
import List from './List';

class FilteredList extends Component {
  constructor(props) {
    super(props);

    //The state is just a list of key/value pairs (like a hashmap)
    //TODO (FilteredList): Add an additional state variable within this.state cAlled "type" and set it to a default value
    this.state = {
      search: "",
      type: "All"
    };
  }

  //Sets the state whenever the user types on the search bar
  onSearch = (event) => {
    this.setState({search: event.target.value.trim().toLowerCase()});
  }

  // Event handling method for when an item in dropdown is selected
  onTypeSelect = (eventKey) => {
    this.setState({ type: eventKey });
  }

  //TODO (FilteredList): Change filterItem to take into account the "type" state variable when filtering
  filterItem = (item) => {
      // Checks if the current search term is contained in this item
    const searchCondition = item.name.toLowerCase().search(this.state.search) !== -1;

    // Checks if the current type is "All" or matches the item's type
    const typeCondition = this.state.type === "All" || this.state.type === item.type;

    // Returns true only if both search and type conditions are met
    return searchCondition && typeCondition;

  }

  render(){
    return (
        <div className = "filter-list">
          <h1>Produce Search</h1>
         
          <DropdownButton id="typeDropdown" title={this.state.type === "All" ? "Type" : this.state.type} onSelect={this.onTypeSelect}>
            <Dropdown.Item eventKey="All">All</Dropdown.Item>
            <br></br>
            <Dropdown.Item eventKey="Fruit">Fruit</Dropdown.Item>
            <br></br>
            <Dropdown.Item eventKey="Vegetable">Vegetable</Dropdown.Item>          
          </DropdownButton>
        <input type="text" placeholder="Search" onChange={this.onSearch} />
        <List items={this.props.items.filter(this.filterItem)} />
        </div>
    );
  }
}

export default FilteredList;
