import { Grid, TextField } from "@mui/material";
import React from "react";
import StatusFilter from "./StatusFilter";

type Props = {
	filterValues: any;
	handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const BpmnFilterComponent = ({ filterValues, handleChange }: Props) => (
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
				inputProps={{
					"data-testid": "function-type-test"
				}}
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
				inputProps={{
					"data-testid": "file-name-test"
				}}
				fullWidth />
		</Grid>
		<Grid item xs={4}>
			<TextField
				id="modelVersion"
				name="modelVersion"
				label="Versione"
				value={filterValues.modelVersion}
				type="number"
				InputProps={{ inputProps: { min: 1, "data-testid": "model-version-test" } }}
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
				inputProps={{
					"data-testid": "acquirer-id-test"
				}}
				size="small"
			/>
		</Grid>
		<Grid item xs={4}>
			<StatusFilter filterValues={filterValues} handleChange={handleChange} />
		</Grid>
		<Grid item xs={4} />
	</React.Fragment>
);

export default BpmnFilterComponent;