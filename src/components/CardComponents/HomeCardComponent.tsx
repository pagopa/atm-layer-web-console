import React from "react";
import { Box, Button, Card, CardActions, CardContent, Typography, Grid } from "@mui/material";
import { Description } from "@mui/icons-material";

type Prop = {
	title: string;
	description: string;
};

function HomeCardComponent({ title, description }: Prop) {
	return (
		<Grid item xs={2}>
			<Card variant="outlined">
				<React.Fragment>
					<CardContent>
						<Typography variant="h5" component="div">
							{title}
						</Typography>
						<Typography sx={{ mb: 1.5 }} color="text.secondary">
							{description}
						</Typography>
					</CardContent>
					<CardActions>
						<Button size="small">Learn More</Button>
					</CardActions>
				</React.Fragment>
			</Card>
		</Grid>
	);
}

export default HomeCardComponent;
