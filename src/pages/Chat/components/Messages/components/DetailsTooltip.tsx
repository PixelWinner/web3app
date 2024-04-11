import React, { FC } from "react";
import { Transaction } from "@utils/typings/types/common.types";
import { Box, Tooltip, TooltipProps, Typography } from "@mui/material";
import styled from "styled-components";
import { format } from "date-fns";
import { DATE_TIME_FORMAT } from "@utils/constants/common.constants";

const TextContainer = styled(Box)`
    display: flex;
    flex-direction: column;
`;

type DetailsProps = {
    transaction: Transaction,
} & Omit<TooltipProps, "title">

const DetailsTooltip: FC<DetailsProps> = ({ transaction, ...rest }) => {
    const { children, ...otherProps } = rest;

    const details = (
        <TextContainer key={transaction.txId}>
            <Typography variant="subtitle1">Tx id: {transaction.txId}</Typography>
            <Typography variant="subtitle1">From: {transaction.from}</Typography>
            <Typography variant="subtitle1">To: {transaction.to}</Typography>
            <Typography variant="subtitle1">Value: {transaction.value} ETH</Typography>
            <Typography variant="subtitle1">Date: {format(new Date(transaction.date), DATE_TIME_FORMAT.shortDate)}</Typography>
        </TextContainer>
    );

    return (
        <Tooltip placement="top" arrow title={details} {...otherProps}>
            {children}
        </Tooltip>
    );
};

export default DetailsTooltip;