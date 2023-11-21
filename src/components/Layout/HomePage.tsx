import {Box, Button, Card, CardActions, CardContent, Grid, IconButton, Typography, useTheme } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { LogoPagoPAProduct } from "@pagopa/mui-italia/dist/assets/LogoPagoPAProduct";
import { Header } from "../Header";
import { getCompletePathImage } from "../../utils/Commons";
import { Footer } from "../Footer";

export const HomePage = () => {
	
	const theme = useTheme();

	return (
		<>
			<Header 
				bankTitle="Test" 
				bankLogo={getCompletePathImage("icon-48x48.png")} 
				serviceDescription="Servizi di pubblica utilità" 
			/>
			<Box className="App" mt={3} ml={3} >
				<Box>
					<Typography  variant="h5" textAlign={"start"}> A quale servizio vuoi accedere? </Typography>
					<Typography 
						mt={1}
						variant="subtitle2" 
						noWrap 
						fontWeight={theme.typography.body2.fontWeight} 
						color={"text.secondary"} 
						textAlign={"start"}
				 > 
				 	Puoi effettuare pagamenti verso la PA e gestire le tue iniziative di welfare. 
				 </Typography>
				</Box>
				<Box mt={2}>
					<Grid container my={2} xs={3.5} padding={"8px"}>
						<Card
							style={{ 
								width: "100%", 
								border: theme.cardStyle?.border,
								borderColor: "lightgrey",
								borderRadius: "8px",
							}}>
							<CardContent sx={{ pt: "16px", pb: "8px", px: "16px"}}>
								<Typography variant="h6" gutterBottom>
        						Paga un avviso pagoPA
								</Typography>
								
							</CardContent>
							<CardActions sx={{ pt: "0px", pb: "16px", px: "16px"}}>
								<Grid item xs={6} alignContent="center">
									<Box textAlign="start" sx={{ pt: "12px" }}>
										<LogoPagoPAProduct color="default" title={""} size={32} />
									</Box>
								</Grid>
								<Grid item xs={6} alignContent="center">
									<Box textAlign="end"><IconButton size="small"> 
										<ArrowForwardIosIcon fontSize="small" color="primary" />
									</IconButton> </Box>
								</Grid>
							</CardActions>
						</Card>
					</Grid>
				</Box>
			</Box>
			<Footer />
		</>
	);	
};
