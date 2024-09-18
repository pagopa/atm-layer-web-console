import { Box, Button, Typography, useTheme } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import { useNavigate } from "react-router-dom";
import IconBox from "../components/Commons/IconBox";
import ROUTES from "../routes";
import BoxPageLayout from "./Layout/BoxPageLayout";



const ErrorPageUsersInDb = () => {

	const navigate = useNavigate();
	const theme = useTheme();

	return(
		<BoxPageLayout >
			<Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} height={"80vh"}> 
				<Box >
					<ReportIcon color="error" sx={{ fontSize: 100 }} />
				</Box>
				<Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
					<Typography variant="h6">
                    Nessun utente presente a Database
					</Typography>
					<Typography >
                    Contattare l&apos;amministratore del sistema
					</Typography>
				</Box>
				<Box mt={4}>
					<Button
						id="home-button-error-page" 
						variant="contained" 
						onClick={()=>navigate(ROUTES.LOGIN)} 
						startIcon={<IconBox icon={"HomeOutlined"} 
							color={theme.palette.common.white} pad={0.5} 
							size={"1em"} 
							marg={"5px 0px 0px 0px"} />}>
					Torna alla Login
					</Button>
				</Box>
			</Box>
		</BoxPageLayout>
	);
};


export default ErrorPageUsersInDb;
