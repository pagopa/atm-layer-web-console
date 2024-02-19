import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DELETE_RES, DOWNLOAD_RES, UPDATE_RES } from "../../commons/constants";


type Props = {
    type?: string;
    setType: React.Dispatch<React.SetStateAction<string>>;
    openDialog: (type: string) => void;
    detail: any;
  };

const ResourcesDetailButtons = ({ type, setType, openDialog, detail }: Props) => {
	const navigate = useNavigate();

	function handleClick(variable: string) {
		setType(variable);
		openDialog(variable);
	}

	return (
		<Box mt={2} mx={4} display={"flex"} alignContent={"center"} justifyContent={"flex-start"}>
			<Button
				sx={{ marginRight: 3 }}
				variant="contained"
				onClick={() => handleClick(UPDATE_RES)}>
                Aggiorna
			</Button>
			<Button 
				sx={{ marginRight: 3 }} 
				variant="contained" 
				onClick={() => handleClick(DELETE_RES)}>
        Cancella
			</Button>
			<Button 
				variant="contained" 
				onClick={() => console.log("scaricando")}>
        Scarica
			</Button>
		</Box>
	);
};

export default ResourcesDetailButtons;