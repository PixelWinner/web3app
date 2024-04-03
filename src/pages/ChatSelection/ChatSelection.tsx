import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import { useFormik } from "formik";
import { z } from "zod";
import { PAGE_PATH } from "@utils/constants/common.constants";
import { useNavigate } from "react-router-dom";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { IOSocket } from "@utils/socket/IOSocket";
import { EventType } from "@utils/typings/enums/common.enums";
import { useAppContext } from "@utils/providers/AppProvider";
import { JoinData } from "@utils/typings/types/common.types";


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

const ChatSelection = () => {
    const { userName, userId } = useAppContext();
    const navigate = useNavigate();

    const initialValues = {
        chatId: ""
    };

    const formikHook = useFormik({
        initialValues,
        validationSchema,
        onSubmit: ({ chatId }) => {
            const joinData:JoinData = { userId, userName, chatId };

            IOSocket.emit(EventType.JOIN, joinData);
            navigate(`${PAGE_PATH.chat}/${chatId}`);
        }
    });

    return (
        <Container>
            <Typography variant="h3">Enter the chat room Id</Typography>

            <Form onSubmit={formikHook.handleSubmit}>
                <TextField label="Chat Id" name="chatId" value={formikHook.values.chatId} error={formikHook.touched.chatId && Boolean(formikHook.errors.chatId)}
                           helperText={formikHook.touched.chatId && formikHook.errors.chatId} onChange={formikHook.handleChange} />

                <Button variant="contained" type="submit">Enter</Button>
            </Form>
        </Container>
    );
};

export default ChatSelection;

const validationSchema = toFormikValidationSchema(z.object({ chatId: z.string().min(1) }));