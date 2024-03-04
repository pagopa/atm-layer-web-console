import { Typography, Grid, Box, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ActionIcon from "../Commons/ActionIcon";
import IconBox from "../Commons/IconBox";


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
				border: "1px solid" + theme?.palette?.divider,
				boxShadow: theme.shadows[8],
				backgroundColor: theme?.palette?.background?.paper
			}}
			minHeight={"100%"}
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
						data-testid="section-id"
						variant="text"
						size="large"
						onClick={() => navigate(pageLink)}
						sx={{
							padding: "0px 0px 0px 16px",
							"&:hover": {
								color:theme.palette.primary.main ,
								backgroundColor: "transparent",
								textDecoration:"underline"
							},
						}}
					>
						VAI ALLA SEZIONE
						<IconBox icon={"ArrowForward"} color={theme.palette.primary.main} pad={1} size={"1.2em"} marg={"5px 0px 0px 0px"} />
					</Button>
				</Box>
			</Grid>
		</Box>
	);
};

export default HomeCardComponent;
