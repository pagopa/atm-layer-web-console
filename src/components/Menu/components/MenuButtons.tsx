import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Options, menuOptionsButton } from "../../../utils/MenuOptions";

type Props = {
	name: string;
	route?: string;
};

const MenuButtons = ({ name, route }: Props) => {

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

	const filterOptionsByLabel = (inputLabel: string): Array<Options> =>
		// filter option for label
		menuOptionsButton.filter((optionsGroup, i) => {
			const firstOptionLabel = optionsGroup.options[i].label || "";
			return firstOptionLabel.includes(inputLabel);
		});

	const handleOptionClick = (onClick: () => void) => {
		onClick();
		handleClose();
	};

	return (
		<div>
			<Button
				id="fade-button"
				aria-controls={open ? "fade-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
				color="inherit"
				size="large"
			>
				{name}
			</Button>
			{
				name !== "Home" ? (
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
						{filterOptionsByLabel(name).map((optionsGroup, i) => (
							<div key={i}>
								{optionsGroup.options.map((option, j) => (
									<MenuItem key={j} onClick={() => handleOptionClick(option.onClick)}>
										{option.label}
									</MenuItem>
								))}
							</div>
						))}
					</Menu>
				) : null
			}
		</div>
	);
};

export default MenuButtons;