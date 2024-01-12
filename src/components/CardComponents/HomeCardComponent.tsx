import React from "react";
import { Card, CardContent, Typography, Grid, CardActionArea } from "@mui/material";

type Prop = {
	title: string;
	description: string;
	pageLink: string;
};

function HomeCardComponent({ title, description, pageLink }: Prop) {
	return (
		<Grid item xs={6}>
			<Card
				variant="outlined"
				sx={{
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					border: "2px solid blue",
					transition: "background-color 0.3s",
				}}
			>
				<CardActionArea href={pageLink}>
					<CardContent
						sx={{
							"&:hover": {
								backgroundColor: "blue",
								"& .MuiTypography-root": {
									color: "white",
								},
							},
						}}
					>
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
