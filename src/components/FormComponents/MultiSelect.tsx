import { TextField, Autocomplete, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { SyntheticEvent, useEffect, useState } from "react";
import { PROFILE_DESCRIPTIONS } from "../../commons/constants";

type Props = {
    handleChange: (event: SyntheticEvent<Element, Event>, value: Array<string>) => void;
    errors:any;
	previousValues?: Array<string>;
};

const names = PROFILE_DESCRIPTIONS;
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function MultiSelect({handleChange, errors, previousValues }:Props) {
	
	return (
		<Autocomplete
			multiple
			options={names}
			getOptionLabel={(option) => option}
			defaultValue={previousValues}
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
					error={Boolean(errors.profileIds.length>0)}
					helperText={errors.profileIds}
				/>
			)}
			onChange={handleChange}
		/>
	);
}