/* eslint-disable indent */
import { Box, alpha, width } from "@mui/system";
import { Button, Grid, IconButton, Typography, useTheme } from "@mui/material";
import styled from "@emotion/styled";
import React from "react";
import IconBox from "../Commons/IconBox";

type Props = {
    name: string;
    allowedType?: string;
    files?: Array<File>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: () => void;
    error?: string;
};

const UploadMultipleWithButton = ({ name, allowedType, files, onChange, onClick, error }: Props) => {
    const theme = useTheme();

    const VisuallyHiddenInput = styled("input")({
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        // height: 1,
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        whiteSpace: "nowrap",
        // width: 1,
    });

    return (
        <React.Fragment>
        <Box
            p={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={0.5}
            mb={1}
            sx={{
                maxWidth:"95%",
                border: "2px dashed",
                backgroundColor: error ? alpha(theme?.palette?.error?.light, 0.3) : `${theme.palette.primary.main}40`,
                borderColor: error ? theme?.palette?.error?.dark: theme?.palette?.primary?.main,
                "&:hover":{
                    backgroundColor: error ? alpha(theme?.palette?.error?.light, 0.1) : alpha(theme.palette.primary.light, 0.9),
                    color: error ? theme?.palette?.error?.dark :  alpha(theme.palette.text.primary, 0.3),
                }
            }}
     >
                <Button
                    component="label"
                    variant="naked"
                    color={ error ? "error" : "primary" }
                    size="large"
                    sx={{ padding: "10px"}}
                    disableRipple
                    startIcon={<IconBox id={"iconUploadFile"} icon={"FileUpload"} color={error ? theme.palette.error.main :theme.palette.primary.main} size={"1.2em"} marg={"5px 0 0 0"}/>}

                    // startIcon={<FileUploadIcon color={ error ? "error" : "primary" }/>}
                >
                    Carica file dal tuo computer
                    <VisuallyHiddenInput type="file" name={name} accept={allowedType} onChange={onChange} data-testid="hidden-input" multiple={true}/>
                </Button>
            
        </Box>
        {files && files?.length > 0  ?
        files.map((file, key) => 
            <Box
            key = {key}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            height={"40px"}
            paddingLeft={"5%"}
            paddingRight={"5%"}>
                <Box>
                    <Typography variant="body1" fontWeight={theme.typography.body1.fontWeight} color={theme.palette.primary.main}>
                    {file.name}
                    </Typography>
                </Box>
                <Box ml={2}>
                    <IconButton onClick={onClick} disableRipple data-testid={key}>
                    <IconBox id={"iconClearFile"} icon={"Close"} color={theme.palette.primary.main} size={"0.8em"} marg={"5px 0 0 0"}/>
                    </IconButton>
                </Box>
            </Box>
        )
        :
        <></>}
        </ React.Fragment>);
};

export default UploadMultipleWithButton;
