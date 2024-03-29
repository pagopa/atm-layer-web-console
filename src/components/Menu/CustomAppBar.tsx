import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { homePageCard } from "../../utils/homePageCard";
import MenuButtons from "./MenuButtons";

const CustomAppBar = () => (
	<Box sx={{ flexGrow: 1 }}>
		<AppBar position="static" >
			<Toolbar variant="dense">

				{homePageCard.map((e, i) => (
					<MenuButtons key={e.title} name={e.title} route={e?.pageLink} iconButton={e.icon}/>
				))
				}
			</Toolbar>
		</AppBar>
	</Box>
);

export default CustomAppBar;
