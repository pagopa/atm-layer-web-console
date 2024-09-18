import { Button, useTheme } from "@mui/material";
import { useContext } from "react";
import React from "react";
import IconBox from "../Commons/IconBox";
import { Ctx } from "../../DataContext";
import { EMULATOR } from "../../commons/constants";
import { getProfileIdsArray } from "../Commons/Commons";

export default function EmulatorButton() {

	const {loggedUserInfo} = useContext(Ctx);
	const loggedUserProfiles = getProfileIdsArray(loggedUserInfo);
	const allowedToEmulator = loggedUserProfiles.includes(EMULATOR);

	const openEmulator = () => {

		const jwt = sessionStorage.getItem("jwt_console");
		const emulatorUrl = process.env.REACT_APP_EMULATOR_URL;
		const url = jwt && emulatorUrl ? emulatorUrl.concat(`#jwt_console=${jwt}`) : emulatorUrl;
		window.open(url, "_blank");
	};
	const theme = useTheme();

	return (
		allowedToEmulator ? 
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
			:
			<React.Fragment></React.Fragment>
	
	);
}
