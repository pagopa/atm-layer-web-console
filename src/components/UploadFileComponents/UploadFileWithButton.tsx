/* eslint-disable indent */
import { Box, alpha } from "@mui/system";
import { useEffect } from "react";
import { Button, IconButton, Typography, useTheme } from "@mui/material";
import styled from "@emotion/styled";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import IconBox from "../Commons/IconBox";

type Props = {
    name: string;
    allowedType?: string;
    file?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: () => void;
    error?: string;
};

const UploadFileWithButton = ({ name, allowedType, file, onChange, onClick, error }: Props) => {
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

  

    useEffect(() => {
        console.log("FILE:", file);
    }, [file]);;

    return (
        <Box
            p={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={0.5}
            mb={1}
            sx={{
                border: "2px dashed",
                backgroundColor: error ? theme?.palette?.error?.main : `${theme.palette.primary.main}40`,
                borderColor: error ? theme?.palette?.error?.dark: theme?.palette?.primary?.main,
                "&:hover":{
                    backgroundColor: error ? theme?.palette?.error?.light : alpha(theme.palette.primary.light, 0.9),
                    color: error ? theme?.palette?.error?.main :  alpha(theme.palette.text.primary, 0.3),
                }
            }}
     >
            {file ?
                <React.Fragment>
                    <Box>
                        <Typography variant="body1" fontWeight={theme.typography.body1.fontWeight} color={theme.palette.primary.main}>
                            {file.substring(file.lastIndexOf("\\") + 1)}
                        </Typography>
                    </Box>
                    <Box ml={2}>
                        <IconButton onClick={onClick} disableRipple>
                            <IconBox id={"iconClearFile"} icon={"Close"} color={theme.palette.primary.main} size={"0.8em"} marg={"5px 0 0 0"} />
                        </IconButton>
                    </Box>
                </React.Fragment> 
                    :
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
                    Carica un file dal tuo computer
                    <VisuallyHiddenInput type="file" name={name} accept={allowedType} onChange={onChange} />
                </Button>
            }
        </Box>);
};

export default UploadFileWithButton;
