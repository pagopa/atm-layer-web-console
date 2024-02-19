import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button, useTheme } from "@mui/material";
// import menuOption from "../../hook/menuOption";
import IconBox from "../Commons/IconBox";

type Props = {
	name: string;
	route?: string;
	iconButton?:string;
};

const MenuButtons = ({ name, route, iconButton }: Props) => {
	
	const theme = useTheme();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
		return	route ? navigate(route):null;
	};

	return (
		<React.Fragment>
			<Button
				startIcon={iconButton&& <IconBox id={"iconMenu_"+name} icon={iconButton} color={theme.palette.primary.contrastText} size={"1em"} marg={"5px 0 0 0"}/>}
				id="toolbar-button"
				aria-controls={open ? "toolbar-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
				color="negative"
				size="large"
				disableElevation
				variant="text"
				// endIcon={name !== "Home" && <IconBox id={"iconMenu_"+name} icon="ExpandMore" color={theme.palette.primary.contrastText} size={"1em"} marg={"5px 0 0 0"}/>}
			>
				{name}
			</Button>
		</React.Fragment>
	);
};

export default MenuButtons;