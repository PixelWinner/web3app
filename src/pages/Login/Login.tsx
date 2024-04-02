import React from "react";
import styled from "styled-components";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useAppContext } from "@utils/providers/AppProvider";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const Container = styled(Box)`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px`;

const Form = styled.form`
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center`;

const Login = () => {
    const { setNewUserName } = useAppContext();

    const initialValues = {
        userName: ""
    };

    const formikHook = useFormik({
        initialValues,
        validationSchema,
        onSubmit: ({ userName }) => {
            setNewUserName(userName);
        }
    });

    return (
        <Container>
            <Typography variant="h3">Enter your user name</Typography>

            <Form onSubmit={formikHook.handleSubmit}>
                <TextField label="User Name" name="userName" value={formikHook.values.userName} error={formikHook.touched.userName && Boolean(formikHook.errors.userName)}
                           helperText={formikHook.touched.userName && formikHook.errors.userName} onChange={formikHook.handleChange} />

                <Button variant="contained" type="submit">Enter</Button>
            </Form>
        </Container>
    );
};

export default Login;

const validationSchema = toFormikValidationSchema(z.object({ userName: z.string().min(3) }));