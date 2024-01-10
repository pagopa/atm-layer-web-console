/* eslint-disable indent */
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Typography, useTheme } from "@mui/material";
import styled from "@emotion/styled";
import ClearIcon from "@mui/icons-material/Clear";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Header } from "../../components/Header";
import { TitleComponent } from "../../components/TitleComponents/TitleComponent";
import { getCompletePathImage } from "../../utils/Commons";
import { Ctx } from "../../DataContext";

type Props = {
    allowedType?: string;
};

const UploadFileWithButton = ({ allowedType }: Props) => {
    const navigate = useNavigate();
    const { interfaceType } = useContext(Ctx);
    const [file, setFile] = useState("");
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
        <>
            <Header
                bankTitle="Test"
                bankLogo={getCompletePathImage("icon-52x52.png")}
                serviceDescription="Servizi di pubblica utilità"
            />
            <Box marginTop={3} textAlign={"center"}>
                <TitleComponent
                    title={"Scansiona il codice QR"}
                    subTitle={"Avvicinalo al lettore luminoso posizionato sopra allo schermo."}
                />
            </Box>
            <Box
                marginTop={7}
                display="flex"
                justifyContent="center"
            >
                <Box
                    mt={2}
                    p={2}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="30%"
                    sx={{
                        border: "2px dashed",
                        borderRadius: "8px",
                        backgroundColor: "#0073E614",
                        borderColor: theme.palette.primary.main,
                    }}
                >
                    {file ?
                        <><Box>
                            <Typography variant="body1" fontWeight={theme.typography.body1.fontWeight} color={theme.palette.primary.main}>
                                {file.substring(file.lastIndexOf("\\") + 1)}
                            </Typography>
                        </Box><Box ml={2}>
                                <IconButton onClick={(e) => setFile("")} disableRipple>
                                    <ClearIcon />
                                </IconButton>
                            </Box></> :
                        <Button
                            component="label"
                            variant="naked"
                            size="large"
                            sx={{ p: "11px" }}
                            disableRipple
                            startIcon={<FileUploadIcon color="primary"/>}
                        >
                            Carica un file dal tuo computer
                            <VisuallyHiddenInput type="file" accept={allowedType} onChange={(e) => setFile(e.target.value)} />
                        </Button>
                    }
                </Box>
            </Box>
        </>);
};

export default UploadFileWithButton;
