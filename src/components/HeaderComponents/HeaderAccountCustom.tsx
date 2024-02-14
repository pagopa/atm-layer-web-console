import React from "react";
import { Container, Button, Stack, Typography } from "@mui/material";


/* Icons */

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Box } from "@mui/system";

export type JwtUser = {
	id?:string;
    email?: string;
};

export type UserAction = {
    id: string;
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
};

export type RootLinkType = {
    element: JSX.Element;
    href?: string;
    ariaLabel: string;
    title: string;
};

type HeaderAccountProps = {
    rootLink: RootLinkType;
    loggedUser?: boolean;
    onLogin?: () => void;
    onLogout?: () => void;
};

export const HeaderAccountCustom = ({
	rootLink,
	loggedUser,
	onLogout,
	onLogin,
}: HeaderAccountProps) => (
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
				{/* <ButtonNaked
					component="div"
					size="small"
					aria-label={rootLink?.ariaLabel}
					// href={rootLink?.href}
					// target="_blank"
					rel="noreferrer"
					title={rootLink?.title}
					sx={{ fontWeight: "bold", pl: 3 }}
				>
					{rootLink?.element}
				</ButtonNaked> */}
<<<<<<< HEAD
				<Box className="logo" aria-label={rootLink?.ariaLabel} title={rootLink?.title}>
=======
				<Box pl={3} className="logo" aria-label={rootLink?.ariaLabel} title={rootLink?.title}>
>>>>>>> a4c114f5fd5b0d95a62cbf288a4cf5c908521ece
					{rootLink?.element}
				</Box>

				<Stack
					direction="row"
					alignItems="center"
					spacing={{ xs: 1, sm: 3, md: 4 }}
				>
					{/* DIFFERENT COMBINATIONS */}

					{/* 1. Logged User with Dropdown */}
					{loggedUser && (
						// <AccountDropdown user={loggedUser} />
						<Box display={"flex"} >
							<Box mr={1}>
								<AccountCircleRoundedIcon />
							</Box>
							<Typography>
								{"Benvenuto utente"}
							</Typography>
						</Box>
					)}

					{/* 2. Logged User with Logout CTA */}
					{loggedUser && (
<<<<<<< HEAD
						<Button variant="text" onClick={onLogout} title="Esci">
=======
						<Button variant="outlined" onClick={onLogout} title="Esci">
>>>>>>> a4c114f5fd5b0d95a62cbf288a4cf5c908521ece
                            Esci
						</Button>
					)}

					{/* 3. User not logged with Login CTA */}
					{!loggedUser && (
						<Button
							variant="contained"
							size="small"
							onClick={onLogin}
							title="Accedi"
						>
                            Accedi
						</Button>
					)}
				</Stack>
			</Stack>
		</Container>
	</Stack>
);