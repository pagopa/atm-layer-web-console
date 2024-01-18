import React from "react";
import { Box, useTheme } from "@mui/material";
import getIconBySetType from "../../hook/getIconBySetType";

type Props = {
	icon: string;
	color?: string; 
	size?: string; 
	pad?: number|string; 
	marg?: number|string; 
	border?: boolean; 
	borderRadius?: string;
	bgcolor?: string; 
	transform?: string;  
	disableAction?: boolean; 
	justifyContent?: string; 
	id?: string;
  };

export default function IconBox({ icon, color, size, marg, pad, border, borderRadius, bgcolor,transform, disableAction, id, justifyContent }: Props) {
	const theme = useTheme();
	const { getIcon } = getIconBySetType();

	return (

		<Box m={marg} p={pad}>
			{
				React.createElement(getIcon(icon), {
					style: {
						fontSize: size ? size : "1em",
						color: color ? color : theme.palette.common.black,
						transform: transform? transform : ""
					},
				})
			}
		</Box>
	);
}
