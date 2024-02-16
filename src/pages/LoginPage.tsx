import { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Ctx } from "../DataContext";


const LoginPage = () => {
	const { logged } = useContext(Ctx);

	const handleLogin=()=>{
		const urlLogin=process.env.REACT_APP_LOGIN_URL;
		const newWindow = window.open(urlLogin, "_blank", "noopener,noreferrer");
		if (newWindow) {
			// eslint-disable-next-line functional/immutable-data
			newWindow.opener = null;
		}
	};

	return(
		<Box m={1} p={1}>
			<Typography variant="h4">Accedi alla console</Typography>
		
			<Button
				variant="contained"
				size="small"
				onClick={handleLogin}
				title="Accedi"
			>
                Accedi
			</Button>
					
		</Box>
	);
};

export default LoginPage;