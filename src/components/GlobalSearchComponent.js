import React from "react";
import { Input } from "semantic-ui-react";

export default class GlobalSearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: [],
      searchInput: "",
      data:[]
    };
  }

  componentDidMount(){
    const url = "https://covid19.mathdro.id/api/confirmed"
    fetch(url,{
      method: "GET"
    })
    .then(r => r.json())
    .then(data => {
      this.setState({data: data})
    })
  }

  handleChange = event => {
    this.setState({ searchInput: event.target.value }, () =>
      this.globalSearch()
    );
  };

  globalSearch = () => {
    //   console.log(filteredData)
    let { searchInput } = this.state;
    let filteredData = this.state.data.filter(value => {
      return (
        //   console.log(value)
        // value.provinceState.toLowerCase().includes(this.state.searchInput.toLowerCase()) ||
        value.countryRegion.toLowerCase().includes(searchInput.toLowerCase()) 
        // value.visits
        //   .toString()
        //   .toLowerCase()
        //   .includes(searchInput.toLowerCase())
      );
    },()=>(console.log(filteredData)));
    this.props.handleSetData(
        filteredData
    //   (filteredData.length > 0 && filteredData) || searchInput
    //     ? filteredData
    //     : this.props.data
    );
    this.setState({filteredData: filteredData});
    console.log(filteredData)
  };

  render() {
      console.log(this.props.data[10]);
    return (
      <>
        <br />
        <Input
          size="large"
          name="searchInput"
          value={this.state.searchInput || ""}
          onChange={this.handleChange}
          label="Search"
        />
        <br />
        <br />
      </>
    );
  }
}
