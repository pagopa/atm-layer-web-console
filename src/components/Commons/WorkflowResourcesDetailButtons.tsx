import { Box, Button } from "@mui/material";
import { DELETE_WR, DEPLOY_WR, DOWNLOAD_WR, ROLLBACK_WR, UPDATE_WR } from "../../commons/constants";

type Props = {
  type?: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  openDialog: (type: string) => void;
  detail: any;
};

const WorkflowResourcesDetailButtons = ({ setType, openDialog, detail }: Props) => {
	
	function handleClick(variable: string) {
		setType(variable);
		openDialog(variable);
	}

	return (
		<Box mt={2} mx={4} display={"flex"} alignContent={"center"} justifyContent={"flex-start"}>
			<Button
				sx={{ marginRight: 3 }}
				variant="contained"
				onClick={() => handleClick(UPDATE_WR)}
			>
        Aggiorna
			</Button>
			<Button
				sx={{ marginRight: 3 }}
				variant="contained"
				onClick={() => handleClick(ROLLBACK_WR)}
			>
        Ripristina
			</Button>
			<Button
				sx={{ marginRight: 3 }}
				variant="contained"
				onClick={() => handleClick(DEPLOY_WR)}
				disabled={detail.status === "DEPLOYED"}
			>
        Rilascia
			</Button>
			<Button 
				sx={{ marginRight: 3 }} 
				variant="contained" 
				onClick={() => handleClick(DELETE_WR)}>
        Cancella
			</Button>
			<Button 
				variant="contained" 
				onClick={() => handleClick(DOWNLOAD_WR)}>
        Scarica
			</Button>
		</Box>
	);
};

export default WorkflowResourcesDetailButtons;