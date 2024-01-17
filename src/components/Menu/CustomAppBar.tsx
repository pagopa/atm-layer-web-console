import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import routes from "../../routes";
import MenuButtons from "./MenuButtons";

const CustomAppBar = () => {

	const location = useLocation();

	useEffect(() => {
		console.log("location",location, routes);
	},[location]);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" >
				<Toolbar variant="dense">
					{location.pathname !== "/" && <MenuButtons name={"Home"} route={"/"} />}
					{location.pathname !== routes.BPMN && <MenuButtons name={"BPMN"} />}
					{location.pathname !== routes.RESOURCES && <MenuButtons name={"Resources"} />}
					{location.pathname !== routes.WORKFLOW_RESOURCES && <MenuButtons name={"WorkFlow Resource"} />}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default CustomAppBar;
