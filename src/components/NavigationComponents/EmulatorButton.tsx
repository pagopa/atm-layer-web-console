import { Button, useTheme } from "@mui/material";
import IconBox from "../Commons/IconBox";

export default function EmulatorButton() {
	const openEmulator = () => {

		const jwt = sessionStorage.getItem("jwt_console");
		const emulatorUrl = process.env.REACT_APP_EMULATOR_URL;
		const url = jwt && emulatorUrl ? emulatorUrl.concat(`#jwt_console=${jwt}`) : emulatorUrl;
		window.open(url, "_blank");
	};
	const theme = useTheme();

	return (

		<Button
			variant="text"
			size="large"
			onClick={openEmulator}
			sx={{
				padding: "0px 0px 0px 8px",
				color: theme.palette.text.primary,
				"&:hover": {
					backgroundColor: "transparent",
					textDecoration:"underline"
				},
			}}
		>
		Emulator
			<IconBox icon={"Launch"} color={theme.palette.text.primary} pad={0.5} size={"1em"} marg={"8px 0px 0px 0px"} />
		</Button>
	);
}
