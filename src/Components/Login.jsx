import {useNavigate} from "react-router-dom";
import { Container ,Paper, Button} from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import React, { useState} from 'react';
import './Login.css'

export default function AdminLogin() {
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const paperStyle={padding:'5px 20px', width:600,margin:'15px auto'}
  const navigate = useNavigate();
  const [admin_txt, setAdmin] = useState('');
    const navigateDistributor = () => {
      if((admin_txt === 'admin')&&(values.password === 'admin123'))
      {
        navigate('/Dashboard');
      }
      else
      {
        alert("Incorrect Admin and Password")
      }
};
const navigateDistributor_Enter= (e) => {
  if (e.key === 'Enter') {
  if((admin_txt === 'admin')&&(values.password === 'admin123'))
  {
    navigate('/Dashboard');
  }
  else
  {
    alert("Incorrect Admin and Password")
  }
}
};
const Reset = () => {
  setAdmin(()=> "")
  values.password = ""
};
  return (
    <div className='data'>
    <Container>
  <Paper elevation={3} style={paperStyle}>
      <h2>Login</h2>
<Box
component="form"
sx={{
'& > :not(style)': { m: 1},
}}
noValidate
autoComplete="off"
>
<TextField id="outlined-basic" label="User Name" variant="outlined" fullWidth
value={admin_txt}
onChange={(e)=>setAdmin(e.target.value)}
/>

<FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            onKeyDown={navigateDistributor_Enter}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end">
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
<Button variant="contained" onClick={navigateDistributor} style={{ background: 'rgb(64,64,64)' }}>
  Login
</Button>
<Button variant="contained" onClick={Reset} style={{ background: 'rgb(64,64,64)' }}>
  Reset
</Button>
</Box>
</Paper>
</Container>
</div>
  )
}