import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PAGE_PATH } from "@utils/constants/common.constants";
import { useAppContext } from "@utils/providers/AppProvider";

const AUTH_PAGES = [PAGE_PATH.login];

const PublicLayout = () => {
    const { userName } = useAppContext();
    const { pathname } = useLocation();

    const isNeedRedirect = !!userName && AUTH_PAGES.includes(pathname);

    if (isNeedRedirect) {
        return <Navigate to={PAGE_PATH.main} replace />;
    }

    return <Outlet />;
};

export default PublicLayout;