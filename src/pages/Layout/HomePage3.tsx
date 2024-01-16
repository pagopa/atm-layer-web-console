import React from "react";
import { Box, Grid } from "@mui/material";
import HomeCardComponent from "../../components/CardComponents/HomeCardComponent";
import { homePageCardItems } from "../../utils/HomePageCardItems";
import { HomePageTitle } from "../../components/TitleComponents/HomePageTitle";


export const HomePage3 = () => (
	<Box
		display="flex"
		flexDirection="column"
		width={"100%"}
		mx={20}
		my={5}
	>
		<Grid container spacing={0.5}>
			<HomePageTitle
				title={"Console management"}
				subTitle={"Console per la gestione delle risorse"}
			/>
			<Grid item xs={12} marginTop={8}>
				<Box
					// sx={{ height: "50vh" }}
					// display={"flex"}
					// flexDirection="row"
					// justifyContent={"center"}
					// alignItems="center"
				>

					<Grid container spacing={2}>
						{
							homePageCardItems.map((e, i) => (
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
			</Grid>
		</Grid>
	</Box>
);

export default HomePage3;
