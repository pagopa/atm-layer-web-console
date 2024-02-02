import { Grid, Typography, Button, Box, useTheme } from "@mui/material";
import React from "react";
import { TitleComponent } from "../../TitleComponents/TitleComponent";
import IconBox from "../../Commons/IconBox";

type Props = {
	handleSubmit: (e: React.FormEvent) => void;
	children?: any;
	getFormOptions: any;

};

export default function FormTemplate({ handleSubmit, children, getFormOptions }: Readonly<Props>) {
	const theme = useTheme();

	const inputGroupStyle = {
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: theme.palette.divider,
	};

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
							<Button variant="contained" onClick={handleSubmit}>
								Submit
							</Button>
						</Box>
					</Box>
				</React.Fragment>
			)
			)}
		</Box>
	);
}
