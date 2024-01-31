import { Typography } from "@mui/material";

type Props = {
    title: string;
    subTitle: string;
};

export const TitleComponent = ({ title, subTitle }: Props) => (
	<>
		<Typography variant="h5"> 
			{title} 
		</Typography>
		<Typography
			mt={1}
			variant="body2"
			noWrap
			color={"text.secondary"}
		>
			{subTitle}
		</Typography>
	</>
);
