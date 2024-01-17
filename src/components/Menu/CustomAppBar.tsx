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
		console.log("location",Object.values(location), routes);
	},[location]);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" >
				<Toolbar variant="dense">
					{location.pathname !== "/" && <MenuButtons name={"Home"} route={routes.HOME} iconButton={"HomeOutlined"}/>}
					{location.pathname !== routes.BPMN && <MenuButtons name={"Processi"} route={routes.BPMN} iconButton={"AccountTree"}/>}
					{location.pathname !== routes.RESOURCES && <MenuButtons name={"Risorse statiche"} route={routes.RESOURCES} iconButton={"Description"}/>}
					{location.pathname !== routes.WORKFLOW_RESOURCES && <MenuButtons name={"Risorse per processi"} route={routes.WORKFLOW_RESOURCES} iconButton="Widgets"/>}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default CustomAppBar;
