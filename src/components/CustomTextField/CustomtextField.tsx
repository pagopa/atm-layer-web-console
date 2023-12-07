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
}) => {
	const { isInvalidField } = checks();
	const theme = useTheme();
	const [text, setText] = useState(
		!isInvalidField(defaultVal) ? defaultVal : ""
	);

	const handleChangeBase = (event: { target: { value: React.SetStateAction<string | undefined> } }) => {
		setText(event.target.value);
	};


	return (
		// 	<StyledTextField
		// 		onChange={handleChangeBase}
		// 		variant={variant?variant:"outlined"}
		// 		label={label}
		// 		value={value}
		// 		id={id}
		// 		name={name}
		// 		error={error}
		// 		InputProps={{
		// 			endAdornment: endIcon,
		// 		}}
		// 		inputProps={{
		//   maxLength: 18,
		// 		}}
		// 	/>
		<React.Fragment>
			<Tooltip title={label} placement="bottom-start">
				<CustomInput
					fullWidth
					disabled={disabled}
					onChange={handleChangeBase}
					style={icons ? { width: "calc(100% - 54px)" } : {}}
					id={id}
					name={id}
					label={label}
					defaultValue={defaultVal}
					value={text}
					variant="outlined"
					error={error}
					helperText={helperText}
					// InputProps={{ ...inputProps }}
					type={"text"}
					required={type === "baseRequire" ? true : false}
					// onKeyDown={onKeyDown}
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
												: theme.palette.primary.main
										}
										icon={icons}
										color={
											disableAction === true
												? "red"
												: error? "red" : theme.palette.primary.main
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
			</Tooltip>
			{/* {icons && (
				<Box
					mx={0.5}
					style={{
						display: "inline-block",
						width: "max-content",
						float: "right",
						marginRight: "0px",
					}}
				>
					<ActionIcon
						id={idActionIcon}
						disableAction={disableAction}
						// action={action}
						bgcolor={
							disableAction === true
								? "rgba(0, 0, 0, 0.12)"
								: theme.palette.primary.main
						}
						icon={icons}
						color={
							disableAction === true
								? "red"
								: theme.palette.common.white
						}
						pad={12.5}
						borderRadius={borderRadius}
						border={false}
					/>
				</Box>
			)} */}

		</React.Fragment>
	);
};