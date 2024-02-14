import React from "react";
import { Typography } from "@mui/material";



const BreadCrumbMapper = (items: Array<string | JSX.Element>) => (	

	items.map((item, index) => (
		(<Typography key={index} color={index === items.length - 1 ? "primary" : "text.primary"}>
			{item}
		</Typography>)
	))
	
);

export default BreadCrumbMapper;