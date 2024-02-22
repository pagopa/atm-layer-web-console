import { Grid, Typography, Button, Box, useTheme } from "@mui/material";
import React, { SetStateAction } from "react";
import { TitleComponent } from "../../TitleComponents/TitleComponent";
import IconBox from "../../Commons/IconBox";
import { ActionAlert } from "../../Commons/ActionAlert";

type Props = {
	handleSubmit: (e: React.FormEvent) => void;
	setOpenSnackBar?: React.Dispatch<SetStateAction<boolean>>;
	children?: any;
	getFormOptions: any;
	openSnackBar?: boolean;
	severity?: any;
	message?: string;
	title?: string;
	errorCode?: string;
	handleSwitchAssociationFetch?: () => Promise<void>;
};

export default function FormTemplate({ handleSubmit, setOpenSnackBar, children, getFormOptions, openSnackBar, severity, message, title, errorCode, handleSwitchAssociationFetch }: Readonly<Props>) {
	const theme = useTheme();

	const inputGroupStyle = {
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: theme.palette.divider,
	};

	const disabledConfirmButton = () => openSnackBar ? true : false;

	return (
		<Box sx={{ maxWidth: "75%" }}>
			{getFormOptions.map((el: any, ind: any) => (
				<React.Fragment key={el.title}>
					<Box marginTop={3} textAlign={"center"}>
						<TitleComponent title={el.title} subTitle={""} />
					</Box>
					<Box p={3} my={3} mx={"auto"} sx={inputGroupStyle}  >
						<Grid container >
							<Grid item xs={12}>
								<Box display="flex" mb={2}>
									<IconBox icon={"EditNote"} marg={"0 0.2em 0  0"} size={"1.8em"} />
									<Typography variant="body1" fontWeight="600">
										{el.description}
									</Typography>
								</Box>
							</Grid>

							{children}
						</Grid>
						<Box display="flex" justifyContent="flex-end" mt={2}>
							<Button variant="contained" onClick={handleSubmit} disabled={disabledConfirmButton()}>
								Conferma
							</Button>
						</Box>
						<ActionAlert
							setOpenSnackBar={setOpenSnackBar}
							openSnackBar={openSnackBar}
							severity={severity}
							message={message}
							title={title}
							errorCode={errorCode}
							handleSwitchAssociationFetch={handleSwitchAssociationFetch}
						/>
					</Box>
				</React.Fragment>
			)
			)}
		</Box>
	);
}
