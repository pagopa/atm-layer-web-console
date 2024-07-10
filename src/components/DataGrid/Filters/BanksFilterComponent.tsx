import React from "react";
import { Grid, TextField, Typography, Box, FormControl, FormHelperText } from "@mui/material";
import { MAX_LENGHT_LARGE } from "../../../commons/constants";

type Props = {
	filterValues: any;
	handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => void;
	handleRateChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	errors: any;
	showErrors: boolean;
};

const BanksFilterComponent = ({ filterValues, handleChange, handleRateChange, errors, showErrors }: Props) => (
	<React.Fragment>
		<Grid item xs={4}>
			<TextField
				id="acquirerId"
				name="acquirerId"
				label="ID Banca"
				variant="outlined"
				value={filterValues.acquirerId}
				onChange={(e) => handleChange(e, e.target.name)}
				size="small"
				inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "bank-acquirerId-test" }}
				fullWidth
			/>
		</Grid>
		<Grid item xs={4}>
			<TextField
				id="denomination"
				name="denomination"
				label="Nome Banca"
				variant="outlined"
				value={filterValues.denomination}
				onChange={(e) => handleChange(e, e.target.name)}
				size="small"
				inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "bank-denomination-test" }}
				fullWidth
			/>
		</Grid>
		<Grid item xs={4}>
			<FormControl fullWidth error={showErrors && (!!errors.rateMin || !!errors.rateMax)}>
				<Grid container alignItems="center" spacing={1}>
					<Grid item xs={5.5}>
						<TextField
							id="rateMin"
							name="rateMin"
							label="Rate Minimo"
							variant="outlined"
							value={filterValues.rateMin}
							onChange={handleRateChange}
							size="small"
							type="number"
							error={showErrors && !!errors.rateMin}
							inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "bank-rateMin-test" }}
							fullWidth
						/>
					</Grid>
					<Grid item xs={1} style={{ textAlign: "center" }}>
						<Typography variant="body1">-</Typography>
					</Grid>
					<Grid item xs={5.5}>
						<TextField
							id="rateMax"
							name="rateMax"
							label="Rate Massimo"
							variant="outlined"
							value={filterValues.rateMax}
							onChange={handleRateChange}
							size="small"
							type="number"
							error={showErrors && !!errors.rateMax}
							inputProps={{ maxLength: MAX_LENGHT_LARGE, "data-testid": "bank-rateMax-test" }}
							fullWidth
						/>
					</Grid>
				</Grid>
				{showErrors && (errors.rateMin || errors.rateMax) && (
					<FormHelperText style={{ textAlign: "center" }}>{errors.rateMin || errors.rateMax}</FormHelperText>
				)}
			</FormControl>
		</Grid>
		<Grid item xs={4} />
	</React.Fragment>
);

export default BanksFilterComponent;
