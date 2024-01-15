import React from "react";
import { Card, CardContent, Typography, Grid, CardActionArea, Box, styled, Button, CardActions } from "@mui/material";
import { useTheme } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import WidgetsIcon from "@mui/icons-material/Widgets";
import DescriptionIcon from "@mui/icons-material/Description";
import { useNavigate } from "react-router-dom";


type Prop = {
	title: string;
	description: string;
	icon: string;
	pageLink: string;
};

const HomeCardComponent = ({ title, description, icon, pageLink }: Prop) => {
	const theme = useTheme();
	const navigate = useNavigate();
	function getMuiIcon(iconName: string) {
		switch (iconName) {
		case "AccountTreeIcon":
			return <AccountTreeIcon />;
		case "WidgetsIcon":
			return <WidgetsIcon />;
		case "DescriptionIcon":
			return <DescriptionIcon />;
		default:
			return <></>;
		}
	}

	return (
		<Box
			padding={2}
			sx={{
				border: "none",
				borderRadius: 2,
				boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
			}}
			height={"100%"}
			display={"flex"}
			flexDirection={"column"}
			alignItems={"start"}
			justifyContent={"space-around"}
		>
			<Box
				display={"flex"}
				flexDirection={"row"}
				alignItems={"center"}
			>
				{getMuiIcon(icon)}
				<Typography
					variant="h4"
					component="div"
					sx={{
						color: "inherit",
						marginLeft: 1
					}}
				>
					{title}
				</Typography>
			</Box>
			<Typography
				sx={{
					color: "inherit",
				}}
				color="text.secondary"
			>
				{description}
			</Typography>
			<Button
				variant="naked"
				size="large"
				sx={{ paddingX: 0 }}
				onClick={() => navigate(pageLink)} 
			>
				Click
			</Button>
		</Box>
	);
};

export default HomeCardComponent;
