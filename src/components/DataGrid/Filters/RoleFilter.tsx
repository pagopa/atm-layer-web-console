import { useContext } from "react";
import { FormControl, TextField, MenuItem } from "@mui/material";
import { Ctx } from "../../../DataContext";

type Prop = {
  filterValues: any;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string, value: any) => void;
};

const RoleFilter = ({ filterValues, handleChange }: Prop) => {
	const { profilesAvailable } = useContext(Ctx);

	const menuItems = profilesAvailable.map((profile: { description: any; profileId: any }) => ({
		label: profile.description,
		value: profile.profileId, 
	}));


	const menuItemsWithDefault = [
		{ label: "NON DEFINITO", value: "" },
		...menuItems
	];

	return (
		<FormControl fullWidth>
			<TextField
				id="profileId"
				name="profileId"
				value={filterValues.profileId}
				label="Atorizzazione"
				select
				onChange={(e) => handleChange(e, e.target.name, e.target.value)}
				size="small"
				inputProps={{ "data-testid": "profileId-test" }}
			>
				{menuItemsWithDefault.map((item, index) => (
					<MenuItem key={index} value={item.value}>
						{item.label}
					</MenuItem>
				))}
			</TextField>
		</FormControl>
	);
};

export default RoleFilter;
