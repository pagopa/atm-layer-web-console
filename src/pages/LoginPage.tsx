import { Box, Button, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Ctx } from "../DataContext";
import BoxPageLayout from "./Layout/BoxPageLayout";


const LoginPage = () => {
	const { clearAll, debugOn } = useContext(Ctx);
	const theme=useTheme();

	const handleLogin=()=>{
		const urlLogin=process.env.REACT_APP_LOGIN_URL;
		if(debugOn){
			console.log("url login", urlLogin);
		}
		window.open(urlLogin, "_self");
	};

	// pulisco il localStorage all'ingresso in pagina
	useEffect(() => {
		clearAll();
	}, []);
	

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