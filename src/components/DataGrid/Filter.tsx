import TextField from "@mui/material/TextField";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, useTheme } from "@mui/material";
import React from "react";

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

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState(event.target.value as string);
	};

	return (
		<Box sx={inputGroupStyle}>
			<Grid container spacing={3}>
				<Grid item xs={4}>
					<TextField id="function-type" label="Tipo Funzione" variant="outlined" fullWidth size="small" />
				</Grid>

				<Grid item xs={4}>
					<TextField id="file-name" label="Nome File" variant="outlined" fullWidth size="small" />
				</Grid>

				<Grid item xs={4}>
					<TextField id="version" label="Versione" variant="outlined" fullWidth size="small" />
				</Grid>

				<Grid item xs={4}>
					<TextField id="acquirer-id" label="Acquirer Id" variant="outlined" fullWidth size="small" />
				</Grid>

				<Grid item xs={4}>
					<FormControl fullWidth>
						<TextField
							id="state-id"
							value={state}
							label="Stato"
							select
							onChange={handleChange}
							size="small"
						>
							<MenuItem value="CREATED">CREATED</MenuItem>
							<MenuItem value="WAITING_DEPLOY">WAITING_DEPLOY</MenuItem>
							<MenuItem value="UPDATED_BUT_NOT_DEPLOYED">UPDATED_BUT_NOT_DEPLOYED</MenuItem>
							<MenuItem value="DEPLOYED">DEPLOYED</MenuItem>
							<MenuItem value="DEPLOY_ERROR">DEPLOY_ERROR</MenuItem>
						</TextField>
					</FormControl>
				</Grid>
				<Grid item xs={4} />
				<Grid item xs={12}>
					<Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"flex-end"}>
						<Box mr={2}><Button variant="outlined">Cancella Filtri</Button></Box>
						<Box><Button variant="contained">Filtra</Button></Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}
