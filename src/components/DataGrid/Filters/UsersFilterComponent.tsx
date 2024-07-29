import { Grid, TextField } from "@mui/material";
import React from "react";
import { MAX_LENGHT_LARGE } from "../../../commons/constants";

type Props = {
	filterValues: any;
	handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => void;
};

const UsersFilterComponent = ({ filterValues, handleChange }: Props) => (
	<React.Fragment>
		<Grid item xs={4}>
			<TextField
				id="name"
				name="name"
				label="Nome"
				variant="outlined"
				value={filterValues.name}
				onChange={(e) => handleChange(e, e.target.name)}
				size="small"
				inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "user-name-test" }}
				fullWidth
			/>
		</Grid>
		<Grid item xs={4}>
			<TextField
				id="surname"
				name="surname"
				label="Cognome"
				variant="outlined"
				value={filterValues.surname}
				onChange={(e) => handleChange(e, e.target.name)}
				size="small"
				inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "user-surname-test" }}
				fullWidth
			/>
		</Grid>
		<Grid item xs={4}>
			<TextField
				id="userId"
				name="userId"
				label="Email"
				variant="outlined"
				value={filterValues.userId}
				onChange={(e) => handleChange(e, e.target.name)}
				size="small"
				inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "user-userid-test" }}
				fullWidth
			/>
		</Grid>
		<Grid item xs={4}>
			<TextField
				id="profileIds"
				name="profileIds"
				label="Ruolo"
				variant="outlined"
				value={filterValues.profileIds}
				onChange={(e) => handleChange(e, e.target.name)}
				size="small"
				inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "user-profile-test" }}
				fullWidth
			/>
		</Grid>
		<Grid item xs={4} />
	</React.Fragment>
);

export default UsersFilterComponent;