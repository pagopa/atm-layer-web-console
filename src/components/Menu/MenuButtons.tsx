import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Fade, Menu, MenuItem, useTheme } from "@mui/material";
import menuOption from "../../hook/menuOption";
import IconBox from "../Commons/IconBox";

type Props = {
	name: string;
	route?: string;
	iconButton?:string;
};

const MenuButtons = ({ name, route, iconButton }: Props) => {
	const { getMenuOptions } = menuOption();
	const theme = useTheme();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
		return	route ? navigate(route):null;
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleOptionClick = (onClick: () => void) => {
		onClick();
		handleClose();
	};

	return (
		<>
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
			{/* {
				name !== "Home" && (
					<Menu
						id="fade-menu"
						MenuListProps={{
							"aria-labelledby": "fade-button",
						}}
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						TransitionComponent={Fade}
					>

						{getMenuOptions(name).map((options: any, i: React.Key | null | undefined) => (
							<MenuItem key={i} onClick={() => handleOptionClick(options.onClick)}>
								{options.label}
							</MenuItem>
						))}
					</Menu>
				)
			} */}
		</>
	);
};

export default MenuButtons;