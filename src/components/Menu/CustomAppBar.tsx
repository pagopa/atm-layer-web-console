import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useContext } from "react";
import { homePageCard } from "../../utils/homePageCard";
import { Ctx } from "../../DataContext";
import { getRoleIdsByUser } from "../Commons/Commons";
import MenuButtons from "./MenuButtons";

const CustomAppBar = () => {

	const { loggedUserInfo } = useContext(Ctx);

	const userProfileIds = getRoleIdsByUser(loggedUserInfo);

	const isCardVisible = (cardId: string) => {
		const visibilityRules: { [key: string]: Array<number> } = {
		  users: [5],
		};

		if (!visibilityRules[cardId]) {
		  return true;
		}
	
		return visibilityRules[cardId].some((profileId) => userProfileIds.includes(profileId));
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
