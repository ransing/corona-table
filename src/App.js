import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './tableStyles.css'
import { red } from 'color-name';
import GlobalSearchComponent from './components/GlobalSearchComponent';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      cases: [],
      country: "country",
      filtered: [],
      filterAll: '',
    }
    this.filterAll = this.filterAll.bind(this);
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

  filterAll(e) {
    const { value } = e.target;
    const filterAll = value;
    const filtered = [{ id: 'all', value: filterAll }];
    // NOTE: this completely clears any COLUMN filters
    this.setState({ filterAll, filtered });
  }

  onFilteredChange(filtered) {
    // console.log('filtered:',filtered);
    // const { sortedData } = this.reactTable.getResolvedState();
    // console.log('sortedData:', sortedData);

    // extra check for the "filterAll"
    if (filtered.length > 1 && this.state.filterAll.length) {
      // NOTE: this removes any FILTER ALL filter
      const filterAll = '';
      this.setState({ filtered: filtered.filter((item) => item.id != 'all'), filterAll })
    }
    else
      this.setState({ filtered });
  }

  handleSetData = data => {
    console.log(data);
    this.setState({ cases: data });
  };

 

  render(){

    const provinceCountry = (props) => {
      const countryRegion = 'countryRegion'
      if (props.provinceState === null){
              return "Country"
            }
            else { 
              return "Province"
          }

    }

    // const province = ('provinceState' ? 'countryRegion' : 'provinceState')
    //                  if ('provinceState')

    const columns = [
      {
        Header: 'Country',
        accessor: 'countryRegion',
        minWidth:150,
        maxWidth: 250,
        style:{
          'text-align': 'center',
          'text-size': '12px',
          'minWidth': 150,
        }
      },
      {
        id: Math.random(),
        Header: 'Province',
        maxWidth:210,
        accessor: 'provinceState',
      //   accessor: (props) => {
      //     console.log(props.provinceState)
      //     var obj = {accessor: 'provinceState'}
      //     if (props.provinceState === null){
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
        id: Math.random(),
        Header: 'Region/ Country',
        accessor: provinceCountry,
        maxWidth: 148,
        style:{
          'text-align': 'center'
        }
      },
      {
        Header: 'Confirmed',
        accessor: 'confirmed',
        maxWidth: 140,
        getProps: (state, rowInfo) => {  //?https://stackoverflow.com/questions/12548857/multiple-conditions-in-ternary-conditional-operator
          if (rowInfo && rowInfo.row) {
            return {
              style: {
                background:
                  (rowInfo.row.confirmed > 0 && rowInfo.row.confirmed < 100) ? "#f3e2c8": 
                  (rowInfo.row.confirmed > 90 && rowInfo.row.confirmed < 1000) ? "#f3d2a1": 
                  (rowInfo.row.confirmed > 990 && rowInfo.row.confirmed < 2000) ? "#f1c17a": 
                  (rowInfo.row.confirmed > 1990 && rowInfo.row.confirmed < 3000) ? "#f17f3a": 
                  (rowInfo.row.confirmed > 2990 && rowInfo.row.confirmed < 4000) ? "#f2b355":
                  (rowInfo.row.confirmed > 3999 && rowInfo.row.confirmed < 10000) ? "#f4a225":
                  (rowInfo.row.confirmed > 10000 && rowInfo.row.confirmed < 20000) ? "#e17c31":
                  (rowInfo.row.confirmed > 20000 && rowInfo.row.confirmed < 39990) ? "#d76450":
                  (rowInfo.row.confirmed > 39990) ? "#ca5271":
                  null,
                  'text-align': 'center'
              }
            };
          } else {
            return {};
          }
        },
        style:{
          'text-align': 'center'
        }
      },
      {
        Header: 'Deaths',
        accessor: 'deaths',
        maxWidth: 120,
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
          'text-align': 'center',
          'whiteSpace': 'unset',
          'background': '#e6bdc8',
        },
        maxWidth:148,
        accessor: row => 
        this.percentage(row.deaths, row.confirmed)
      },
      {
        Header: 'Recovered',
        accessor: 'recovered',
        maxWidth: 150,
        style:{
          'text-align': 'center',
          'background': '#d5ebd4',
        }
      }
    ]

  return (
    <div style={{
      'height':'200px',
      'width':'1000px'
    }}
    >
      Hello
      {/* Filter All: <input value={this.state.filterAll} onChange={this.filterAll} /> */}

      <GlobalSearchComponent
          data={this.state.cases}
          handleSetData={this.handleSetData}
        />

        <ReactTable
          columns={columns}
          data={this.state.cases}
          pageSize={40}
          showPageSizeOptions= {true}
          pageSizeOptions={[50, 30, 50, 100, 300, 700]}
          defaultPageSize= {2}
          className="-striped -highlight"
          style={{
            'height':'950px',
            'border':'2px solid black',
          }}
          >
        </ReactTable>
    </div>
  );
  }
}

export default App;
