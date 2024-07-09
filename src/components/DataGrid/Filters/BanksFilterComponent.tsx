import { Grid, TextField, FormControl, MenuItem, Typography, InputAdornment, Box } from "@mui/material";
import React from "react";
import { MAX_LENGHT_LARGE } from "../../../commons/constants";
import StatusFilter from "./StatusFilter";

type Props = {
	filterValues: any;
	handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => void;
};

const BanksFilterComponent = ({ filterValues, handleChange }: Props) => (
	<React.Fragment>
		<Grid item xs={4}>
			<TextField
				id="acquirerId"
				name="acquirerId"
				label="Nome Banca"
				variant="outlined"
				value={filterValues.acquirerId}
				onChange={(e) => handleChange(e, e.target.name)}
				size="small"
				inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "bank-acquirerId-test" }}
				fullWidth
			/>
		</Grid>
		<Grid item xs={4}>
			<TextField
				id="denomination"
				name="denomination"
				label="Nome Banca"
				variant="outlined"
				value={filterValues.description}
				onChange={(e) => handleChange(e, e.target.name)}
				size="small"
				inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "bank-denomination-test" }}
				fullWidth
			/>
		</Grid>
		<Grid item xs={4}>
			<TextField
				id="clientId"
				name="clientId"
				label="Client Id"
				variant="outlined"
				value={filterValues.clientId}
				onChange={(e) => handleChange(e, e.target.name)}
				size="small"
				inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "bank-clientId-test" }}
				fullWidth			/>
		</Grid>
		<Grid item xs={4} display="flex" alignItems="center">
			<TextField
				id="rateMin"
				name="rateMin"
				label="Rate Minimo"
				variant="outlined"
				value={filterValues.rateMin}
				onChange={(e) => handleChange(e, e.target.name)}
				size="small"
				type="number"
				inputProps={{ 
					maxLength: MAX_LENGHT_LARGE, 
					"data-testid": "bank-rateMin-test" 
				}}
				fullWidth
			/>
			<Box mx={1}>
				<Typography variant="body1">-</Typography>
			</Box>
			<TextField
				id="rateMax"
				name="rateMax"
				label="Rate Massimo"
				variant="outlined"
				value={filterValues.rateMax}
				onChange={(e) => handleChange(e, e.target.name)}
				size="small"
				type="number"
				inputProps={{ 
					maxLength: MAX_LENGHT_LARGE, 
					"data-testid": "bank-rateMax-test" 
				}}
				fullWidth
			/>
		</Grid>
	</React.Fragment>
);

export default BanksFilterComponent;