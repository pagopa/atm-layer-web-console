import { TextField, Autocomplete, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { SyntheticEvent } from "react";
import { PROFILE_DESCRIPTIONS } from "../../commons/constants";

type Props = {
    handleChange: (event: SyntheticEvent<Element, Event>, value: Array<string>) => void;
    errors:any;
};

const names = PROFILE_DESCRIPTIONS;
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function MultiSelect({handleChange, errors}:Props) {
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
					error={Boolean(errors.profileIds)}
					helperText={errors.profileIds}
				/>
			)}
			onChange={handleChange}
		/>
	);
}