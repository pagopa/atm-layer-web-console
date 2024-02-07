import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes";

type Props = {
    associateRoute: string;
    upgradeRoute: string;
};

const BpmnDetailButtons = () => {
	const navigate = useNavigate();

	return(
		<Box>
			<Button
				sx={{ marginRight: 3 }}
				variant="contained" 
				onClick={() => navigate(ROUTES.ASSOCIATE_BPMN)}>
								Associa
			</Button>
			<Button 
				sx={{ marginRight: 3 }}
				variant="contained" 
				onClick={() => navigate(ROUTES.UPGRADE_BPMN)}>
								Upgrade
			</Button>
			<Button 
				sx={{ marginRight: 3 }}
				variant="contained" 
				onClick={() => console.log("Deploy")}>
								Deploy
			</Button>
			<Button 
				sx={{ marginRight: 3 }}
				variant="contained" 
				onClick={() => console.log("Delete")}>
								Delete
			</Button>
			<Button 
				variant="contained" 
				onClick={() => console.log("Download")}>
								Download
			</Button>
		</Box>
	);
};

export default BpmnDetailButtons;