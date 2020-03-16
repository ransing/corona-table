import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './tableStyles.css'
import { red } from 'color-name';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      cases: [],
      country: "country"
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

    const province = ('provinceState' ? 'countryRegion' : 'provinceState')


    const columns = [
      {
        Header: 'Country',
        accessor: 'countryRegion',
        maxWidth: 250,
        style:{
          'text-align': 'center'
        }
      },
      {
        id: Math.random(),
        Header: 'Province',
        maxWidth:200,
        accessor: province,
      //   accessor: d => {
      //     var obj = {accessor: 'provinceState'}
      //     if ('provinceState' === null){
      //       return 'countryRegion'
      //     }
      //     else { return 'provinceState'
      //   }
      // },
        // getProps: (state, rowInfo) => {  //?https://stackoverflow.com/questions/12548857/multiple-conditions-in-ternary-conditional-operator
        //   if (rowInfo) {
        //     return {
        //       style: {
        //         background: 'blue',
        //           // (rowInfo.row.provinceState === null ) ? "blue": 
        //           // null,
        //           'text-align': 'center'
        //       }
        //     };
        //   } else {
        //     return {};
        //   }
        // },
        
        
        // getProps: (state, rowInfo,  props) => {
        //   // if (rowInfo) {
        //   // console.log(state.columns[1])
        //   console.log(rowInfo)
        //   var province = {accessor: 'provinceState'}
        //   var country = {accessor: 'countryRegion'}
          
        //   // }
        //   // if(props === null ) {
        //   //  return country
        //   // } 
        //   // else  {
        //     return province
        //   // }
        // },
        style:{
          'text-align': 'center'
        }
      },
      {
        Header: 'Confirmed',
        accessor: 'confirmed',
        maxWidth: 150,
        style:{
          'text-align': 'center'
        }
      },
      {
        Header: 'Deaths',
        accessor: 'deaths',
        maxWidth: 150,
        backgroundColor: red,
        getProps: (state, rowInfo) => {  //?https://stackoverflow.com/questions/12548857/multiple-conditions-in-ternary-conditional-operator
            if (rowInfo && rowInfo.row) {
              return {
                style: {
                  background:
                    (rowInfo.row.deaths > 0 && rowInfo.row.deaths < 10) ? "#f7b68e": 
                    (rowInfo.row.deaths > 9 && rowInfo.row.deaths < 100) ? "#f5a676": 
                    (rowInfo.row.deaths > 99 && rowInfo.row.deaths < 200) ? "#f2955d": 
                    (rowInfo.row.deaths > 199 && rowInfo.row.deaths < 300) ? "#f17f3a": 
                    (rowInfo.row.deaths > 299 && rowInfo.row.deaths < 400) ? "#f25d31":
                    (rowInfo.row.deaths > 399) ? "#f44324":
                    null,
                    'text-align': 'center'
                }
              };
            } else {
              return {};
            }
          }
      },
      {
        id: 4,
        Header: 'Case Fatality',
        accessor: 'active',
        style:{
          'text-align': 'center'
        },
        maxWidth:150,
        accessor: row => 
        this.percentage(row.deaths, row.confirmed)
      }
    ]

  return (
    <div style={{
      'height':'200px',
      'width':'1000px'
    }}
    >
      Hello
        <ReactTable
          columns={columns}
          data={this.state.cases}
          pageSize={40}
          showPageSizeOptions= {true}
          pageSizeOptions={[50, 30, 50, 100, 300, 700]}
          defaultPageSize= {2}
          className="-striped -highlight"
          style={{
            'height':'950px'
          }}
          >
        </ReactTable>
    </div>
  );
  }
}

export default App;
