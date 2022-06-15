import * as React from 'react';
import {TableContainer, TableHead, TableCell, TableBody, TableRow, Table, CircularProgress} from '@mui/material';

var url = "https://swapi.dev/api/planets/"
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
    fetch(url)
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
<h1> Planet Glossary</h1>
<TableContainer sx={{p:4}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{border: 1, fontWeight:'bold', borderColor: 'grey.500'}}> Planet Name</TableCell>
            <TableCell sx={{border: 1, fontWeight:'bold', borderColor: 'grey.500'}}> Climate</TableCell>
            <TableCell sx={{border: 1, fontWeight:'bold', borderColor: 'grey.500'}}> Terrain</TableCell>
            <TableCell sx={{border: 1, fontWeight:'bold', borderColor: 'grey.500'}}># of Residents</TableCell>
            <TableCell sx={{border: 1, fontWeight:'bold', borderColor: 'grey.500'}}>Population</TableCell>
            <TableCell sx={{border: 1, fontWeight:'bold', borderColor: 'grey.500'}}>Surface Area Covered By Water (km2)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow sx={{border: 1, borderColor: 'grey.500'}}>
              <TableCell sx={{border: 1, borderColor: 'grey.500'}}>
                {row.planetName}
              </TableCell>
              <TableCell sx={{border: 1, borderColor: 'grey.500'}}>{row.climate}</TableCell>
              <TableCell sx={{border: 1, borderColor: 'grey.500'}}>{row.terrain}</TableCell>
              <TableCell sx={{border: 1, borderColor: 'grey.500'}}>{row.residents}</TableCell>
              <TableCell sx={{border: 1, borderColor: 'grey.500'}}>{row.population}</TableCell>
              <TableCell sx={{border: 1, borderColor: 'grey.500'}}> {row.surfaceArea}</TableCell>
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
   
    if(state.rows[index].population === "unknown"){
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