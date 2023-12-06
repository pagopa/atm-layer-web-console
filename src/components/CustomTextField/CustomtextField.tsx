import styled from "@emotion/styled";
import { TextField, FilledTextFieldProps, Theme, TextFieldProps, TextFieldVariants } from "@mui/material";
import React from "react";

type Props = {
  id: string;
  name: string;
  label: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  endIcon?: React.ReactNode;
};

type CustomTextFieldProps = FilledTextFieldProps & {
  theme?: Theme;
  error?: TextFieldProps["error"];
  variant?: TextFieldVariants;
};

const StyledTextField = styled(TextField)<CustomTextFieldProps>(
	({ theme, error }: CustomTextFieldProps) => ({
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
			transition: theme?.transitions.create(["border-color", "background-color", "box-shadow"]),
			"&::before": {
				borderBottom: "none"
			},
			"&::after": {
				borderBottom: "none"
			},
			"&:hover": {
				backgroundColor: "transparent",
				"&::before": {
					borderBottom: "none"
				},
			},
			"&.Mui-focused": {
				backgroundColor: "transparent",
				borderColor: error ? "red" : theme?.palette.primary.main,
				borderBottom: "2px solid" + theme?.palette.primary.main,
			},
		},
		"& .MuiInputLabel-root": {
			marginTop: "8px",
		},
	})
);

export const CustomTextField: React.FC<Props> = ({ id, name, label, value, handleChange, error, endIcon }) => (
	<StyledTextField
		onChange={handleChange}
		variant="filled"
		label={label}
		value={value}
		id={id}
		name={name}
		error={error}
		InputProps={{
			endAdornment: endIcon,
		}}
		inputProps={{
	  maxLength: 18,
		}}
	/>
);