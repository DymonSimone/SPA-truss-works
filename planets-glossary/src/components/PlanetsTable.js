import * as React from 'react';
import {TableContainer, TableHead, TableCell, TableBody, TableRow, Table, Paper} from '@mui/material';

class PlanetsTable extends React.Component{
constructor(props){
        super(props);
        this.state = ({
            rows:[],
            error:''
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
  
  const rows = [
    createData('A', 'cold', 6.0, 24, 4.0,5),
    createData('B', 'hot', 9.0, 37, 4.3,12),
    createData('C', 'humid', 16.0, 24, 6.0,4),
    createData('D', 'mild', 3.7, 67, 4.3,5),
    createData('E', 'cold', 16.0, 49, 3.9,7),
  ];

export default PlanetsTable