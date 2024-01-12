"use client";

import React from "react";
import { Container, Button, Stack, IconButton } from "@mui/material";

/* Icons */
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { AccountDropdown, ButtonNaked, LogoPagoPACompany } from "@pagopa/mui-italia";

export type JwtUser = {
    id: string;
    name?: string;
    surname?: string;
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
    href: string;
    ariaLabel: string;
    title: string;
};

type HeaderAccountProps = {
    rootLink: RootLinkType;
    loggedUser?: JwtUser | false;
    onAssistanceClick: () => void;
    onLogin?: () => void;
    onLogout?: () => void;
    userActions?: Array<UserAction>;
    enableDropdown?: boolean;
    enableLogin?: boolean;
    enableAssistanceButton?: boolean;
    onDocumentationClick?: () => void;
};

export const HeaderAccountCustom = ({
	rootLink,
	loggedUser,
	userActions,
	onAssistanceClick,
	onDocumentationClick,
	onLogout,
	onLogin,
	enableDropdown = false,
	enableLogin = true,
	enableAssistanceButton = true,
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

				<ButtonNaked
					component="a"
					size="small"
					aria-label={rootLink?.ariaLabel}
					href={rootLink?.href}
					target="_blank"
					rel="noreferrer"
					title={rootLink?.title}
					sx={{ fontWeight: "bold" }}
				>
					{rootLink?.element}
				</ButtonNaked>

				<Stack
					direction="row"
					alignItems="center"
					spacing={{ xs: 1, sm: 3, md: 4 }}
				>
					{/* DIFFERENT COMBINATIONS */}

					{/* 1. Logged User with Dropdown */}
					{enableLogin && loggedUser && enableDropdown && (
						<AccountDropdown user={loggedUser} userActions={userActions} />
					)}

					{/* 2. Logged User with Logout CTA */}
					{enableLogin && loggedUser && !enableDropdown && (
						<Button variant="text" size="small" onClick={onLogout} title="Esci">
                            Esci
						</Button>
					)}

					{/* 3. User not logged with Login CTA */}
					{enableLogin && !loggedUser && (
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