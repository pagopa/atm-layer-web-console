import { Button, useTheme } from "@mui/material";
import IconBox from "../Commons/IconBox";

export default function EmulatorButton() {
	const openEmulator = () => {
		const jwt = localStorage.getItem("jwt_console");
		const emulatorUrl = process.env.REACT_APP_EMULATOR_URL;
		window.open(emulatorUrl?.concat(`#jwt_console=${jwt}`), "_blank");
	};
	const theme = useTheme();

	return (

		<Button
			variant="text"
			size="large"
			onClick={openEmulator}
			sx={{
				padding: "0px 0px 0px 16px",
				"&:hover": {
					color: theme.palette.primary.main,
					backgroundColor: "transparent",
					textDecoration:"underline"
				},
			}}
		>
Emulator
			<IconBox icon={"Launch"} color={theme.palette.primary.main} pad={1} size={"1em"} marg={"5px 0px 0px 0px"} />
		</Button>
	);
}
