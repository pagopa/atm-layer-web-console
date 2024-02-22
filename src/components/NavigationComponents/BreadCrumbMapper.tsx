import { Typography } from "@mui/material";



const BreadCrumbMapper = (list: Array<string | JSX.Element>) => (	

	list.map((item, index) => (
		(<Typography key={index} color={index === list.length - 1 ? "primary" : "text.primary"}>
			{item}
		</Typography>)
	))
	
);

export default BreadCrumbMapper;