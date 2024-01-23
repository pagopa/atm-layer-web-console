import { Box, useTheme } from "@mui/material";
import { LogoPagoPACompany } from "@pagopa/mui-italia";

export default function Logo() {
	const theme=useTheme();
	return (
		<Box display="flex" alignItems="center" mr={theme.spacing(2)}>
			<LogoPagoPACompany
				color="default"
				variant="default"
			/>
		</Box>
	);
}
