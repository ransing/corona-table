import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './tableStyles.css'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      cases: []
    }
  }
  
  componentDidMount(){
    const url = "https://covid19.mathdro.id/api/confirmed"
    fetch(url,{
      method: "GET"
    })
    .then(r => r.json())
    .then(data => {
      this.setState({cases: data})
    })
  }

  percentage = (a,b) => {
    return ((a/b)*100).toFixed(2)
  } 

  render(){
    const columns = [
      {
        Header: 'Country',
        accessor: 'countryRegion'
      },
      {
        Header: 'Province',
        accessor: 'provinceState'
      },
      {
        Header: 'Confirmed',
        accessor: 'confirmed'
      },
      {
        Header: 'Deaths',
        accessor: 'deaths'
      },
      {
        id: 4,
        Header: 'Case Fatality',
        accessor: 'active',
        accessor: row => 
        this.percentage(row.deaths, row.confirmed)
      }
    ]

  return (
    <div>
      Hello
        <ReactTable
          columns={columns}
          data={this.state.cases}
          >
        </ReactTable>
    </div>
  );
  }
}

export default App;
