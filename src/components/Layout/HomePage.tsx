import { AppBar, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { HeaderAccount } from "@pagopa/mui-italia";
import { Header } from "../Header";




function HomePage() {
	
	const theme=useTheme();

	
	return (
		<AppBar position="static" elevation={0} sx={{backgroundColor: theme.palette.background.paper}}>
			
			<Header />
		</AppBar>
      
	);
		
	
		
	
}
export default HomePage;
