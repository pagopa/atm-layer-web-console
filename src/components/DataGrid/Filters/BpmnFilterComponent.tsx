import { Grid, TextField } from "@mui/material";
import React from "react";
import { ACQUIRER_ID_LENGTH, MAX_LENGHT_LARGE } from "../../../commons/constants";
import StatusFilter from "./StatusFilter";

type Props = {
	filterValues: any;
	handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	handleChangeNumberOnly: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const BpmnFilterComponent = ({ filterValues, handleChange, handleChangeNumberOnly }: Props) => (
	<React.Fragment>
		<Grid item xs={4}>
			<TextField
				inputProps={{ ...MAX_LENGHT_LARGE, "data-testid": "function-type-test" }}
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
				inputProps={{ ...MAX_LENGHT_LARGE, "data-testid": "file-name-test" }}
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
				InputProps={{ inputProps: { min: 1, "data-testid": "model-version-test" } }}
				onChange={(e) => handleChangeNumberOnly(e)}
				variant="outlined"
				fullWidth
				size="small"
			/>
		</Grid>
		<Grid item xs={4}>
			<TextField
				inputProps={{ ...ACQUIRER_ID_LENGTH, "data-testid": "acquirer-id-test" }}
				id="acquirerId"
				name="acquirerId"
				label="Banca"
				placeholder="01234567890"
				value={filterValues.acquirerId}
				onChange={(e) => handleChange(e)}
				variant="outlined"
				fullWidth
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