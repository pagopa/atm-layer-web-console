import { TextField, Autocomplete, Checkbox, Chip } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { SyntheticEvent, useContext } from "react";
import { addDependentProfiles } from "../Commons/Commons";
import { Ctx } from "../../DataContext";

type Props = {
    handleChange: (event: SyntheticEvent<Element, Event>, value: Array<string>) => void;
    errors: any;
    value: Array<string>;
    names: Array<string>;
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function MultiSelect({ handleChange, errors, value, names }: Props) {
	const { profilesAvailable } = useContext(Ctx);

	const handleChangeWrapper = (event: SyntheticEvent<Element, Event>, newValue: Array<string>) => {
		const completeProfiles = addDependentProfiles(newValue, profilesAvailable);

		handleChange(event, completeProfiles);
	};

	return (
		<Autocomplete
			multiple
			options={names ?? []}
			getOptionLabel={(option) => option}
			value={value}
			isOptionEqualToValue={(option, value) => option === value}
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
			renderTags={(value) =>
				value.map((option, index) => (
					<Chip key={index} variant="outlined" label={option} />
				))
			}
			renderInput={(params) => (
				<TextField
					{...params}
					variant="outlined"
					label="Autorizzazioni assegnate"
					error={Boolean(errors.profileIds.length > 0)}
					helperText={errors.profileIds}
				/>
			)}
			onChange={handleChangeWrapper}
		/>
	);
}
