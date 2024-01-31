import { Typography, Grid, Box, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ActionIcon from "../Commons/ActionIcon";


type Prop = {
	title: string;
	description: string;
	icon: string;
	pageLink: string;
};

const HomeCardComponent = ({ title, description, icon, pageLink }: Prop) => {
	const theme = useTheme();
	const navigate = useNavigate();

	return (
		<Box
			padding={1.8}
			sx={{
				// boxShadow: "0 2px 20px 0 rgba(0,0,0,.1)",
				border: "1px solid" + theme?.palette?.divider,
				boxShadow: theme.shadows[8],
				backgroundColor: theme?.palette?.background?.paper
			}}
			minHeight={"90%"}
			display={"flex"}
			flexDirection={"column"}
			alignItems={"flex-end"}
			justifyContent={"space-between"}
		>
			<Grid container>
				<Grid item xs={12}>
					<Box>
						<ActionIcon icon={icon} color={theme.palette.primary.main} size={"2em"} pad={0} />
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
						data-testId="section-id"
						variant="text"
						size="large"
						onClick={() => navigate(pageLink)}
						sx={{"&:hover": {
							color:theme.palette.primary.main ,
							backgroundColor: "transparent",
						},}}
					>
							VAI ALLA SEZIONE
						<ActionIcon  icon="ArrowForward" color={theme.palette.primary.main} pad={1} />
					</Button>
				</Box>
			</Grid>
		</Box>
	);
};

export default HomeCardComponent;
