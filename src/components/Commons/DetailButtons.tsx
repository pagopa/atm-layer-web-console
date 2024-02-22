import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

type ButtonConfig = {
  text: string;
  action: string;
  navigate?: string;
  disabledCondition?: () => boolean;
};

type Props = {
  type?: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  openDialog: (type: string) => void;
  detail: any;
  buttonConfigs: Array<ButtonConfig>;
};

const DetailButtons = ({ setType, openDialog, buttonConfigs }: Props) => {
	const navigate = useNavigate();

	function handleClick(variable: string, navigateTo?: string) {
		setType(variable);
		openDialog(variable);
		if (navigateTo) {
			navigate(navigateTo);
		}
	}

	return (
		<Box mt={2} mx={4} display={"flex"} alignContent={"center"} justifyContent={"flex-start"}>
			{buttonConfigs.map((button, index) => (
				<Button
					key={index}
					sx={{ marginRight: 3 }}
					variant="contained"
					onClick={() => handleClick(button.action, button.navigate)}
					disabled={button.disabledCondition ? button.disabledCondition() : false}
				>
					{button.text}
				</Button>
			))}
		</Box>
	);
};

export default DetailButtons;