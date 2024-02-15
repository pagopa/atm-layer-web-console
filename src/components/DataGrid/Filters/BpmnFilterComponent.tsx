import { Grid, TextField, FormControl, MenuItem } from "@mui/material";
import React from "react";

type Props = {
    filterValues: any;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    menuItems: any;
};

const BpmnFilterComponent = ({ filterValues, handleChange, menuItems }: Props) => (
	<React.Fragment>
		<Grid item xs={4}>
			<TextField
				id="functionType"
				name="functionType"
				label="Tipo Funzione"
				variant="outlined"
				value={filterValues.functionType}
				onChange={(e) => handleChange(e)}
				size="small"
				fullWidth 
			/>
		</Grid>
		<Grid item xs={4}>
			<TextField
				id="fileName"
				name="fileName"
				label="Nome File"
				value={filterValues.fileName}
				onChange={(e) => handleChange(e)}
				variant="outlined"
				size="small"
				fullWidth />
		</Grid>
		<Grid item xs={4}>
			<TextField
				id="modelVersion"
				name="modelVersion"
				label="Versione"
				value={filterValues.modelVersion}
				type="number"
				InputProps={{ inputProps: { min: 1 } }}
				onChange={(e) => handleChange(e)}
				variant="outlined"
				fullWidth
				size="small" 
			/>
		</Grid>
		<Grid item xs={4}>
			<TextField
				id="acquirerId"
				name="acquirerId"
				label="Banca"
				placeholder="12345"
				value={filterValues.acquirerId}
				onChange={(e) => handleChange(e)}
				variant="outlined"
				fullWidth
				size="small" 
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
					onChange={(e) => handleChange(e)}
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
	</React.Fragment>
);

export default BpmnFilterComponent;