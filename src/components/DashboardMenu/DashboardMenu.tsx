import {
    faBars,
    faClose,
    faRightFromBracket,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../store/user/user.actions";
import { onlyCapitalLetters } from "../../utils/helpers";

import DashboardIcon from "../../assets/icon.svg";
import Users from "../../assets/users.svg";
import Export from "../../assets/export.svg";
import Companies from "../../assets/Vector.svg";
import CallIcon from "../../assets/call.svg";

import logo from "../../assets/logo.svg";
import "./DashboardMenu.scss";

export const DashboardMenu = React.memo(({ isActive }: any) => {
    const dispatch = useDispatch();
    const imageRef = useRef(null);

    const [isMobileMenuActive, setIsMobileMenuActive] =
        useState<boolean>(false);

    const user = useSelector((state: any) => state.user);

    const route = useLocation();

    const menuItems = [
        {
            sub: [
                {
                    name: "Dashboard",
                    link: "/dashboard",
                    icon: DashboardIcon,
                    isActive: route.pathname === "/dashboard",
                },
            ],
        },
        {
            name: "Admin Panel",
            link: "/dashboard/admin-panel",
            isActiveSub:
                route.pathname === "/dashboard/admin-panel/users" ||
                route.pathname === "/dashboard/admin-panel/company",
            adminOnly: true,
            sub: [
                {
                    name: "Users List",
                    icon: Users,
                    link: "/dashboard/admin-panel/users",
                    isActive: route.pathname === "/dashboard/admin-panel/users",
                },
                {
                    name: "Companies List",
                    icon: Companies,
                    link: "/dashboard/admin-panel/company",
                    isActive:
                        route.pathname === "/dashboard/admin-panel/company",
                },
                {
                    name: "Export",
                    icon: Export,
                    link: "/dashboard/admin-panel/calls",
                    isActive: route.pathname === "/dashboard/admin-panel/calls",
                },
            ],
        },
        {
            name: "General",
            link: "/dashboard",
            isActiveSub: route.pathname === "/dashboard",
            sub: [
                {
                    name: "Calls",
                    icon: CallIcon,
                    link: "/dashboard/calls",
                    isActive: route.pathname === "/dashboard/calls",
                },
            ],
        },
    ];

    return (
        <section
            id="dashboard-menu"
            className={`flex ${isMobileMenuActive ? "active-mobile" : ""}`}
        >
            <div
                onClick={() => setIsMobileMenuActive(!isMobileMenuActive)}
                className={`flex items-center ml-auto hamburger-menu ${
                    isMobileMenuActive ? "active" : ""
                }`}
            >
                <FontAwesomeIcon
                    icon={isMobileMenuActive ? faClose : faBars}
                    size={"2x"}
                />
            </div>
            <div className="right active">
                <Link to="/dashboard" className="mr-5">
                    <div className="top">
                        <img className="logo-image" src={logo} alt="" />
                        <div className="proleads">
                            <h1 className="hed">ProLeads</h1>
                            <h2 className="inb">Inbound</h2>
                        </div>
                    </div>
                </Link>
                <div className="menu">
                    {menuItems.map((menu, index) => {
                        if (menu.adminOnly && user.role !== "admin")
                            return null;

                        return (
                            <div key={index} className="menu-item">
                                {menu.name && (
                                    <div className="top-menu-item flex">
                                        <div>
                                            <p className="title">{menu.name}</p>
                                        </div>
                                    </div>
                                )}
                                <ul className={`active`}>
                                    {menu.sub.map((item, index) => (
                                        <Link
                                            key={index}
                                            to={item.link}
                                            className="links"
                                        >
                                            <li
                                                className={`flex ${
                                                    item.isActive
                                                        ? "active"
                                                        : ""
                                                }`}
                                            >
                                                <div className="icon">
                                                    <img
                                                        src={item.icon}
                                                        alt=""
                                                    />
                                                </div>
                                                <div>
                                                    <p className="title">
                                                        {item.name}
                                                    </p>
                                                </div>
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
                <div className="logoutBar">
                    <div>
                        <h2 className="userInfo">{user.username}</h2>
                        <h3 className="userRole">{user.role}</h3>
                    </div>
                    <div
                        onClick={(e: any) => {
                            e.stopPropagation();
                            dispatch(logout());
                        }}
                        className="logout"
                    >
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </div>
                </div>
            </div>
        </section>
    );
});
