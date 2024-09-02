import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useContext, useState } from "react";
import { IconButton, Drawer, Divider } from "@mui/material";
import React from "react";
import { homePageCard } from "../../utils/homePageCard";
import { getProfileIdsArray } from "../Commons/Commons";
import { BANCHE, EMULATOR, LETTURA, RILASCIO, SCRITTURA, TRANSAZIONI, UTENTI } from "../../commons/constants";
import { Ctx } from "../../DataContext";
import getIconBySetType from "../../hook/getIconBySetType";
import MenuButtons from "./MenuButtons";

const CustomAppBar = () => {

	const { loggedUserInfo } = useContext(Ctx);
	const userProfileIds = getProfileIdsArray(loggedUserInfo);
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

	const isCardVisible = (cardId: string) => {
		const visibilityRules: { [key: string]: Array<number> } = {
		  	home: [LETTURA,SCRITTURA,RILASCIO,EMULATOR,TRANSAZIONI,BANCHE],
			process: [LETTURA,SCRITTURA,RILASCIO],
			static: [LETTURA,SCRITTURA],
			workflow: [LETTURA,SCRITTURA,RILASCIO],
		 	users: [UTENTI],
			transactions: [TRANSAZIONI],
			banks: [BANCHE],
		};

		if (!visibilityRules[cardId]) {
		  return true;
		}
	
		return visibilityRules[cardId].some((profileDescription) => userProfileIds?.includes(profileDescription));
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" >
				<Toolbar variant="dense"
					sx={{
						display: {
							xs: "none",
							md: "block"
						}
					}}>

					{homePageCard
						.filter(el => el.id && isCardVisible(el.id))
						.map((e) => (
							<MenuButtons key={e.title} name={e.title} route={e?.pageLink} iconButton={e.icon} setDrawerOpen={setDrawerOpen}/>
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
							{homePageCard
								.filter(el => el.id && isCardVisible(el.id))
								.map((e, i) => (
									<Box key={i} >
										<MenuButtons key={e.title} name={e.title} route={e?.pageLink} iconButton={e.icon} darkFont={true} setDrawerOpen={setDrawerOpen}/>
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
