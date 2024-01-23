import { Grid, Typography, Button, Box, useTheme } from "@mui/material";
import React from "react";
import { TitleComponent } from "../../TitleComponents/TitleComponent";
import IconBox from "../../Commons/IconBox";


type Props = {
	handleSubmit: React.FormEventHandler<HTMLFormElement>;
	children?: any;
	getFormOptions: any;

};

export default function FormTemplate({ handleSubmit, children, getFormOptions }: Readonly<Props>) {
	const theme = useTheme();

	const inputGroupStyle = {
		borderRadius: 1,
		border: 1,
		borderColor: theme.palette.divider,
		p: 3,
		mb: 3,
		width: "50%",
	};

	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			width={"100vw"}
		>
			{getFormOptions.map((el: any, ind: any) => (
				<React.Fragment key={el.title}>
					<Box marginTop={3} textAlign={"center"}>
						<TitleComponent title={el.title} subTitle={""} />
					</Box>
					<Box sx={inputGroupStyle} mt={4}>
						<form onSubmit={handleSubmit}>
							<Grid container spacing={2}>
								<Grid container item>
									{/* <EditNoteIcon sx={{ mr: 1 }} /> */}
									<IconBox icon={"EditNote"} marg={"0 0.2em 0  0"} size={"1.8em"} />
									<Typography variant="body1" fontWeight="600">
										{el.description}
									</Typography>
								</Grid>
								{children}
							</Grid>
							<Box display="flex" justifyContent="flex-end" mt={2}>
								<Button variant="contained" type="submit">
									Submit
								</Button>
							</Box>
						</form>
					</Box>
				</React.Fragment>
			)
			)}
		</Box>
	);
}
