import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes";

type Props = {
	openDialog: () => void;
};

const BpmnDetailButtons = ({ openDialog }: Props) => {
	const navigate = useNavigate();

	return (
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
				onClick={openDialog}>
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