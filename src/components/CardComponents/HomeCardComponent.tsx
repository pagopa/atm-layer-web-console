import React from "react";
import { Card, CardContent, Typography, Grid, CardActionArea, Box } from "@mui/material";
import { useTheme } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import WidgetsIcon from "@mui/icons-material/Widgets";
import DescriptionIcon from "@mui/icons-material/Description";


type Prop = {
	title: string;
	description: string;
	icon:string;
	pageLink: string;
};

function HomeCardComponent({ title, description, icon, pageLink }: Prop) {
	const theme = useTheme();
	function getMuiIcon(iconName:string){
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
		<Grid item xs={10} md={4}>
			<Card
				sx={{
					border: "none",
					borderRadius: "0%",
					boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
					minHeight:"10rem",
					maxHeight:"30rem",
					// "&:hover": {
					// 	backgroundColor: theme.palette.pagoPA.main,
					// 	"& .MuiTypography-root": {
					// 		color: theme.palette.pagoPA.contrastText,
					// 	},
					// },
				}}
			>
				<CardActionArea href={pageLink}>
					<CardContent>
						<Box>
							{getMuiIcon(icon)}
						</Box>
						<Typography
							variant="h6"
							component="div"
							sx={{
								marginBottom: 1,
								color: "inherit",
							}}
						>
							{title}
						</Typography>
						<Typography
							sx={{
								color: "inherit",
							}}
							color="text.secondary"
						>
							{description}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	);
}

export default HomeCardComponent;
