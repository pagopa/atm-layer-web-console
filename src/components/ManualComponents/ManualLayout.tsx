import { Box, Grid, useTheme } from "@mui/material";
import { LogoPagoPAProduct } from "@pagopa/mui-italia";
import { ManualButton } from "./ManualButton";

export const ManualLayout = () => {

	const theme = useTheme();
	const buttonStyle = {
		fontSize: "1.3rem",
		height: "100%",
		width: "100%",
		color: "black",
		borderColor: theme.colorVariant?.customBorderColor,
		borderRadius: theme.shape.borderRadius,
		justifyContent: "flex-start",
		minHeight: "70px"
	};

	const handleClickFunction = (key: number) => {
		switch (key) {
		case 1: 
			return console.log("Button 1 clicked!");
		case 2: 
			return console.log("Button 2 clicked!");
		default:
			return console.log("clicked!");
		}
	};

	const buttons = [
		{
			label: "Paga un avviso pagoPA",
			style: buttonStyle,
			icon: (<LogoPagoPAProduct 
				color="default" 
				title={""} 
				size={32} 
			/>)
		},
		{
			label: "Iniziative ID Pay",
			style: buttonStyle,
			icon: (<LogoPagoPAProduct 
				color="default" 
				title={""} 
				size={32} 
			/>)
		}
	];
    
	return (
		<Box my={2} style={{ 
			display: "grid", 
			gridTemplateColumns: "repeat(12, 2fr)", 
			gridTemplateAreas: `
            "button0 button0 button0 button0 button0 . . . . . . ."
            "button1 button1 button1 button1 button1 . . . . . . ."
            `,
			rowGap: "24px" }}
		>
			{
				buttons.map((e, i) => 
					(<Box key={i} style={{ gridArea: `button${i}`, gridColumn: "span 5"}}>
						<ManualButton 
							handleClick={() => handleClickFunction(i)} 
							label={e.label} 
							style={e.style}
							endIcon={e.icon} 
							key={i}
						/>
					</Box>)
				)
			}
		</Box>
	);
};