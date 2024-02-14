/* eslint-disable functional/no-let */
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Ctx } from "../DataContext";
import routes from "../routes";


const LoginPageCallback = () => {
	const { logged, setLogged } = useContext(Ctx);
	const navigate = useNavigate();

	useEffect(() => {
		const token=window?.location?.hash?.split("&")[1]?.split("=")[1];
		if(token && logged===false) {
			setLogged(true);
			localStorage.setItem("jwt", token);
			navigate(routes.HOME);
		}
	}, []);

	return(
		<Box m={1} p={1}>
			<Typography variant="h4">Benvenuto!</Typography>
		</Box>		
	);
};

export default LoginPageCallback;