import { AppBar, useTheme } from "@mui/material";
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
			<div className="App">
					HOME PAGE
			</div>
			<Footer />
		</>
	);	
};
