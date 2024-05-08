import { Grid, TextField, FormControl, MenuItem } from "@mui/material";
import React from "react";
import { MAX_LENGHT_LARGE } from "../../../commons/constants";
import StatusFilter from "./StatusFilter";

type Props = {
	filterValues: any;
	handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => void;
};

const VariablesFilterComponent = ({ filterValues, handleChange }: Props) => (
	<React.Fragment>
		<Grid item xs={4}>
			<TextField
				id="name"
				name="name"
				label="Nome variabile"
				variant="outlined"
				value={filterValues.name}
				onChange={(e) => handleChange(e, e.target.name)}
				size="small"
				inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "variable-name-test" }}
				fullWidth
			/>
		</Grid>
		<Grid item xs={4}>
			<TextField
				id="value"
				name="value"
				label="Valore variabile"
				variant="outlined"
				value={filterValues.value}
				onChange={(e) => handleChange(e, e.target.name)}
				size="small"
				inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "variable-value-test" }}
				fullWidth
			/>
		</Grid>
		<Grid item xs={4} />
	</React.Fragment>
);

export default VariablesFilterComponent;