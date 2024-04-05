import React from "react";
import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import { useAppContext } from "@utils/providers/AppProvider";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { IOSocket } from "@utils/socket/IOSocket";
import { EventType } from "@utils/typings/enums/common.enums";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { UserMessage } from "@utils/typings/types/common.types";

const Form = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 0;
    width: 100%;
    gap: 8px;`;

const UserInput = () => {
    const { id } = useParams();
    const { userName } = useAppContext();

    const initialValues = {
        text: ""
    };

    const formikHook = useFormik({
        initialValues,
        validationSchema,
        onSubmit: ({ text }, formikHelpers) => {
            if (id) {
                const message: UserMessage = { text, chatId: id, userName };

                IOSocket.emit(EventType.MESSAGE, message);
                formikHelpers.resetForm();
            }
        }
    });

    return (
        <Form onSubmit={formikHook.handleSubmit}>
            <TextField autoComplete="off" fullWidth label="Message" name="text" value={formikHook.values.text}
                       error={formikHook.touched.text && Boolean(formikHook.errors.text)}
                       helperText={formikHook.touched.text && formikHook.errors.text} onChange={formikHook.handleChange} />

            <Button disabled={!id} variant="contained" type="submit">Enter</Button>
        </Form>
    );
};

export default UserInput;

const validationSchema = toFormikValidationSchema(z.object({ text: z.string().min(1) }));