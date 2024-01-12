import { AppBar } from "@mui/material";
import { Typography, Box } from "@mui/material";
import { HeaderAccount, LogoPagoPACompany, RootLinkType, theme } from "@pagopa/mui-italia";
import Logo from "./HeaderComponents/Logo";
import { HeaderAccountCustom } from "./HeaderComponents/HeaderAccountCustom";

// type HeaderProps = {
//     bankTitle?: string;
//     bankLogo: string;
// 	serviceDescription: string;
// };

export const Header = (/* {
	bankTitle,
	bankLogo,
	serviceDescription
}: HeaderProps */) => (
	<HeaderAccountCustom
		rootLink={{
			element: <LogoPagoPACompany color="default" variant="default" />,
			href: "https://www.pagopa.gov.it/",
			ariaLabel: "Link: vai al sito di PagoPA S.p.A.",
			title: "Sito di PagoPA S.p.A."
		}}
		// enableAssistanceButton
		onAssistanceClick={() => console.log("clicked!")} 
	/>
	// <AppBar position="static" elevation={0} sx={{ backgroundColor: theme.palette.background.paper }}>
	// 	<Box 
	// 		display="flex" 
	// 		flexDirection="row"
	// 		alignItems="center" 
	// 		justifyContent="space-between"
	// 		borderBottom={1}
	// 		borderColor={"divider"}
	// 		minHeight={"3.5em"}
	// 		px={2}
	// 	>
	// 		<Box display="flex" flexDirection="row" alignItems="center">
	// 			<Logo bankLogo={bankLogo} />
	// 			<Box display="flex" alignItems="center">
	// 				<Typography variant="body1" noWrap fontWeight={theme.typography.h6.fontWeight}>
	// 					{bankTitle}
	// 				</Typography>
	// 			</Box>
	// 		</Box>
	// 		<Box display="flex" alignItems="center">
	// 			<Typography
	// 				variant="body1"
	// 				noWrap
	// 			>
	// 				{serviceDescription}
	// 			</Typography>
	// 		</Box>
	// 	</Box>
	// </AppBar>
);