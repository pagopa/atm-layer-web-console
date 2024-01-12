import React from "react";
import { Box, Container, Grid, styled } from "@mui/material";
import HomeCardComponent from "../../components/CardComponents/HomeCardComponent";
import { homePageCardItems } from "../../utils/HomePageCardItems";
import { TitleComponent } from "../../components/TitleComponents/TitleComponent";
import { Header } from "../../components/Header";
import { HomePageTitle } from "../../components/TitleComponents/HomePageTitle";


export const HomePage3 = () => (
	<>
		<Box
			display="flex"
			flexDirection="column"
			width={"100%"}
		>
			<Box marginTop={10} textAlign={"center"}>
				<HomePageTitle
					title={"Console management"}
					subTitle={"Console per la gestione delle risorse"}
				/>
			</Box>
			<Box
				sx={{ height: "50vh" }}
				display={"flex"}
				flexDirection="row"
				justifyContent={"center"}
				alignItems="center"
			>
				<Grid container width={"60%"} justifyContent={"center"}>
					{
						homePageCardItems.map((e, i) => (
							<Grid
								item
								xs={4}
								key={i}
								justifyContent="center"
								paddingX={2}
							>
								<HomeCardComponent
									key={i}
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
	</>
);

export default HomePage3;
