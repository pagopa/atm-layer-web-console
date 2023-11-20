import { Box, useTheme } from "@mui/material";
import { TouchFooter } from "./FooterComponents/TouchFooter";
import { ManualFooter } from "./FooterComponents/ManualFooter";

export const Footer = () => {
	const theme = useTheme();
	const footerTouch: boolean = false;

	const backButton = () => console.log("Bottone indietro");	

	return (
		<Box 
			component="footer" 
			borderTop={1} 
			borderColor={footerTouch ? "divider" : "transparent" } 
			style={{backgroundColor: theme.palette.background.paper, position: "absolute", bottom: 0, width: "100%"}}
		>
			<Box
				display="flex"
				flexDirection="row"
				alignItems="center"
				maxWidth={"false"}
				py={3}
				mr={0}
			>
				{ footerTouch ? 
					<TouchFooter backButton={backButton}/> : 
					<ManualFooter backButton={backButton}/> }
			</Box>
		</Box>
	);
};
