import React from "react";
import { Box, useTheme } from "@mui/material";
import getIconBySetType from "../../hook/getIconBySetType";

type Props = {
	icon: string;
	color?: string; 
	size?: string; 
	action?: React.MouseEvent;
	pad?: number; 
	border?: boolean; 
	borderRadius?: string;
	bgcolor?: string; 
	transform?: string;  
	disableAction?: boolean; 
	justifyContent?: string; 
	id?: string;
  };

export default function ActionIcon({ icon, color, size, action, pad, border, borderRadius, bgcolor,transform, disableAction, id, justifyContent }: Props) {
	const theme = useTheme();
	const { getIcon } = getIconBySetType();

	return (

		<Box>
			{
				React.createElement(getIcon(icon), {
					style: {
						fontSize: size ? size : "0.8em",
						color: color ? color : theme.palette.common.black,
						transform: transform? transform : ""
					},
				})
			}
		</Box>
	);
}
