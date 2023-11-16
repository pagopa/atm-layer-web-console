import { AppBar, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { HeaderAccount } from "@pagopa/mui-italia";
// import { Header } from "../Header";




function HomePage() {
	const frontend_url = process.env.REACT_APP_URL_FE;
	const theme=useTheme();

	console.log("themeMerged:",theme);

	
	return (
		<AppBar position="static" sx={{backgroundColor: theme.palette.background.paper}}>
			<Toolbar disableGutters>
				<Box  ml={2} mr={1}>
					<Avatar alt="B" src={frontend_url + "/static/media/icons/icon-48x48.png"} sx={{border: theme.customBox?.border, padding: theme.spacing(1) }}>
						
					</Avatar>
				</Box>
				{/* <Box display="flex" > */}
				<Typography
					variant="h6"
					noWrap
					sx={{
						ml: 2,
						color: theme.colorVariant?.main,
						textDecoration: "none",
					}}
				>
                LOGO
				</Typography>
				{/* </Box> */}
					
			</Toolbar>
			{/* <Header enableLogin={false} rootLink={{
				label: "Test",
				href: "",
				ariaLabel: "",
				title: ""
			}} 
			onAssistanceClick={ () => void console.log("test")} 
			/> */}
		</AppBar>
      
	);
		
	
		
	
}
export default HomePage;
