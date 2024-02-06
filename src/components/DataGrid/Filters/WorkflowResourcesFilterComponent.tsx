import { Grid, TextField, FormControl, MenuItem } from "@mui/material";
import React from "react";

type Props = {
    filterValues: any;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => void;
    menuItems: any;
};

const WorkflowResourcesFilterComponent = ({ filterValues, handleChange, menuItems }: Props) => (
	<>
		<Grid item xs={4}>
			<TextField
				id="functionType"
				name="functionType"
				label="Tipo Funzione"
				variant="outlined"
				value={filterValues.functionType}
				onChange={(e) => handleChange(e, e.target.name)}
				size="small"
				fullWidth 
			/>
		</Grid>
		<Grid item xs={4}>
			<FormControl fullWidth>
				<TextField
					id="status"
					name="status"
					value={filterValues.status}
					label="Stato"
					select
					onChange={(e) => handleChange(e, e.target.name)}
					size="small"
				>
					{menuItems.map((item: any) => (
						<MenuItem key={item.value} value={item.value}>
							{item.label}
						</MenuItem>
					))}
				</TextField>
			</FormControl>
		</Grid>
		<Grid item xs={4} />
	</>
);

export default WorkflowResourcesFilterComponent;