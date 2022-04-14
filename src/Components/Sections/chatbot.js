import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import SendIcon from '@mui/icons-material/Send';

function InputWithIcon() {
  return (
    <Box sx={{ flexDirection:'column', alignItems: 'center' }}>
      <Box sx={{ margin: '40px', display: 'flex', alignItems: 'flex-end' }}>
        <TextField fullWidth id="input-with-sx"  defaultValue="How can I help you?" variant="standard" />
        <SmartToyRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      </Box>
      <Box sx={{margin: '40px', display: 'flex', alignItems: 'flex-end'  }}>
        <AccountCircle sx={{ color: 'primary', mr: 1, my: 0.5 }} />
        <TextField fullWidth id="input-with-sx"  placeholder="Search product by category On-ear headphones" variant="standard" />
      </Box>
      <Box sx={{ margin: '40px', display: 'flex', alignItems: 'flex-end' }}>
        <TextField multiline fullWidth id="input-with-sx"  defaultValue="Here are the products filtered by the category On-ear headphones" variant="standard" />
        <SmartToyRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      </Box>
      <Box sx={{ margin: '20px', display: 'flex', alignItems: 'center' }}>
        <img 
          src={require('../../headphones.png')}
          height={250}
        />
      </Box>
      <Box sx={{ margin: '40px', display: 'flex', alignItems: 'flex-end' }}>
        <TextField fullWidth id="input-with-sx"  defaultValue="What's next?" variant="standard" />
        <SmartToyRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      </Box>
      <Box sx={{ margin: '30px', display: 'flex', alignItems: 'center', marginTop:'50px', }}>
       <TextField style={{width:'400px'}} label="Input" id="fullWidth" />
       <SendIcon sx={{ marginLeft:'10px',   color: 'primary ', mr: 1, my: 0.5 }} /> 
      </Box>
    </Box>
  );
}


export default function Chatbot() {
  return (
    <React.Fragment>
      {/*<Typography variant="h6" gutterBottom>
        Chatbot
      </Typography>*/}
      {/*<Typography variant="subtitle1" gutterBottom>
        How can I help you? 
      </Typography>*/}
      <Grid container>
        <Grid item xs={12} sm={12} >
          <InputWithIcon/>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={3} sm={3}/>
        <Grid item xs={6} sm={6} >
          
        </Grid>
        <Grid item xs={3} sm={3}/>
      </Grid>
    </React.Fragment>
  );
}