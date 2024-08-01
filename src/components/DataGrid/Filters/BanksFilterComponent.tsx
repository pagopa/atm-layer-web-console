import React from "react";
import { Grid, TextField, Typography, Box, FormControl, FormHelperText } from "@mui/material";
import { MAX_LENGHT_LARGE } from "../../../commons/constants";

type Props = {
	filterValues: any;
	handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => void;
	errors: any;
	showErrors: boolean;
};

const BanksFilterComponent = ({ filterValues, handleChange, errors, showErrors }: Props) => (
	<React.Fragment>
		<Grid item xs={6}>
			<TextField
				id="acquirerId"
				name="acquirerId"
				label="ID Banca"
				variant="outlined"
				value={filterValues.acquirerId}
				onChange={(e) => handleChange(e, e.target.name)}
				size="small"
				inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "bank-acquirerId-test" }}
				fullWidth
			/>
		</Grid>
		<Grid item xs={6}>
			<TextField
				id="denomination"
				name="denomination"
				label="Nome Banca"
				variant="outlined"
				value={filterValues.denomination}
				onChange={(e) => handleChange(e, e.target.name)}
				size="small"
				inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "bank-denomination-test" }}
				fullWidth
			/>
		</Grid>
		<Grid item xs={4} />
	</React.Fragment>
);

export default BanksFilterComponent;
