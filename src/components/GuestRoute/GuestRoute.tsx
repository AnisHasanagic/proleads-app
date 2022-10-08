import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkIfUserIsAuthenticated } from "../../store/user/user.actions";

export const GuestRoute = (props: any): any => {
    const { children } = props;

    const user = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        (async (): Promise<void> => {
            if (!user.userChecked) dispatch(checkIfUserIsAuthenticated());
        })();
    }, []);

    if (!user.userChecked) return null;

    if (
        user.userChecked &&
        user.token &&
        user.role &&
        user.role === "admin"
    )
        return <Navigate replace to="/dashboard" />;

        if (
            user.userChecked &&
            user.token &&
            user.role &&
            user.role === "agent"
        )
            return <Navigate replace to="/dashboard" />;

    return children;
};