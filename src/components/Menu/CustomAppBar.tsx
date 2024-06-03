import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useContext } from "react";
import { homePageCard } from "../../utils/homePageCard";
import { getProfileDescriptionFromStorage, getProfileIdsArray, getRoleDescriptionsByUser } from "../Commons/Commons";
import { EMULATOR, LETTURA, RILASCIO, SCRITTURA, UTENTI } from "../../commons/constants";
import { Ctx } from "../../DataContext";
import MenuButtons from "./MenuButtons";

const CustomAppBar = () => {

	const { loggedUserInfo } = useContext(Ctx);

	const userProfileIds = getProfileIdsArray(loggedUserInfo);

	const isCardVisible = (cardId: string) => {
		const visibilityRules: { [key: string]: Array<number> } = {
		  	home: [LETTURA,SCRITTURA,RILASCIO,EMULATOR,UTENTI],
			process: [LETTURA,SCRITTURA,RILASCIO],
			static: [LETTURA,SCRITTURA],
			workflow: [LETTURA,SCRITTURA,RILASCIO],
		 	users: [UTENTI],
		};

		if (!visibilityRules[cardId]) {
		  return true;
		}
	
		return visibilityRules[cardId].some((profileDescription) => userProfileIds?.includes(profileDescription));
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" >
				<Toolbar variant="dense">

					{homePageCard
						.filter(el => el.id && isCardVisible(el.id))
						.map((e) => (
							<MenuButtons key={e.title} name={e.title} route={e?.pageLink} iconButton={e.icon}/>
						))
					}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default CustomAppBar;
