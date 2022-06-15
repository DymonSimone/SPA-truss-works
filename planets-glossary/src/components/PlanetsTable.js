import * as React from 'react';
import {TableContainer, TableHead, TableCell, TableBody, TableRow, Table, CircularProgress} from '@mui/material';

const rows = []
var loading = true
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
        "https://swapi.dev/api/planets/n")
                   .then((res) => {
                     if(!res.ok) throw new Error(res.status);
                     else return res.json();
                   })
                   .then((json) => {
                         this.setState({rows: json.results})
                         for(let i = 0; i < this.state.rows.length; i++){
                            populateData(this.state,i)
                            rows.sort((a,b) =>{
                                if(a.planetName < b.planetName){
                                    return -1;
                                }

                                if(a.planetName > b.planetName){
                                    return 1;
                                }
                                return 0;
                            });
                   loading = false
                    }}).catch((error) => {
                    this.setState({error: error})              
              });
}

render(){
if(this.state.error){
    return  <h1> 404 Not Found </h1>
}

if(loading){
    return <CircularProgress />
}
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
    var surfaceArea = formatNumber(calaculateSurfaceArea(state.rows[index].diameter,state.rows[index].surface_water ))
   
    if(state.rows[index].population == "unknown"){
      population = "?"
    }else{
      population = formatNumber(state.rows[index].population)
    }
     rows.push({planetName, climate , residents, terrain, population, surfaceArea });
  }
function calaculateSurfaceArea(diameter, surface_water){
    var radius = Math.abs(diameter / 2)
    var result

    if(surface_water == "unknown"){
        result = "?"
    }else{
        var decimal = parseInt(surface_water) / 100
        result = Math.round(4 * Math.PI * Math.pow(radius, 2) * decimal)
    }
return result
}
//Source: https://stackoverflow.com/questions/16637051/adding-space-between-numbers
function formatNumber(input){
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
 }
 
export default PlanetsTable