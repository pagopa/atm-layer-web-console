import styled from "@emotion/styled";
import { TextField, Theme, TextFieldProps, Tooltip, Box, useTheme, InputAdornment, IconButton, Input } from "@mui/material";
import React, { useState } from "react";
import checks from "../../commons/checks";
import ActionIcon from "./ActionIcon";

type Props = {
	id: string;
	name: string;
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: boolean;
	icons?: string;
	variant?: "outlined";
	defaultVal?: string;
	disabled?: boolean;
	type?: string;
	border?: boolean;
	action?: (e: React.MouseEvent<Element, MouseEvent>) => void;
	helperText?: string;
	borderRadius?: string;
	disableAction?: boolean;
	idActionIcon?: string;
	inputProps?: string;
	onKeyDown?: (e: React.KeyboardEventHandler<Element>) => void;
	theme?: Theme;
};

type CustomTextFieldProps = TextFieldProps & {
	theme?: Theme;
	error?: TextFieldProps["error"];
};

const CustomInput = styled(TextField)<CustomTextFieldProps>(
	({ theme, error }: CustomTextFieldProps) => ({
		// width: "20%",
		// ""& .MuiFormLabel-root"": {
		// 	minHeight: theme?.spacing(9),
		// height: "100%",
		// width: "100%",
		// 	// paddingY: "8px",
		// 	overflow: "hidden",
		// 	borderRadius: "8px",
		// 	backgroundColor: theme?.palette.mode === "light" ? "#FFFFFF" : "#1A2027",
		// 	borderWidth: "2px",
		// 	borderStartStyle: "solid",
		// 	borderColor: error ? "red" : theme?.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
		// 	// transition: theme?.transitions.create(["border-color", "background-color", "box-shadow"]),
		// 	"&::before": {
		// 		borderBottom: "none"
		// 	},
		// 	"&::after": {
		// 		borderBottom: "none"
		// 	},
		// 	"&:hover": {
		// 		backgroundColor: "transparent",
		// 		"&::before": {
		// 			borderBottom: "none"
		// 		},
		// 	},
		// "&.Mui-focused": {
		// 	backgroundColor: "transparent",
		// 	borderColor: error ? "red" : theme?.palette.primary.main,
		// 	borderBottom: "2px solid" + theme?.palette.primary.main,
		// },
		// },
		// "& .MuiInputLabel-root": {
		// 	marginTop: "8px",
		// },
	})
);



export const CustomTextField: React.FC<Props> = ({
	id,
	name,
	label,
	value,
	onChange,
	error,
	icons,
	variant,
	defaultVal,
	disabled,
	type,
	border,
	action,
	helperText,
	borderRadius,
	disableAction,
	idActionIcon,
	inputProps,
	onKeyDown,
	theme
}) => (
	<>
		<CustomInput
			fullWidth
			disabled={disabled}
			onChange={onChange}
			style={icons ? { /* width: "calc(100% - 54px)", */ color: error ? "red" : theme?.palette.primary.main, fontWeight: theme?.typography.fontWeightBold  } : {fontWeight: theme?.typography.fontWeightBold }}
			id={id}
			name={name}
			label={label}
			defaultValue={defaultVal}
			value={value}
			variant="outlined"
			error={error}
			helperText={helperText}
			type={"text"}
			required={type === "baseRequire" ? true : false}
			inputProps={{ maxLength: 18 }}
			InputProps={{
				endAdornment: (
					icons && (  
						<InputAdornment position="end">
							<ActionIcon
								id={idActionIcon}
								disableAction={disableAction}
								// action={action}
								bgcolor={
									disableAction === true
										? "rgba(0, 0, 0, 0.12)"
										: theme?.palette.primary.main
								}
								icon={icons}
								color={
									disableAction === true
										? "red"
										: error? "red" : theme?.palette.primary.main
								}
								pad={12.5}
								borderRadius={borderRadius}
								border={false}
							/>
						</InputAdornment>
					)
				),
					  }} 
		/>
	</>
);