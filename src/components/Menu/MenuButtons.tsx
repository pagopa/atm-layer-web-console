import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button, useTheme } from "@mui/material";
import IconBox from "../Commons/IconBox";

type Props = {
	name: string;
	route?: string;
	iconButton?: string;
	darkFont?:boolean;
	setDrawerOpen: any;
};

const MenuButtons = ({ name, route, iconButton, darkFont, setDrawerOpen }: Props) => {
	const theme = useTheme();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
		setDrawerOpen(false);
		return route ? navigate(route) : null;
	};

	return (
		<Button
			startIcon={iconButton&& <IconBox id={"iconMenu_"+name} icon={iconButton} color={darkFont? theme.palette.primary.main : theme.palette.primary.contrastText} size={"1em"} marg={"5px 0 0 0"}/>}
			id={"toolbar-button_" + name}
			aria-controls={open ? "toolbar-menu" : undefined}
			aria-haspopup="true"
			aria-expanded={open ? "true" : undefined}
			onClick={handleClick}
			color={darkFont? undefined : "negative"}
			size="large"
			disableElevation
			variant="text"
		>
			{name}
		</Button>
	);
};

export default MenuButtons;