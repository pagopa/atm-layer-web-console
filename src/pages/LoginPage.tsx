import { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Ctx } from "../DataContext";
import BoxPageLayout from "./Layout/BoxPageLayout";


const LoginPage = () => {
	const { logged } = useContext(Ctx);

	// const handleLogin=()=>{
	// 	const urlLogin=process.env.REACT_APP_LOGIN_URL;
	// 	const newWindow = window.open(urlLogin, "_blank", "noopener,noreferrer");
	// 	if (newWindow) {
	// 		// eslint-disable-next-line functional/immutable-data
	// 		newWindow.opener = null;
	// 	}
	// };

	return(

		<BoxPageLayout >
			<Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} height={"calc(100vh - 220px)"}> 
				<Box mb={5}>
					<Typography variant="h6">Accedi alla console</Typography>

				</Box>
				{/* <Box>
					<Button
						variant="contained"
						size="large"
						onClick={handleLogin}
						title="Accedi"
					>
                Accedi
					</Button>
				</Box> */}
			</Box>
		</BoxPageLayout>
	);
};

export default LoginPage;