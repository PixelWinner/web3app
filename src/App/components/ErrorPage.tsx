import React, { FC } from "react";


export type ErrorPageProps = {
    error?: Error;
};
const ErrorPage:FC<ErrorPageProps> = ({error}) => {
    return (
        <div>
            {error?.message ?? JSON.stringify(error)}
        </div>
    );
};

export default ErrorPage;