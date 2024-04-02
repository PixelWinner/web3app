import React, { FC } from "react";
import { Transaction } from "@utils/typings/types/common.types";
import { Box, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import styled from "styled-components";
import { format } from "date-fns";
import { DATE_TIME_FORMAT } from "@utils/constants/common.constants";


const TooltipContent = styled(Box)`
    display: flex;
    flex-direction: column;
    height: max-content;
    gap: 4px`;

const TextContainer = styled(Box)`
    display: flex;
    flex-direction: column;
`;


type DetailsProps = {
    transactions: Transaction[]
}

const Details: FC<DetailsProps> = ({ transactions }) => {
    if (transactions.length === 0) {
        return null;
    }

    const details = transactions.map((transaction) => (
        <TextContainer key={transaction.txId}>
            <Typography variant="subtitle1">Tx id: {transaction.txId}</Typography>
            <Typography variant="subtitle1">From: {transaction.from}</Typography>
            <Typography variant="subtitle1">To: {transaction.to}</Typography>
            <Typography variant="subtitle1">Value: {transaction.value} ETH</Typography>
            <Typography variant="subtitle1">Date: {format(new Date(transaction.date), DATE_TIME_FORMAT.shortDate)}</Typography>
        </TextContainer>
    ));

    return (
        <Tooltip placement="top" title={<TooltipContent>{details}</TooltipContent>}>
            <InfoIcon color="primary" />
        </Tooltip>
    );
};

export default Details;