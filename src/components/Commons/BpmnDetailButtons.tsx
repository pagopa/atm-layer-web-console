import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes";

type Props = {
	type?: string;
	setType: React.Dispatch<React.SetStateAction<string>>;
	openDialog: (type: string) => void;
};

const BpmnDetailButtons = ({ type, setType, openDialog }: Props) => {
	const navigate = useNavigate();
	function handleClick(variable: string) {
		setType(variable);
		openDialog(variable);
	};


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
				Aggiorna
			</Button>
			<Button
				sx={{ marginRight: 3 }}
				variant="contained"
				onClick={() => handleClick("DEPLOY")}>
				Rilascia
			</Button>
			<Button
				sx={{ marginRight: 3 }}
				variant="contained"
				onClick={() => handleClick("DELETE")}>
				Cancella
			</Button>
			<Button
				variant="contained"
				onClick={() => console.log("Download")}>
				Scarica
			</Button>
		</Box>
	);
};

export default BpmnDetailButtons;