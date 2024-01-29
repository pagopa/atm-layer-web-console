import TextField from "@mui/material/TextField";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Toolbar, useTheme } from "@mui/material";
import React from "react";
import { Box } from "@mui/system";

export default function FilterBar() {

	const theme = useTheme();

	const inputGroupStyle = {
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: theme.palette.divider,
		position: "static",
		padding: 2
	};

	const [state, setState] = React.useState("");

	const handleChange = (event: SelectChangeEvent) => {
		setState(event.target.value as string);
	};

	return (
		<Box sx={inputGroupStyle}>
			<Grid container columns={12} spacing={1}>
				<Grid item xs={2}>
					<TextField id="function-type" label="Tipo Funzione" variant="outlined" fullWidth />	
				</Grid>

				<Grid item xs={2}>
					<TextField id="file-name" label="Nome File" variant="outlined" fullWidth />
				</Grid>

				<Grid item xs={2}>
					<TextField id="version" label="Versione" variant="outlined" fullWidth />
				</Grid>

				<Grid item xs={2}>
					<TextField id="acquirer-id" label="Acquirer Id" variant="outlined" fullWidth />
				</Grid>

				<Grid item xs={2}>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Stato</InputLabel>
						<Select
							labelId="state-label"
							id="state-id"
							value={state}
							label="Stato"
							onChange={handleChange}
						>
							<MenuItem value="CREATED">CREATED</MenuItem>
							<MenuItem value="WAITING_DEPLOY">WAITING_DEPLOY</MenuItem>
							<MenuItem value="UPDATED_BUT_NOT_DEPLOYED">UPDATED_BUT_NOT_DEPLOYED</MenuItem>
							<MenuItem value="DEPLOYED">DEPLOYED</MenuItem>
							<MenuItem value="DEPLOY_ERROR">DEPLOY_ERROR</MenuItem>								
						</Select>
					</FormControl>	
				</Grid>

				<Grid item xs={1}>			
					<Button variant="contained" sx={{height: "100%", width: "100%"}}>Filtra</Button>	
				</Grid>

				<Grid item xs={1}>			
					<Button variant="outlined" sx={{height: "100%", width: "100%"}}>Cancella Filtri</Button>	
				</Grid>
			</Grid>
		</Box>
	);
}
