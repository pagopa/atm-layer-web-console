import { FormControl, Grid, MenuItem, TextField } from "@mui/material";
import React from "react";
import { EMPTY_SELECT_VALUE, MAX_LENGHT_LARGE } from "../../../commons/constants";

type Props = {
	filterValues: any;
	handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => void;
};

const ResourcesFilterComponent = ({ filterValues, handleChange }: Props) => {

	const resourceTypes = [
		{ label: EMPTY_SELECT_VALUE, value: "" },
		{ label: "HTML", value: "HTML" },
		{ label: "OTHER", value: "OTHER" }
	];

	return (
		<>
			<Grid item xs={4}>
				<FormControl fullWidth>
					<TextField
						id="noDeployableResourceType"
						name="noDeployableResourceType"
						value={filterValues.noDeployableResourceType}
						label="Tipo di risorsa"
						select
						onChange={(e) => handleChange(e, e.target.name)}
						size="small"
						inputProps={{ "data-testid": "no-deploy-rsc-type-test" }}
					>
						{resourceTypes.map((item: any) => (
							<MenuItem key={item.value} value={item.value}>
								{item.label}
							</MenuItem>
						))}
					</TextField>
				</FormControl>
			</Grid>
			<Grid item xs={4}>
				<TextField
					inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "file-name-test" }}
					id="fileName"
					name="fileName"
					label="Nome file"
					variant="outlined"
					value={filterValues.fileName}
					onChange={(e) => handleChange(e, e.target.name)}
					size="small"
					fullWidth
				/>
			</Grid>
			<Grid item xs={4}>
				<TextField
					inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "storageKey-test" }}
					id="storageKey"
					name="storageKey"
					label="Percorso file"
					variant="outlined"
					value={filterValues.storageKey}
					onChange={(e) => handleChange(e, e.target.name)}
					size="small"
					fullWidth
				/>
			</Grid>
			<Grid item xs={4} />
		</>
	);
};

export default ResourcesFilterComponent;