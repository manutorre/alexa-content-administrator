import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const INTENTS = ["Search by name", "Search by category", "Buy a product"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MultipleSelectChip() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Intents</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-chip" label="Intents order" />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {INTENTS.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

// function SelectAutoWidth(props) {
//   const [age, setAge] = React.useState(1);

//   const handleChange = (event) => {
//     setAge(event.target.value);
//   };

//   return (
//     <div>
//       <FormControl sx={{minWidth: 100 }}>
//         <InputLabel id="demo-simple-select-autowidth-label">{props.label}</InputLabel>
//         <Select
//           labelId="demo-simple-select-autowidth-label"
//           id="demo-simple-select-autowidth"
//           value={age}
//           onChange={handleChange}
//           autoWidth
//           label={props.label}
//         >
//           <MenuItem value="">
//             <em>None</em>
//           </MenuItem>
//           <MenuItem value={1}>Search by name</MenuItem>
//           <MenuItem value={2}>Search by category</MenuItem>
//           <MenuItem value={3}>Buy a product</MenuItem>
//         </Select>
//       </FormControl>
//     </div>
//   );
// }

export default function DialogDefinition() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Action Steps
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {
          "The action defined previously will be integrated by a serie of steps."
        }
      </Typography>

      <Grid container spacing={3} marginTop={1}>
        <Grid item xs={2} sm={2} />
        <Grid item xs={9} sm={9}>
          {
            //<SelectAutoWidth label={"Intents order"}/>
          }
          {/* <MultipleSelectChip /> */}
        </Grid>

        <Grid item xs={1} sm={1} />
      </Grid>
    </React.Fragment>
  );
}
