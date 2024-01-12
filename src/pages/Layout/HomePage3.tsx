import React from "react";
import { Box, Grid } from "@mui/material";
import HomeCardComponent from "../../components/CardComponents/HomeCardComponent";
import { homePageCardItems } from "../../utils/HomePageCardItems";
import { TitleComponent } from "../../components/TitleComponents/TitleComponent";
import { Header } from "../../components/Header";
import { HomePageTitle } from "../../components/TitleComponents/HomePageTitle";


function HomePage3(){
	return (
 
		<>
			<Box>
				<Header bankLogo={""} bankTitle={"titolo"} serviceDescription={"descrizione"} />
			</Box>

			<Box marginTop={10} textAlign={"center"}>
				<HomePageTitle 
					title={"Console management"} 
					subTitle={"Console per la gestione delle risorse"}
				/>
			</Box>
			<Box marginTop={10}>
				<Grid container item xs={12} spacing={12} p={12} alignItems={"center"} justifyContent={"center"}>
					{
						homePageCardItems.map((e, i) => (
							<HomeCardComponent
								key={i}
								title={e.title}
								description={e.description}
								pageLink={e.pageLink}
							/>
						)
						)
					}
				</Grid>
			</Box></>
	);};

export default HomePage3;    