import { AppBar, Box, Button, Card, CardActions, CardContent, Grid, Typography, useTheme } from "@mui/material";
import React from "react";

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
			<Box className="App" mt={5} ml={5} >
				<Box>
					<Typography  variant="h1" textAlign={"start"}> A quale servizio vuoi accedere? </Typography>
					<Typography 
						mt={2}
						variant="h6" 
						noWrap 
						fontWeight={theme.typography.body2.fontWeight} 
						color={"text.secondary"} 
						textAlign={"start"}
				 > 
				 	Puoi effettuare pagamenti verso la PA e gestire le tue iniziative di welfare. 
				 </Typography>
				</Box>
			</Box>
			<Footer />
		</>
	);	
};
