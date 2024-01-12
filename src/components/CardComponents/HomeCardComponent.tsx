import React from "react";
import { Card, CardContent, Typography, Grid, CardActionArea } from "@mui/material";

type Prop = {
	title: string;
	description: string;
	pageLink: string;
};

function HomeCardComponent({ title, description, pageLink }: Prop) {
	return (
		<Grid item xs={2} >
			<Card variant="outlined">
				<CardActionArea href={pageLink}>
					<CardContent>
						<Typography variant="h5" component="div">
							{title}
						</Typography>
						<Typography sx={{ mb: 1.5 }} color="text.secondary">
							{description}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	);
}

export default HomeCardComponent;
