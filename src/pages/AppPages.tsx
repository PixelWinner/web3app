import React, { lazy, Suspense } from "react";
import { useAppContext } from "@utils/providers/AppProvider";
import { PAGE_PATH } from "@utils/constants/common.constants";
import { Navigate, Route, Routes } from "react-router-dom";
import BackdropLoader from "@components/BackdropLoader";
import AppLayout from "../App/Layout/AppLayout";
import PrivateLayout from "../App/Layout/PrivateLayout";
import PublicLayout from "../App/Layout/PublicLayout";

const Login = lazy((() => import ("@pages/Login/Login")));
const Chat = lazy((() => import("@pages/Chat/Chat")));
const ChatSelection = lazy((() => import("@pages/ChatSelection/ChatSelection")));

const AppPages = () => {
    const Loader = <BackdropLoader isLoading />;
    const { userName } = useAppContext();

    const getInitialRoute = () => {
        if (userName) {
            return PAGE_PATH.chatSelection;
        }

        return PAGE_PATH.login;
    };

    const privateRoutes = [
        {
            path: `${PAGE_PATH.chat}/:id`,
            element: <Chat />
        },
        {
            path: `${PAGE_PATH.chatSelection}`,
            element: <ChatSelection />
        }
    ].map(({ path, element }) => <Route key={path} path={path} element={<Suspense fallback={Loader}>{element}</Suspense>} />);

    const publicRoutes = [
        {
            path: PAGE_PATH.login,
            element: <Login />
        }
    ].map(({ path, element }) => <Route key={path} path={path} element={<Suspense fallback={Loader}>{element}</Suspense>} />);


    return (
        <Routes>
            <Route path={PAGE_PATH.main} element={<AppLayout />}>
                <Route index element={<Navigate to={getInitialRoute()} replace />} />
                <Route element={<PrivateLayout />}>{privateRoutes}</Route>
                <Route element={<PublicLayout />}>{publicRoutes}</Route>
                <Route path="*" element={<Navigate to={PAGE_PATH.main} replace />} />
            </Route>
        </Routes>
    );

};

export default AppPages;