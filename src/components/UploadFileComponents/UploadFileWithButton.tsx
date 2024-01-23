/* eslint-disable indent */
import { Box } from "@mui/system";
import { useEffect } from "react";
import { Button, IconButton, Typography, useTheme } from "@mui/material";
import styled from "@emotion/styled";
import ClearIcon from "@mui/icons-material/Clear";
import FileUploadIcon from "@mui/icons-material/FileUpload";

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
        height: 1,
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        whiteSpace: "nowrap",
        width: 1,
    });


    useEffect(() => {
        console.log("FILE:", file);
    }, [file]);;

    return (
        <Box
                mt={2}
                p={2}
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
                sx={{
                    border: "2px dashed",
                    borderRadius: "8px",
                    backgroundColor: error ? "#ffcfcf" : `${theme.palette.primary.main}40`,
                    borderColor: error ? "red" : theme.palette.primary.main,
                }}
            >
                {file ?
                    <><Box>
                        <Typography variant="body1" fontWeight={theme.typography.body1.fontWeight} color={theme.palette.primary.main}>
                            {file.substring(file.lastIndexOf("\\") + 1)}
                        </Typography>
                    </Box><Box ml={2}>
                            <IconButton onClick={onClick} disableRipple>
                                <ClearIcon sx={{color:theme.palette.primary.main}}/>
                            </IconButton>
                        </Box></> :
                    <Button
                        component="label"
                        variant="naked"
                        color={ error ? "error" : "primary" }
                        size="large"
                        sx={{ p: "11px" }}
                        disableRipple
                        startIcon={<FileUploadIcon color={ error ? "error" : "primary" }/>}
                    >
                        Carica un file dal tuo computer
                        <VisuallyHiddenInput type="file" name={name} accept={allowedType} onChange={onChange} />
                    </Button>
                }
            </Box>);
};

export default UploadFileWithButton;
