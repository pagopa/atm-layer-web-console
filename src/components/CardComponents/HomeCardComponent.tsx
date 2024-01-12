import React from "react";
import { Card, CardContent, Typography, Grid, CardActionArea } from "@mui/material";
import { useTheme } from "@emotion/react";

type Prop = {
	title: string;
	description: string;
	pageLink: string;
};

function HomeCardComponent({ title, description, pageLink }: Prop) {
	const theme = useTheme();
	return (
		<Grid item xs={10} md={4}>
			<Card
				sx={{
					border: "none",
					boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add this line for box shadow
					"&:hover": {
						backgroundColor: "#06c",
						"& .MuiTypography-root": {
							color: "white",
						},
					},
				}}
			>
				<CardActionArea href={pageLink}>
					<CardContent>
						<Typography
							variant="h5"
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
