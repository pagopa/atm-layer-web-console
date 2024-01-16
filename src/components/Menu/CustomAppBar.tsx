import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import routes from "../../routes";
import MenuButtons from "./components/MenuButtons";

const  CustomAppBar = () => (
	<Box sx={{ flexGrow: 1 }}>
		<AppBar position="static" sx={{ py: 1 }}>
			<Toolbar variant="dense">
				<MenuButtons name={"Home"} route={"/"} />
				<MenuButtons name={"BPMN"}/>
				<MenuButtons name={"Resources"}/>
				<MenuButtons name={"WorkFlow Resource"}/>
			</Toolbar>
		</AppBar>
	</Box>
);

export default CustomAppBar;
