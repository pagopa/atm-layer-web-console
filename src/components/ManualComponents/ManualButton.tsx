


import { Button, Grid, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

type Props = {
    handleClick: () => void;
	label: string;
	style?: React.CSSProperties;
	endIcon?: any;
};

export const ManualButton = ({ handleClick, label, style, endIcon }: Props) =>  {
    
	const theme = useTheme();

	return (
		<Button
			size="large"
			startIcon={
				<ChevronLeftIcon 
					color="primary" 
					style={{ marginInline: "12px", fontSize: "2rem" }} 
				/>}
			endIcon={endIcon}
			variant="outlined"
			onClick={handleClick}
			style={style}
		>
			{label}
		</Button>
	);};
