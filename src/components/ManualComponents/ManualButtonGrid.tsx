import { Grid } from "@mui/material";

type Props = {
    children?: React.ReactNode;
};

export default function ManualButtonGrid({children}: Props) {
	return (
		<Grid container ml={3} >
			<Grid item xs={5} width="100%" minHeight={"70px"}>
				{children}
			</Grid>
		</Grid>  
	);};
