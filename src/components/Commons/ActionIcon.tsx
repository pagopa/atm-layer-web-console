import React from "react";
import { IconButton, useTheme } from "@mui/material";
import getIconBySetType from "../../hook/getIconBySetType";

type Props = {
	icon: string;
	color?: string; 
	size?: string; 
	action?: React.MouseEventHandler;
	pad?: number; 
	border?: boolean; 
	borderRadius?: string;
	bgcolor?: string; 
	transform?: string;  
	disableAction?: boolean; 
	justifyContent?: string; 
	id?: string;
  };

export default function ActionIcon({ icon, color, size, action, pad, transform, disableAction, id }: Props) {
	const theme = useTheme();
	const { getIcon } = getIconBySetType();

	return (
		
		<IconButton 
		    data-testId="iconButton-id"
			id={id} 
			color="primary" 
			aria-label={id} 
			style={{ padding: pad, borderRadius: 0, pointerEvents: "none" }} 
			 	disabled={disableAction ?? false}
			onClick={()=>action}
			disableRipple
				 >
		
			{
				React.createElement(getIcon(icon), {
					style: {
						fontSize: size ?? "0.8em",
						color: color ?? theme.palette.common.black,
						transform: transform ?? ""
					},
				})
			}
		</IconButton>
		
	);
}
