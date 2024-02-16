/* eslint-disable functional/no-let */
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
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
			setTimeout(() => {
				navigate(routes.HOME);
			}, 5000);
		}
	}, []);

	return(
		<Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ maxHeight: "calc(100vh-110px)" }}>
			<CircularProgress size={20} />
		</Box>		
	);
};

export default LoginPageCallback;