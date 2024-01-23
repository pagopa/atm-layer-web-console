import { Box } from "@mui/material";
import React from "react";


type Prop= {
	children: React.ReactNode;
};

function FormPageTemplate({ children }: Prop) {
	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
		>
			{children}
		</Box>
	);
}

export default FormPageTemplate;
