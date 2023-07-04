import Box from '@mui/material/Box';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import GoodsAPI from './GoodsAPI';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';

export default function GoodsCheckBox ({time}) {

  const [checked, setChecked] = React.useState(true);
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  const [checked4, setChecked4] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleChange1 = (event) => {
    setChecked1(event.target.checked);
  };
  const handleChange2 = (event) => {
    setChecked2(event.target.checked);
  };
  const handleChange3 = (event) => {
    setChecked3(event.target.checked);
  };
  const handleChange4 = (event) => {
    setChecked4(event.target.checked);
  };



return (
<div>
  <div>
<FormControlLabel control={
<Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  } label="Gold" />
  <FormControlLabel control={
<Checkbox
      checked={checked1}
      onChange={handleChange1}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  } label="Gold1" />
  <FormControlLabel control={
<Checkbox
      checked={checked2}
      onChange={handleChange2}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  } label="Gold2" />
  <FormControlLabel control={
<Checkbox
      checked={checked3}
      onChange={handleChange3}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  } label="Gold3" />
  <FormControlLabel control={
<Checkbox
      checked={checked4}
      onChange={handleChange4}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  } label="Gold4" />
  </div>

  <Box>
  <GoodsAPI time = {time} checked = {checked} checked1 = {checked1} checked2 = {checked2} checked3 = {checked3} checked4 = {checked4}/>
  </Box>

</div>
)
}

