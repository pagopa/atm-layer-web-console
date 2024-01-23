import { Box, Grid } from "@mui/material";
import HomeCardComponent from "../components/CardComponents/HomeCardComponent";
import { homePageCardItems } from "../utils/HomePageCardItems";
import { HomePageTitle } from "../components/TitleComponents/HomePageTitle";



export default function HomePage () {
	return(
		<Box
			display="flex"
			flexDirection="column"
			// width={"100%"}
			my={5}
			paddingInline={15}
		>
			<Grid container spacing={0.5}>
				<HomePageTitle
					title={"Console management"}
					subTitle={"Console per la gestione delle risorse"}
				/>
			</Grid>
			<Box  my="8%">
				<Grid container spacing={8} >
					{
						homePageCardItems.filter(el=> el.id!=="home").map((e, i) => (
							<Grid item xs={4} mx={"auto"} key={e.title}>
								<HomeCardComponent
									title={e.title}
									description={e.description}
									icon={e.icon}
									pageLink={e.pageLink}
								/>
							</Grid>
						))
					}
				</Grid>
			</Box>
		</Box>
	);
};