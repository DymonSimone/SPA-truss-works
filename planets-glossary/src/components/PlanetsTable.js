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
                            console.log(this.state.rows[i])
                            //console.log(createData(this.state.planetName, this.state.climate, this.state.terrain, this.state.resisdents, this.state.population, this.state.surfaceArea))
                            rows.push( createData(this.state.rows[i].name, this.state.rows[i].climate, this.state.rows[i].terrain, this.state.rows[i].residents.length, this.state.rows[i].population, this.state.rows[i].surface_water))
                         }
                         console.log(rows)
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
              <TableCell>{row.resisdents}</TableCell>
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

function createData(
    planetName,
    climate,
    terrain,
    resisdents,
    population,
    surfaceArea
  ) {
    return { planetName, climate, terrain, resisdents, population, surfaceArea };
  }
  
 
export default PlanetsTable