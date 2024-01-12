import { Box } from "@mui/material";
import { LogoPagoPACompany, theme } from "@pagopa/mui-italia";

type Props = {
	bankLogo: string;
};

export default function Logo({ bankLogo }: Props) {

	return (
		<Box display="flex" alignItems="center" mr={theme.spacing(2)}>
			<LogoPagoPACompany
				color="default"
				variant="default"
			/>
		</Box>
	);
}
