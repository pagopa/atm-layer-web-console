import { AppBar } from "@mui/material";
import { HeaderAccount } from "@pagopa/mui-italia";
import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";


const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function HomePage() {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

	
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	
	return (
		<AppBar position="static">
			{/* <Container maxWidth="xs"> */}
			<Toolbar disableGutters>
				<Box sx={{ flexGrow: 0 }} ml={2}>
					<Tooltip title="Open settings">
						<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
							<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
						</IconButton>
					</Tooltip>
						
				</Box>
				<Typography
					variant="h6"
					noWrap
					component="a"
					href="#app-bar"
					sx={{
						ml: 2,
						display: { xs: "none", md: "flex" },
						fontFamily: "monospace",
						fontWeight: 700,
						letterSpacing: ".3rem",
						color: "inherit",
						textDecoration: "none",
					}}
				>
                LOGO
				</Typography>
    
				
					
				<Typography
					variant="h5"
					noWrap
					component="a"
					href="#app-bar-mobile"
					sx={{
						ml: 2,
						display: { xs: "flex", md: "none" },
						flexGrow: 1,
						fontFamily: "monospace",
						fontWeight: 700,
						letterSpacing: ".3rem",
						color: "inherit",
						textDecoration: "none",
					}}
				>
                LOGO
				</Typography>
			
    
					
			</Toolbar>
			{/* </Container> */}
		</AppBar>
      
	);
		
	
		
	
}
