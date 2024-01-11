import React from "react";
import { Grid } from "@mui/material";
import HomeCardComponent from "./HomeCardComponent";

const cardItems=[
	{
		title: "BPMN",
		decription:"accedi alla sezione BPMN"
	},
	{
		title: "Resources",
		description:"accedi alla sezione Resources"
	},
	{
		title: "Workflow Resources",
		decription:"accedi alla sezione Workflow Resources"
	}
];

// function getHomeCard(cardItem){
// 	return <HomeCardComponent title={cardItem.title} description={cardItem.description}/>;
// }

// function HomeCardLayout(){
// 	return (
 
// 		<>
// 			<Grid container item xs={12} >
// 				{
// 					cardItems.map((e, i) => (
// 						<HomeCardComponent
// 							key={i}
// 							title={e.title}
// 							description={e.description}
// 						/>
// 					)
// 					)
// 				}
// 			</Grid></>
// 	);};

// export default HomeCardLayout;    