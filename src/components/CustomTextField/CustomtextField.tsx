import styled from "@emotion/styled";
import { TextFieldProps, TextField, Theme, FilledTextFieldProps} from "@mui/material";
import { alpha } from "@mui/system";


type Props = { 
    label: string;
    value: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    endIcon?: React.ReactNode;
};

type CustomTextFieldProps = FilledTextFieldProps & {
  theme?: Theme;
  error?: TextFieldProps["error"];
};

export const CustomTextField = ({ label, value, handleChange, endIcon }: Props) => {

	const CustomTextFieldComponent: React.FC<CustomTextFieldProps> = ({ theme, ...props }) => (
		<TextField
			InputProps={{ disableUnderline: true }}

			{...props}
		/>
	);
    
	const TextFieldStyled = styled(CustomTextFieldComponent)(({ theme, error }: CustomTextFieldProps) => ({
		width: "20%",
		"& .MuiFilledInput-root": {
			minHeight: theme?.spacing(9),
			height: "100%",
			width: "100%",
			paddingY: "8px",
			overflow: "hidden",
			borderRadius: "8px",
			backgroundColor: theme?.palette.mode === "light" ? "#FFFFFF" : "#1A2027",
			border: "2px solid",
			borderColor: error ? "red" : theme?.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
			transition: theme?.transitions.create([
				"border-color",
				"background-color",
				"box-shadow",
			]),
			"&:hover": {
				backgroundColor: "transparent",
			},
			"&.Mui-focused": {
				backgroundColor: "transparent",
				boxShadow: `${alpha(theme?.palette.primary.main ?? "", 0.25)} 0 0 0 2px`,
				borderColor: error ? "red" : theme?.palette.primary.main,
			},
		},
		"& .MuiInputLabel-root": {
			marginTop: "8px",
		},
	    }
	));


	return (
		<TextFieldStyled
			onChange={handleChange}
			variant="filled"
			label={label}
			value={value}
			id="warning-code"
			InputProps={{
				endAdornment: endIcon
			}}
			inputProps={{
				maxLength: 18
			}}
		/>
	);
};


