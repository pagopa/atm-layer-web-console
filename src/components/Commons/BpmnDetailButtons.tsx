import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes";
import { DELETE, DEPLOY, DOWNLOAD } from "../../commons/constants";

type Props = {
  type?: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  openDialog: (type: string) => void;
  detail: any;
};

const BpmnDetailButtons = ({ type, setType, openDialog, detail }: Props) => {
	const navigate = useNavigate();
	
	function handleClick(variable: string) {
		setType(variable);
		openDialog(variable);
	}

	return (
		<Box>
			<Button
				sx={{ marginRight: 3 }}
				variant="contained"
				onClick={() => navigate(ROUTES.ASSOCIATE_BPMN)}
			>
        Associa
			</Button>
			<Button
				sx={{ marginRight: 3 }}
				variant="contained"
				onClick={() => navigate(ROUTES.UPGRADE_BPMN)}
			>
        Aggiorna
			</Button>
			<Button
				sx={{ marginRight: 3 }}
				variant="contained"
				onClick={() => handleClick(DEPLOY)}
				disabled={detail.status === "DEPLOYED"}
			>
        Rilascia
			</Button>
			<Button sx={{ marginRight: 3 }} variant="contained" onClick={() => handleClick(DELETE)}>
        Cancella
			</Button>
			<Button variant="contained" onClick={() => handleClick(DOWNLOAD)}>
        Scarica
			</Button>
		</Box>
	);
};

export default BpmnDetailButtons;
