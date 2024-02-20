import { useContext, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { theme } from "@pagopa/mui-italia";
import { useNavigate } from "react-router-dom";
import { Ctx } from "../DataContext";
import routes from "../routes";
import BoxPageLayout from "./Layout/BoxPageLayout";


const LoginPage = () => {
	const { logged, setLogged } = useContext(Ctx);
	const navigate = useNavigate();

	const handleLogin=()=>{
		const urlLogin=process.env.REACT_APP_LOGIN_URL;
		console.log("url login", urlLogin);
		window.open(urlLogin, "_blank");
	};

	// useEffect(() => {
	// 	const token=window?.location?.hash?.split("&")[1]?.split("=")[1];
	// 	if(token) {
	// 		setLogged(true);
	// 		localStorage.setItem("jwt", token);
	// 		navigate(routes.HOME);
	// 	}
	// }, []);

	return(

		<BoxPageLayout >
			 <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} height={"calc(100vh - 220px)"}>
				<Box width={"25%"} p={4} sx={{
					boxShadow: theme.shadows[8],
					backgroundColor: theme?.palette?.background?.paper,
				}}>
					<Box mb={4} display={"flex"} justifyContent={"center"}>
						<Typography variant="h1">Accedi alla console</Typography>
					</Box>
					<Box mb={4} display={"flex"} justifyContent={"center"}>
						<Typography variant="h6">Lo spazio dedicato alla gestione dei processi ATM Layer</Typography>
					</Box>
					<Box px={6} py={3}>
						<Button
							variant="contained"
							size="large"
							onClick={handleLogin}
							title="Accedi"
							fullWidth
						>
									Accedi
						</Button>
					</Box>
				</Box>
			</Box>
		</BoxPageLayout>

	);
};

export default LoginPage;