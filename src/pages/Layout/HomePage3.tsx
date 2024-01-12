import React from "react";
import { Grid } from "@mui/material";
import HomeCardComponent from "../../components/CardComponents/HomeCardComponent";
import { homePageCardItems } from "../../utils/HomePageCardItems";


function HomePge3(){
	return (
 
		<>
			<Grid container item xs={12} spacing={12} p={12}>
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
			</Grid></>
	);};

export default HomePge3;    