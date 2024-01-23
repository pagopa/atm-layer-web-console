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
	
	};

	return (
		<Box >
			{getFormOptions.map((el: any, ind: any) => (
				<React.Fragment key={el.title}>
					<Box marginTop={3} textAlign={"center"}>
						<TitleComponent title={el.title} subTitle={""} />
					</Box>
					<Box p={3} my={3} mx={"auto"} sx={inputGroupStyle}  >
						<form onSubmit={handleSubmit}>
							<Grid container >
								<Grid item xs={12}>
									<Box display="flex">
										<IconBox icon={"EditNote"} marg={"0 0.2em 0  0"} size={"1.8em"} />
										<Typography variant="body1" fontWeight="600">
											{el.description}
										</Typography>
									</Box>
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
