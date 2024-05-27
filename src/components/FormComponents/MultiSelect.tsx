import React from "react";
import { TextField, Autocomplete } from "@mui/material";
import { PROFILE_DESCRIPTIONS } from "../../commons/constants";
const names = PROFILE_DESCRIPTIONS;
export default function MultiSelect() {
	return (
		<Autocomplete
			multiple
			options={names}
			getOptionLabel={(option) => option}
			disableCloseOnSelect
			renderInput={(params) => (
				<TextField
					{...params}
					variant="outlined"
					label="Ruoli assegnati"
				/>
			)}
		/>
	);
}