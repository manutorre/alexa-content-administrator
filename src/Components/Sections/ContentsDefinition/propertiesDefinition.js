import * as React from 'react';
import { Grid, Typography, Button, TextField, FormControlLabel, Checkbox, Box} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Footer from './footer';

export default function PropertiesDefinition({step, handleImagePosition, handleBack, handleNext, saveInformation, messageData}) {
  const [imgStyle, setStyle ] = React.useState({
    // position:'absolute',
    // left:'40%',
    // bottom:'25%',
    height: '200px',
    width: '300px',
  });

  const [inputValue, setInputValue] = React.useState(''); 
  const property = React.useRef({}); 
  const contentValue = React.useRef(messageData);

  React.useEffect(()=> {
    handleImagePosition({
      position: 'fixed',
      left: '55%',
      bottom: '23%',
      height: '200px',
      width: '520px',
    });
  }, []);

  const handleConfirm = () => {
    console.log("Next ", property.current);
    const operation = 'setProperties';
    property.current = {...messageData, name: inputValue};
    saveInformation(property, operation);
    handleNext();
  }

  const handleChange = ({target}) => {
    console.log("Changing ", target.value);
    setInputValue(target.value);
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Properties Definition
      </Typography>
      <Typography component='div' variant="subtitle1" gutterBottom> 
        Which <Box fontWeight='fontWeightBold' display='inline'>{`${contentValue.current ? contentValue.current.name : 'content'}`} </Box> properties the chatbot should recognize? 
      </Typography>
      <Grid container>
        <Grid item xs={2} sm={2}/>
        <Grid item xs={'auto'} sm={'auto'}>
           <div style={{height: '200px',width: '300px',}}>
            <img 
            src={require('../../../Drag-elements.jpg')}
            style={{...imgStyle}}/>
          </div>       
        </Grid>
        <Grid item xs={2} sm={2}/>
      </Grid>
      <Grid 
        container 
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={3}
      >
        <Grid item xs={1.8} sm={1.8}/>
        <Grid item xs={1.2} sm={1.2}>
          <Button startIcon={<AddIcon/>} size='small' color="secondary" ></Button>
        </Grid>
        <Grid item xs={6} sm={6} >
          <TextField
            required
            id="propertyName"
            name="propertyName"
            label="Property name"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            value={inputValue}
            helperText="Properties can be product's price, name, rate, etc"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={3} sm={3}/>
      </Grid>
      <Grid container marginTop={3}>
        <Grid item xs={4} sm={4}/>
        <Grid item xs={2} sm={2} >
          <Button size='small'color="secondary" variant="outlined">Name</Button>
        </Grid>
        <Grid item xs={3} sm={3} >
          <Button size='small' color="secondary" variant="outlined">Price</Button>
        </Grid>
        <Grid item xs={3} sm={3}/>
      </Grid>
      <Footer step={step} handleBack={handleBack} handleNext={handleConfirm}/>
    </React.Fragment>
  );
}