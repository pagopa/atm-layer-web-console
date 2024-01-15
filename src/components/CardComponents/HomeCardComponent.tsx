import React from "react";
import { Card, CardContent, Typography, Grid, CardActionArea, Box, styled, Button, CardActions, ListItemIcon } from "@mui/material";
import { useTheme } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import WidgetsIcon from "@mui/icons-material/Widgets";
import DescriptionIcon from "@mui/icons-material/Description";
import { useNavigate } from "react-router-dom";
import ActionIcon from "../CustomTextField/ActionIcon";


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
				// boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
				boxShadow: "0 2px 20px 0 rgba(0,0,0,.1)",
			}}
			minHeight={"85%"}
			display={"flex"}
			flexDirection={"column"}
			alignItems={"flex-end"}
			justifyContent={"space-between"}
		>
			<Grid container>
				<Grid item xs={12}>
					<Box>
						{getMuiIcon(icon)}
					</Box>
				</Grid>
				<Grid item xs={12}>
					<Box my={1}>
						<Typography variant="h5">
							{title}
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={12}>
					<Box mt={1}>
						<Typography variant="body1">
							{description}
						</Typography>
					</Box>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Box my={1} justifyContent={"flex-end"} display={"flex"}>
					<Button
						variant="naked"
						size="large"
						onClick={() => navigate(pageLink)}
						sx={{"&:hover": {
							color:theme.palette.primary.main ,
							backgroundColor: "transparent",
						},}}
					>
							VAI 
						<ListItemIcon>
							<ActionIcon  icon="ArrowForward" color={theme.palette.primary.main}/>
						</ListItemIcon>
					</Button>
				</Box>
			</Grid>
		</Box>
	);
};

export default HomeCardComponent;
