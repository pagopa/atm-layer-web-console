import { Grid, TextField } from "@mui/material";
import React from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { ACQUIRER_ID_LENGTH, MAX_LENGHT_LARGE } from "../../../commons/constants";

type Props = {
	filterValues: any;
	handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	handleTimeStampChange:any;
};

const TransactionsFilterComponent = ({ filterValues, handleChange, handleTimeStampChange }: Props) => (
	<React.Fragment>
		<Grid item xs={4}>
			<TextField
				inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "transaction-id-test" }}
				id="transactionId"
				name="transactionId"
				label="ID Transazione"
				variant="outlined"
				value={filterValues.transactionId}
				onChange={(e) => handleChange(e)}
				size="small"
				fullWidth
			/>
		</Grid>
		<Grid item xs={4}>
			<TextField
				inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "transaction-status-test" }}
				id="transactionStatus"
				name="transactionStatus"
				label="Stato"
				value={filterValues.transactionStatus}
				onChange={(e) => handleChange(e)}
				variant="outlined"
				size="small"
				fullWidth />
		</Grid>
		<Grid item xs={4}>
			<TextField
				inputProps={{ "data-testid": "function-type-test" }}
				id="functionType"
				name="functionType"
				label="Funzione"
				value={filterValues.functionType}
				onChange={(e) => handleChange(e)}
				variant="outlined"
				fullWidth
				size="small"
			/>
		</Grid>
		<Grid item xs={4}>
			<TextField
				inputProps={{ maxLength: ACQUIRER_ID_LENGTH, "data-testid": "acquirer-id-test" }}
				id="acquirerId"
				name="acquirerId"
				label="ID Banca"
				value={filterValues.acquirerId}
				onChange={(e) => handleChange(e)}
				variant="outlined"
				fullWidth
				size="small"
			/>
		</Grid>
		<Grid item xs={4}>
			<TextField
				inputProps={{ maxLength: ACQUIRER_ID_LENGTH, "data-testid": "branch-id-test" }}
				id="branchId"
				name="branchId"
				label="ID Filiale"
				value={filterValues.branchId}
				onChange={(e) => handleChange(e)}
				variant="outlined"
				fullWidth
				size="small"
			/>
		</Grid>
		<Grid item xs={4}>
			<TextField
				inputProps={{ maxLength: ACQUIRER_ID_LENGTH, "data-testid": "terminal-id-test" }}
				id="terminalId"
				name="terminalId"
				label="ID Terminale"
				value={filterValues.terminalId}
				onChange={(e) => handleChange(e)}
				variant="outlined"
				fullWidth
				size="small"
			/>
		</Grid>
		<Grid item xs={4}>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DateTimePicker
					views={["year", "month", "day", "hours", "minutes", "seconds"]}
					label="A partire da"
					name="startTime"
					value={filterValues.startTime? new Date(filterValues.startTime) : null}
					onChange={(e) => handleTimeStampChange(e, "startTime")}
					slotProps={{
						field: {
						  readOnly: true
						},
						textField: { fullWidth: true }
					  }}
				/>
			</LocalizationProvider>
		</Grid>
		<Grid item xs={4}>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DateTimePicker
					views={["year", "month", "day", "hours", "minutes", "seconds"]}
					label="Fino a"
					value={filterValues.endTime? new Date(filterValues.endTime) : null}
					onChange={(e) => handleTimeStampChange(e, "endTime")}
					minDateTime={filterValues.startTime? new Date(filterValues.startTime) : undefined}
					slotProps={{
						field: {
						  readOnly: true
						},
						textField: { fullWidth: true }
					  }}
				/>
			</LocalizationProvider>
		</Grid>
		<Grid item xs={4} />
	</React.Fragment>
);

export default TransactionsFilterComponent;