import React from "react";
// import { Input, Form } from "semantic-ui-react";
import '../tableStyles.css'
import { Input } from 'antd';
import 'antd/dist/antd.css';
import { Popover, Button } from 'antd';

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
      const content = (
        <div>
          <p style={{'font-size':'20px'}}>Click the headings in the top row to sort</p>
        </div>
    )


    return (
      <>
        
        <div 
        style={{
            'width':' 900px',
            'textAlign': "center",
            'margin':'0 auto',
            'marginTop':'20px'
        }}>
            <h1 style={{'color':'white'}}>Coronavirus Numbers Around the World</h1>
            <div
            Style={{
                "marginTop":"20px",
            }}>
            <Input 
            id="inputID"
            class="inputSearch"
            icon='search'
            // action='search'
            // size='big'
            type="text"
            size="large"
            name="searchInput"
            placeholder="Search Country"
            value={this.state.searchInput || ""}
            onChange={this.handleChange}
            label="Search Country"
            style={{
                'margin':'auto',
                'text-align': 'center',
                'width':'300px',
                'backgroundColor':'#C9CCCE'
            }}
            />
            </div>
            <br />
            <div>
                <Popover content={content}  placement="right">
                    {/* <Button type="primary">Hover me</Button> */}
                    <Button type="primary" >Sort</Button>  
                </Popover>
            </div>
        </div>
      </>
    );
  }
}
