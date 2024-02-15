import { Grid, TextField, FormControl, MenuItem } from "@mui/material";
import React from "react";
import StatusFilter from "./StatusFilter";

type Props = {
    filterValues: any;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => void;
};

const BpmnFilterComponent = ({ filterValues, handleChange }: Props) => (
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
			<TextField
				id="fileName"
				name="fileName"
				label="Nome File"
				value={filterValues.fileName}
				onChange={(e) => handleChange(e, e.target.name)}
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
				onChange={(e) => handleChange(e, e.target.name)}
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
				onChange={(e) => handleChange(e, e.target.name)}
				variant="outlined"
				fullWidth
				size="small" 
			/>
		</Grid>
		<Grid item xs={4}>
			<StatusFilter filterValues={filterValues} handleChange={handleChange} />
		</Grid>
		<Grid item xs={4} />
	</>
);

export default BpmnFilterComponent;