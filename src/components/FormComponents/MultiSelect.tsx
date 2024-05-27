import React from "react";
import { TextField, Autocomplete, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { PROFILE_DESCRIPTIONS } from "../../commons/constants";

const names = PROFILE_DESCRIPTIONS;
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function MultiSelect() {
	return (
		<Autocomplete
			multiple
			options={names}
			getOptionLabel={(option) => option}
			disableCloseOnSelect
			renderOption={(props, option, { selected }) => (
				<li {...props}>
					<Checkbox
						icon={icon}
						checkedIcon={checkedIcon}
						style={{ marginRight: 8 }}
						checked={selected}
					/>
					{option}
				</li>
			)}
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