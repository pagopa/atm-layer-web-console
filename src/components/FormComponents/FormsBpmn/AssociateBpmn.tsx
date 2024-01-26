/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { RemoveCircleOutline } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { AssociateBpmnDto, BranchConfigDto, TerminalDto } from "../../../model/BpmnModel";
import { isValidUUID, resetErrors } from "../../../utils/Commons";
import formOption from "../../../hook/formOption";
import FormTemplate from "../template/FormTemplate";
import { ASSOCIATE_BPMN } from "../../../commons/constants";

export const AssociateBpmn = () => {
    const theme = useTheme();

    const initialValues: AssociateBpmnDto = {
        acquirerId: undefined,
        functionType: undefined,
        body: {
            defaultTemplateId: undefined,
            defaultTemplateVersion: undefined,
            branchesConfigs: undefined
        }
    };

    const { getFormOptions } = formOption();

    const branchesInitialValues: BranchConfigDto = {
        branchId: undefined,
        branchDefaultTemplateId: undefined,
        branchDefaultTemplateVersion: undefined,
        terminals: undefined
    };

    const terminalsInitialValues: TerminalDto = {
        templateId: undefined,
        templateVersion: undefined,
        terminalIds: undefined
    };

    const initialTerminalErrors = {
        templateId: "",
        templateVersion: "",
        terminalIds: [""],
    };

    const initialBranchesConfigErrors = {
        branchId: "",
        branchDefaultTemplateId: "",
        branchDefaultTemplateVersion: "",
        terminals: [{ ...initialTerminalErrors }]
    };

    const initialErrors = {
        acquirerId: "",
        functionType: "",
        body: {
            defaultTemplateId: "",
            defaultTemplateVersion: "",
            branchesConfigs: [{ ...initialBranchesConfigErrors }],
        }
    };

    const [formData, setFormData] = useState<AssociateBpmnDto>(initialValues);
    const [errors, setErrors] = useState(initialErrors);

    const validateForm = () => {
        const newErrors = {
            acquirerId: formData.acquirerId ?
                isValidUUID(formData.acquirerId) ?
                    ""
                    : "uuid non valido"
                : "Campo obbligatorio",
            functionType: formData.functionType ? "" : "Campo obbligatorio",
            body: {
                defaultTemplateId:
                    formData.body?.defaultTemplateId ?
                        isValidUUID(formData.body?.defaultTemplateId) ?
                            ""
                            : "uuid non valido"
                        : "Campo obbligatorio",
                defaultTemplateVersion: typeof formData.body?.defaultTemplateVersion !== "undefined" ? "" : "Campo obbligatorio",
                branchesConfigs:
                    formData.body?.branchesConfigs ?
                        formData.body?.branchesConfigs.map((branch) => ({
                            branchId: branch.branchId ? "" : "Campo obbligatorio",
                            branchDefaultTemplateId: branch?.branchDefaultTemplateId ?
                                isValidUUID(branch.branchDefaultTemplateId) ? "" : "uuid non valido"
                                : "Campo obbligatorio",
                            branchDefaultTemplateVersion: branch?.branchDefaultTemplateVersion ? "" : "Campo obbligatorio",
                            terminals: branch?.terminals ?
                                branch.terminals.map((terminal) => ({
                                    templateId: terminal?.templateId ?
                                        isValidUUID(terminal.templateId) ? "" : "uuid non valido"
                                        : "CampoObbligatorio",
                                    templateVersion: terminal?.templateVersion ? "" : "Campo obbligatorio",
                                    terminalIds: terminal?.terminalIds ?
                                        terminal.terminalIds.map((id) => (id ? "" : "Campo obbligatorio"))
                                        : [""]
                                }))
                                : [initialTerminalErrors]
                        }))
                        : [initialBranchesConfigErrors],
            }
        };

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => !error);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            console.log("VALUES:", formData);
        }
    };

    const handleInputChange = (field: string, value: string | number) => {
        resetErrors(errors, setErrors, field);
        setFormData(() => ({...formData,[field]: value}));
    };

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		resetErrors(errors, setErrors, e.target.name);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

    const handleBranchChange = (index: number, field: string, value: string | number) => {
        setFormData((prevData) => {
            const updatedBranches = [...prevData.body?.branchesConfigs ?? []];
            // eslint-disable-next-line functional/immutable-data
            updatedBranches[index] = {
                ...updatedBranches[index],
                [field]: value,
            };

            return {
                ...prevData,
                body: {
                    ...prevData.body,
                    branchesConfigs: updatedBranches,
                },
            };
        });
    };

    const addBranches = () => {
        setFormData((prevData) => {
            const updatedBranches = [
                ...(prevData.body?.branchesConfigs ?? []),
                {
                    ...branchesInitialValues,
                    branchId: undefined
                }
            ];

            const updatedErrors = {
                ...errors,
                body: {
                    ...errors.body,
                    branchesConfigs: [
                        ...(errors.body?.branchesConfigs ?? []),
                        { ...initialBranchesConfigErrors }
                    ]
                }
            };

            setErrors(updatedErrors);
            return {
                ...prevData,
                body: {
                    ...prevData.body,
                    branchesConfigs: updatedBranches,
                },
            };
        });
    };

    const removeBranches = (index: number) => {
        setFormData((prevData) => {
            const updatedBranches = [...prevData.body?.branchesConfigs ?? []];
            // eslint-disable-next-line functional/immutable-data
            updatedBranches.splice(index, 1);

            const updatedErrors = {
                ...errors,
                body: {
                    ...errors.body,
                    branchesConfigs: [...errors.body?.branchesConfigs ?? []]
                }
            };
            // eslint-disable-next-line functional/immutable-data
            updatedErrors.body.branchesConfigs.splice(index, 1);

            setErrors(updatedErrors);
            return {
                ...prevData,
                body: {
                    ...prevData.body,
                    branchesConfigs: updatedBranches,
                },
            };
        });
    };

    const addTerminal = (branchIndex: number, newTerminal: TerminalDto) => {
        setFormData((prevData) => {
            const updatedBranches = (prevData.body?.branchesConfigs ?? []).map((branch, index) => {
                if (index === branchIndex) {
                    return {
                        ...branch,
                        terminals: [...(branch.terminals ?? []), newTerminal]
                    };
                }
                return branch;
            });

            const updatedErrors = {
                ...errors,
                body: {
                    ...errors.body,
                    branchesConfigs: (errors.body?.branchesConfigs ?? []).map((branch, i) => {
                        if (i === branchIndex) {
                            return {
                                ...branch,
                                terminals: [
                                    ...(branch.terminals ?? []),
                                    { ...initialTerminalErrors }
                                ]
                            };
                        }
                        return branch;
                    })
                }
            };

            setErrors(updatedErrors);
            return {
                ...prevData,
                body: {
                    ...prevData.body,
                    branchesConfigs: updatedBranches,
                },
            };
        });
    };

    const removeTerminal = (branchIndex: number, terminalIndex: number) => {
        setFormData((prevData) => ({
            ...prevData,
            body: {
                ...prevData.body,
                branchesConfigs: (prevData.body?.branchesConfigs ?? []).map((branch, i) =>
                    i === branchIndex
                        ? {
                            ...branch,
                            terminals: branch.terminals?.filter((_terminal, termIndex) => termIndex !== terminalIndex)
                        }
                        : branch
                )
            }
        }));

        setErrors((prevErrors) => {
            const updatedErrors = {
                ...prevErrors,
                body: {
                    ...prevErrors.body,
                    branchesConfigs: (prevErrors.body?.branchesConfigs ?? []).map((branch, i) =>
                        i === branchIndex
                            ? {
                                ...branch,
                                terminals: branch.terminals?.filter((_terminal, termIndex) => termIndex !== terminalIndex)
                            }
                            : branch
                    )
                }
            };

            return updatedErrors;
        });
    };

    return (
        <FormTemplate handleSubmit={handleSubmit} getFormOptions={getFormOptions(ASSOCIATE_BPMN)}>
          
                <Grid xs={12} item my={1}>
                    <TextField
                        fullWidth
                        id="acquirerId"
                        name="acquirerId"
                        label={"ID banca"}
                        placeholder={"aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"}
                        size="small"
                        value={formData.acquirerId}
                        onChange={handleChange}
                        error={Boolean(errors.acquirerId)}
                        helperText={errors.acquirerId}
                    />
                </Grid>
                <Grid xs={12} item my={1}>
                    <TextField
                        fullWidth
                        id="functionType"
                        name="functionType"
                        label={"Funzionalità"}
                        placeholder={"Funzionalità"}
                        size="small"
                        value={formData.functionType}
                        onChange={handleChange}
                        error={Boolean(errors.functionType)}
                        helperText={errors.functionType}
                    />
                </Grid>
                <Grid xs={12} item my={1}>
                    <TextField
                        fullWidth
                        id="defaultTemplateId"
                        name="defaultTemplateId"
                        label={"ID processo di default"}
                        placeholder={"aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"}
                        size="small"
                        value={formData.body?.defaultTemplateId ?? undefined}
                        onChange={handleChange}
                        error={Boolean(errors.body.defaultTemplateId)}
                        helperText={errors.body.defaultTemplateId}
                    />
                </Grid>
                <Grid xs={12} item my={1}>
                    <TextField
                        fullWidth
                        id="defaultTemplateVersion"
                        name="defaultTemplateVersion"
                        label={"Versione processo di default"}
                        placeholder={"Versione processo di default"}
                        size="small"
                        type="number"
                        value={formData.body?.defaultTemplateVersion ?? undefined}
                        onChange={(e) => handleInputChange("defaultTemplateVersion", parseInt(e.target.value, 10))}
                        error={Boolean(errors.body.defaultTemplateVersion)}
                        helperText={errors.body.defaultTemplateVersion}
                    />
                </Grid>
                <Grid container item mb={1}>
                    <Button variant="text" size="small" onClick={() => addBranches()}>
                        Aggiungi filiale
                    </Button>
                </Grid>
                <Grid container item my={1}>
                    {
                        formData.body?.branchesConfigs &&
                            formData.body.branchesConfigs.map((branch, branchIndex) => (
                                <Box key={branch.branchId} display={"flex"} flexDirection={"row"} width={"100%"}>
                                    <RemoveCircleOutline
                                        color="error"
                                        sx={{
                                            cursor: "pointer",
                                        }}
                                        onClick={() => removeBranches(branchIndex)}
                                    />
                                    <Box display="flex"
                                        flexDirection="column"
                                        justifyContent="center"
                                        alignItems="center"
                                        sx={{
                                            borderRadius: 1,
                                            border: 1,
                                            borderColor: theme.palette.divider,
                                            p: 3,
                                            mb: 3,
                                            width: "-webkit-fill-available"
                                        }}
                                        ml={2}
                                        key={`id${branch.branchId}`}
                                    >
                                        {branch && (
                                            <>
                                                <Grid container item my={1} >
                                                    <TextField
                                                        fullWidth
                                                        id="branchId"
                                                        name="branchId"
                                                        label={"ID filiale"}
                                                        placeholder={"ID filiale"}
                                                        size="small"
                                                        value={branch.branchId}
                                                        onChange={(e) => handleBranchChange(branchIndex, "branchId", e.target.value)}
                                                        error={Boolean(errors.body.branchesConfigs[branchIndex]?.branchId)}
                                                        helperText={errors.body.branchesConfigs[branchIndex]?.branchId}
                                                    />
                                                </Grid>
                                                <Grid container item my={1} >
                                                    <TextField
                                                        fullWidth
                                                        id="branchDefaultTemplateId"
                                                        name="branchDefaultTemplateId"
                                                        label={"ID processo della filiale"}
                                                        placeholder={"aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"}
                                                        size="small"
                                                        value={branch.branchDefaultTemplateId}
                                                        onChange={(e) => handleBranchChange(branchIndex, "branchDefaultTemplateId", e.target.value)}
                                                        error={Boolean(errors.body.branchesConfigs[branchIndex]?.branchDefaultTemplateId)}
                                                        helperText={errors.body.branchesConfigs[branchIndex]?.branchDefaultTemplateId}
                                                    />
                                                </Grid>
                                                <Grid container item my={1} >
                                                    <TextField
                                                        fullWidth
                                                        id="branchDefaultTemplateVersion"
                                                        name="branchDefaultTemplateVersion"
                                                        label={"Versione processo della filiale"}
                                                        placeholder={"Versione processo della filiale"}
                                                        size="small"
                                                        type="number"
                                                        value={branch.branchDefaultTemplateVersion}
                                                        onChange={(e) => handleBranchChange(branchIndex, "branchDefaultTemplateVersion", parseInt(e.target.value, 10))}
                                                        error={Boolean(errors.body.branchesConfigs[branchIndex]?.branchDefaultTemplateVersion)}
                                                        helperText={errors.body.branchesConfigs[branchIndex]?.branchDefaultTemplateVersion}
                                                    />
                                                </Grid>
                                                <Grid container item mb={1}>
                                                    <Button variant="text" size="small" onClick={() => addTerminal(branchIndex, terminalsInitialValues)}>
                                                        Aggiungi terminale
                                                    </Button>
                                                </Grid>
                                                {
                                                    formData.body?.branchesConfigs && formData.body?.branchesConfigs[branchIndex].terminals?.map((terminal, terminalIndex) => (
                                                        <Box key={terminal.templateId} display={"flex"} flexDirection={"row"} width={"100%"}>
                                                            <RemoveCircleOutline
                                                                color="error"
                                                                sx={{
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() => removeTerminal(branchIndex, terminalIndex)}
                                                            />
                                                            <Box display="flex"
                                                                flexDirection="column"
                                                                justifyContent="center"
                                                                alignItems="center"
                                                                sx={{
                                                                    borderRadius: 1,
                                                                    border: 1,
                                                                    borderColor: theme.palette.divider,
                                                                    p: 3,
                                                                    mb: 3,
                                                                    width: "-webkit-fill-available"
                                                                }}
                                                                ml={2}

                                                            >
                                                                <Grid container item my={1}>
                                                                    <TextField
                                                                        fullWidth
                                                                        id="templateId"
                                                                        name="templateId"
                                                                        label={"ID processo del terminale"}
                                                                        placeholder={"aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"}
                                                                        size="small"
                                                                        value={terminal.templateId}
                                                                        onChange={(e) => e.target.value}
                                                                        error={Boolean(errors.body.branchesConfigs[branchIndex]?.terminals[terminalIndex]?.templateId)}
                                                                        helperText={errors.body.branchesConfigs[branchIndex]?.terminals[terminalIndex]?.templateId}
                                                                    />
                                                                </Grid>
                                                                <Grid container item my={1} >
                                                                    <TextField
                                                                        fullWidth
                                                                        id="templateVersion"
                                                                        name="templateVersion"
                                                                        label={"Versione processo del terminale"}
                                                                        placeholder={"Versione processo del terminale"}
                                                                        size="small"
                                                                        type="number"
                                                                        value={terminal.templateVersion}
                                                                        onChange={(e) => e.target.value}
                                                                        error={Boolean(errors.body.branchesConfigs[branchIndex]?.terminals[terminalIndex]?.templateVersion)}
                                                                        helperText={errors.body.branchesConfigs[branchIndex]?.terminals[terminalIndex]?.templateVersion}
                                                                    />
                                                                </Grid>
                                                            </Box>
                                                        </Box>
                                                    ))
                                                }
                                            </>
                                        )}
                                    </Box>
                                </Box>
                            )) 
                    }
                </Grid>
           
        </FormTemplate>
    );
};

export default AssociateBpmn;
