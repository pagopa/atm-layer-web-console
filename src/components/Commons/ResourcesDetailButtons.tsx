import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


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
				onClick={() => console.log("aggiornamento")}>
                Aggiorna
			</Button>
		</Box>
	);
};

export default ResourcesDetailButtons;