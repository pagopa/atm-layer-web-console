import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Divider, Drawer, IconButton, useTheme } from "@mui/material";
import React, { useState } from "react";
import { homePageCard } from "../../utils/homePageCard";
import getIconBySetType from "../../hook/getIconBySetType";
import MenuButtons from "./MenuButtons";



const CustomAppBar = () => {

	const theme = useTheme();

	const { getIcon } = getIconBySetType();
	const [drawerOpen, setDrawerOpen] = useState(false);

	const toggleDrawer = (open: boolean) => (event: any) => {
		if (
			event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setDrawerOpen(open);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" >
				<Toolbar variant="dense" sx={{
					display: {
						xs: "none",
						md: "block"
					}
				}}>
					{homePageCard.map((e, i) => (
						<MenuButtons key={e.title} name={e.title} route={e?.pageLink} iconButton={e.icon}/>
					))
					}
				</Toolbar>
				<Toolbar variant="dense" sx={{
					display: {
						xs: "block",
						md: "none"
					}
				}}>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={toggleDrawer(true)}
						sx={{ mr: 2 }}
					>
						{React.createElement(getIcon("Menu"))}
					  </IconButton>
				</Toolbar>
				<Drawer
					anchor="left"
					open={drawerOpen}
					onClose={toggleDrawer(false)}
				>
					<Box height={1}>
						<IconButton sx={{ mb: 2 }} onClick={toggleDrawer(false)}>
							{React.createElement(getIcon("Close"))}
						</IconButton>
						<Divider sx={{ mb: 2 }} />
						<Box sx={{ mb: 2 }}>
							{homePageCard.map((e, i) => (
								<Box key={i} >
									<MenuButtons key={e.title} name={e.title} route={e?.pageLink} iconButton={e.icon} darkFont={true}/>
								</Box>
							))}
						</Box>
					</Box>
				</Drawer>
			</AppBar>
		</Box>
	);
}; 

export default CustomAppBar;
