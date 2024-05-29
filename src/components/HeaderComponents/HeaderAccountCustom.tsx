import { Container, Button, Stack, Typography } from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Box } from "@mui/system";
import { useContext, useEffect } from "react";
import { RootLinkType } from "../../model/UserModel";
import { Ctx } from "../../DataContext";
import { fetchRequest } from "../../hook/fetch/fetchRequest";
import { USER_INFO } from "../../commons/endpoints";
import EmulatorButton from "../NavigationComponents/EmulatorButton";


type HeaderAccountProps = {
    rootLink: RootLinkType;
    loggedUser?: boolean;
    onLogout?: () => void;
};

export const HeaderAccountCustom = ({
	rootLink,
	loggedUser,
	onLogout
}: HeaderAccountProps) => {


	const { abortController, loggedUserInfo, setLoggedUserInfo } = useContext(Ctx);

	const token = sessionStorage.getItem("jwt_console");
	const isProd: boolean= process.env.REACT_APP_ENV==="PROD";

	const getTokenEmail = async () => {
		try {
			// const response = await fetchRequest({ urlEndpoint: USER_EMAIL, method: "GET", abortController })();
			const response = await fetchRequest({ urlEndpoint: USER_INFO, method: "GET", abortController })();

			if (response?.success) {
				setLoggedUserInfo(response.valuesObj);
			}
		} catch (error) {
			console.error("ERROR", error);
		}
	};

	useEffect(() => {
		if(!loggedUserInfo.userId && token){
			void getTokenEmail();
			console.log(loggedUserInfo);
		}
	}, []);
		
	return (
		<Stack
			component="div"
			justifyContent="center"
			sx={{
				borderBottom: 1,
				borderColor: "divider",
				backgroundColor: "background.paper",
				minHeight: "60px",
			}}
		>
			<Container maxWidth={false}>
				<Stack
					spacing={2}
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Box pl={3} className="logo" aria-label={rootLink?.ariaLabel} title={rootLink?.title} display={"flex"} flexDirection={"row"} alignItems={"center"}>
						{rootLink?.element}
						{loggedUser && isProd===false && ( 
							<Box ml={6}>
								<EmulatorButton />
							</Box>
						)}
					</Box>

					<Stack
						direction="row"
						alignItems="center"
						spacing={{ xs: 1, sm: 3, md: 4 }}
					>
						{/* DIFFERENT COMBINATIONS */}

						{/* 1. Logged User with Dropdown */}
						{loggedUser && (
							<Box display={"flex"} >
								<Box mr={1}>
									<AccountCircleRoundedIcon />
								</Box>
								<Typography>
									{`${loggedUserInfo.name} ${loggedUserInfo.surname}` ?? "Benvenuto utente"}
								</Typography>
							</Box>
						)}

						{/* 2. Logged User */}
						{loggedUser && (
							<Button variant="outlined" onClick={onLogout} title="Esci" data-testid="exit-button-test">
                            Esci
							</Button>
						)}

					</Stack>
				</Stack>
			</Container>
		</Stack>
	);
};