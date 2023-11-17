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

	console.log("themeMerged:",theme);

	
	return (
		<Box className="App-header">
			<h1>ATM Layer Console</h1>
			<a
				className="App-link"
				href="https://reactjs.org"
				target="_blank"
				rel="noopener noreferrer"
			>
		Learn React
			</a></Box>
	);
		
	
		
	
}
export default HomePage;
