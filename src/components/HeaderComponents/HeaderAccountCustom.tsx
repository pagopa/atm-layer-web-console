import { Container, Button, Stack, Typography } from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Box } from "@mui/system";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RootLinkType, User } from "../../model/UserModel";
import { Ctx } from "../../DataContext";
import { fetchRequest } from "../../hook/fetch/fetchRequest";
import { PROFILE, USER_INFO } from "../../commons/endpoints";
import EmulatorButton from "../NavigationComponents/EmulatorButton";
import { getProfilesIds } from "../Commons/Commons";
import ROUTES from "../../routes";



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


	const { abortController, loggedUserInfo, setLoggedUserInfo, setProfilesAvailable } = useContext(Ctx);
	const token = sessionStorage.getItem("jwt_console");
	const isProd: boolean= process.env.REACT_APP_ENV==="PROD";
	const navigate = useNavigate();

	const getUserInfo = async () => {
		try {
			const response = await fetchRequest({ urlEndpoint: USER_INFO, method: "POST", abortController })();

			if (response?.success) {
				setLoggedUserInfo(response.valuesObj);
				if (!response.valuesObj.name && !response.valuesObj.surname && getProfilesIds(response.valuesObj).includes(5)) {
					sessionStorage.setItem("loggedUserInfo", response.valuesObj);
					navigate(ROUTES.USERS);
				}
				else if (response.valuesObj.name && response.valuesObj.surname && response.valuesObj.profiles.length < 1) {
					navigate(ROUTES.UNAUTHORIZED_PAGE);
				}
			} else {
				navigate(ROUTES.LOGIN);
			}
		} catch (error) {
			console.error("ERROR", error);
		}
	};

	const getAllProfilesList = async () => {

		try {
			const response = await fetchRequest({ urlEndpoint: PROFILE, method: "GET", abortController })();

			if (response?.success) {
				setProfilesAvailable(response.valuesObj?.profiles);
			} else {
				setProfilesAvailable([]);
			}
		} catch (error) {
			console.error("ERROR", error);
		}
	};

	useEffect(() => {
		void getAllProfilesList();
		if(!loggedUserInfo.userId && token){
			void getUserInfo();
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
						<Box ml={6}>
							<EmulatorButton />
						</Box>
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