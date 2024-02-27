import { Box, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type Props = {
	route: string;
};

const GoBackButton = ({ route }: Props) => {
	const theme = useTheme();
	const navigate = useNavigate();

	return (
		<Box my={1} justifyContent={"flex-start"} display={"flex"}>
			<Button
				data-testid="section-id"
				variant="text"
				size="large"
				onClick={() => navigate(route)}
				sx={{
					"&:hover": {
						color: theme.palette.primary.main,
						backgroundColor: "transparent",
						textDecoration: "underline"
					},
					paddingLeft: "0px"
				}}
			>
				<ArrowBackIcon />
				TORNA INDIETRO
			</Button>
		</Box>
	);
};

export default GoBackButton;