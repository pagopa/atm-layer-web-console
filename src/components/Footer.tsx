import { Box, Button, Container, Grid, Typography, useTheme } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export const Footer = () => {
	const theme = useTheme();
	const borderBottons = { borderRadius: theme.shape.borderRadius, margin: theme.spacing(1)};
	const footerTouch: boolean = false;

	const touchFooter = (
		<><Box mx={3}>
			<Button
				color="primary"
				size="large"
				startIcon={<ArrowBackIcon />}
				variant="outlined"
				sx={borderBottons}
				onClick={() => console.log("Bottone premuto")}
			>
				Indietro
			</Button>
		</Box><Box>
			<Button
				color="error"
				size="large"
				startIcon={<LogoutIcon />}
				variant="outlined"
				sx={borderBottons}
				onClick={() => console.log("Bottone premuto")}
			>
					Esci
			</Button>
		</Box></>
	);

	const manualFooter = (
		<Grid container ml={2} >
		  <Grid item xs={5} width="100%" >
				<Button
					size="large"
					startIcon={<ChevronLeftIcon color="primary" />}
					variant="outlined"
					onClick={() => console.log("Bottone premuto")}
					// fix: doesn't take the theme color for borderColor
					style={{ color: "black", width: "100%", borderColor: theme.colorVariant?.customBorderColor, justifyContent: "flex-start" }}
				>
			  		Indietro
				</Button>
		  </Grid>
		</Grid>
	  );

	return (
		<Box component="footer" borderTop={1} borderColor={footerTouch ? "divider" : "transparent" } style={{backgroundColor: footerTouch ? "background.paper" : "#fafafa"}}>
			<Box
				display="flex"
				flexDirection="row"
				alignItems="center"
				maxWidth={"false"}
				py={{ xs: 3, md: 2 }}
				mr={{ xs: 0, md: 3 }} 

			>
				{ footerTouch ? touchFooter : manualFooter }
			</Box>
		</Box>
	);
};
