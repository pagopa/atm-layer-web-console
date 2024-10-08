import React from "react";
import { Grid, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { it } from "date-fns/locale";
import { ACQUIRER_ID_LENGTH, MAX_LENGHT_LARGE } from "../../../commons/constants";

type Props = {
  filterValues: any;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleTimeStampChange: any;
  clearError: boolean;
  setClearError: React.Dispatch<React.SetStateAction<boolean>>;
};

const TransactionsFilterComponent = ({ filterValues, handleChange, handleTimeStampChange, clearError, setClearError }: Props) => {
	const [error, setError] = React.useState<string | null>(null);

	const validateDateRange = (startTime: Date | null, endTime: Date | null) => {
		if (!startTime || !endTime) {
			return;
		}

		const startTimeInMillis = new Date(startTime).getTime();
		const endTimeInMillis = new Date(endTime).getTime();

		if (startTimeInMillis - endTimeInMillis > 0) {
			setError("minDate");
		} else {
			setError(null);
		}
	};

	const handleStartTimeChange = (e: any) => {
		const newStartTime = e;
		handleTimeStampChange(newStartTime, "startTime");
		validateDateRange(newStartTime, filterValues.endTime);
	};

	const handleEndTimeChange = (e: any) => {
		const newEndTime = e;
		const endTimeWithMargin = handleTimeStampChange(newEndTime, "endTime");
		validateDateRange(filterValues.startTime, endTimeWithMargin);
	};

	React.useEffect(() => {
		if (clearError) {
			setError(null);
			setClearError(false);
		}
	}, [clearError]);

	const errorMessage = error === "minDate" ? "Selezionare una data/ora successiva a quella di partenza" : "";

	const isSameDay = (date1: Date, date2: Date) => (
		date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
	);

	return (
		<React.Fragment>
			<Grid item xs={4}>
				<TextField
					inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "transaction-id-test" }}
					id="transactionId"
					name="transactionId"
					label="ID Transazione"
					variant="outlined"
					value={filterValues.transactionId}
					onChange={handleChange}
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
					onChange={handleChange}
					variant="outlined"
					size="small"
					fullWidth
				/>
			</Grid>
			<Grid item xs={4}>
				<TextField
					inputProps={{ "data-testid": "function-type-test" }}
					id="functionType"
					name="functionType"
					label="Funzione"
					value={filterValues.functionType}
					onChange={handleChange}
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
					onChange={handleChange}
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
					onChange={handleChange}
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
					onChange={handleChange}
					variant="outlined"
					fullWidth
					size="small"
				/>
			</Grid>
			<Grid item xs={4}>
				<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={it}>
					<DateTimePicker
						views={["year", "month", "day", "hours", "minutes", "seconds"]}
						label="A partire da"
						name="startTime"
						value={filterValues.startTime ? new Date(filterValues.startTime) : null}
						onChange={handleStartTimeChange}
						format="dd/MM/yyyy HH:mm:ss"
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
				<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={it}>
					<DateTimePicker
						views={["year", "month", "day", "hours", "minutes", "seconds"]}
						label="Fino a"
						value={filterValues.endTime ? new Date(filterValues.endTime) : null}
						minDateTime={
							filterValues.startTime && filterValues.endTime && isSameDay(new Date(filterValues.startTime), new Date(filterValues.endTime))
								? new Date(new Date(filterValues.startTime).getTime() + 5000)
								: filterValues.startTime
									? new Date(filterValues.startTime)
									: undefined
						}
						onChange={handleEndTimeChange}
						format="dd/MM/yyyy HH:mm:ss"
						slotProps={{
							field: {
								readOnly: true
							},
							textField: {
								fullWidth: true,
								helperText: errorMessage,
								error: !!errorMessage
							}
						}}
					/>
				</LocalizationProvider>
			</Grid>
			<Grid item xs={4} />
		</React.Fragment>
	);
};

export default TransactionsFilterComponent;
