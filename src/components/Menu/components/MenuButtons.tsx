import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Options, filterOptionsByLabel, menuOptionsButton } from "../../../utils/MenuOptions";
import menuOption from "../../../utils/menuOption";

type Props = {
	name: string;
	route?: string;
};

const MenuButtons = ({ name, route }: Props) => {
	const { getMenuOptions } = menuOption();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		route ? navigate(route) : null;
		setAnchorEl(event.currentTarget);
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
				id="fade-button"
				aria-controls={open ? "fade-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
				color="inherit"
				size="large"
				disableRipple
			>
				{name}
			</Button>
			{
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
			}
		</>
	);
};

export default MenuButtons;