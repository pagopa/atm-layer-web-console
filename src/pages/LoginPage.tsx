import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { Ctx } from "../DataContext";


const LoginPage = () => {
	const { logged } = useContext(Ctx);
	

	return(
		<Box m={1} p={1}>
			<Typography variant="h4">Accedi alla console</Typography>
		</Box>
	);
};

export default LoginPage;