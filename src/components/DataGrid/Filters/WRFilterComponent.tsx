import { Grid, TextField, FormControl, MenuItem } from "@mui/material";
import React from "react";
import { MAX_LENGHT_LARGE } from "../../../commons/constants";
import StatusFilter from "./StatusFilter";

type Props = {
	filterValues: any;
	handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => void;
};

const WRFilterComponent = ({ filterValues, handleChange }: Props) => {

	const resourceItems = [
		{ label: "Stato", value: "" },
		{ label: "BPMN", value: "BPMN" },
		{ label: "DMN", value: "DMN" },
		{ label: "FORM", value: "FORM" }
	];

	return (
		<>
			<Grid item xs={4}>
				<FormControl fullWidth>
					<TextField
						id="resourceType"
						name="resourceType"
						value={filterValues.resourceType}
						label="Tipo di risorsa"
						select
						onChange={(e) => handleChange(e, e.target.name)}
						size="small"
						InputProps={{ inputProps: { "data-testid": "resource-type-test" } }}
					>
						{resourceItems.map((item: any) => (
							<MenuItem key={item.value} value={item.value}>
								{item.label}
							</MenuItem>
						))}
					</TextField>
				</FormControl>
			</Grid>
			<Grid item xs={4}>
				<TextField
					id="fileName"
					name="fileName"
					label="Nome file"
					variant="outlined"
					value={filterValues.fileName}
					onChange={(e) => handleChange(e, e.target.name)}
					size="small"
					inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "file-name-test" }}
					fullWidth
				/>
			</Grid>
			<Grid item xs={4}>
				<StatusFilter filterValues={filterValues} handleChange={handleChange} />
			</Grid>
			<Grid item xs={4} />
		</>
	);
};

export default WRFilterComponent;