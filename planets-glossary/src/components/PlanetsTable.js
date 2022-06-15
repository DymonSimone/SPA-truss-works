import * as React from 'react';
import {TableContainer, TableHead, TableCell, TableBody, TableRow, Table, Paper} from '@mui/material';

const rows = []
class PlanetsTable extends React.Component{
constructor(props){
        super(props);
        this.state = ({
            rows:[],
            error:''
        });
}

componentDidMount(){
    fetch(
        "https://swapi.dev/api/planets/")
                   .then((res) => {
                     if(!res.ok) throw new Error(res.status);
                     else return res.json();
                   })
                   .then((json) => {
                         console.log(json)
                         this.setState({rows: json.results})
                         for(let i = 0; i < this.state.rows.length; i++){
                            populateData(this.state,i)
                         }
                   });
        
}

render(){
return (
<div>
<h1> Planets Glossary</h1>
<TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> Planet Name</TableCell>
            <TableCell> Climate</TableCell>
            <TableCell> Terrain</TableCell>
            <TableCell># of Residents</TableCell>
            <TableCell>Population</TableCell>
            <TableCell>Surface Area Covered By Water (km2)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              <TableCell>
                {row.planetName}
              </TableCell>
              <TableCell>{row.climate}</TableCell>
              <TableCell>{row.terrain}</TableCell>
              <TableCell>{row.residents}</TableCell>
              <TableCell>{row.population}</TableCell>
              <TableCell> {row.surfaceArea}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </div>
    
    );
}
}

function populateData(state, index){
    var population;
    var planetName = state.rows[index].name
    var climate = state.rows[index].climate
    var residents = state.rows[index].residents.length
    var terrain = state.rows[index].terrain
    var surfaceArea = state.rows[index].surface_water
   
    if(state.rows[index].population == "unknown"){
      population = "?"
    }else{
      population = state.rows[index].population
    }
     rows.push({planetName, climate , residents, terrain, population, surfaceArea });
  }
export default PlanetsTable