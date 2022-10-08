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
            name: "Admin Panel",
            link: "/dashboard/admin-panel",
            isActiveSub:
                route.pathname === "/dashboard/admin-panel/users" ||
                route.pathname === "/dashboard/admin-panel/company",
            adminOnly: true,
            sub: [
                {
                    name: "Users",
                    icon: faUsers,
                    link: "/dashboard/admin-panel/users",
                    isActive: route.pathname === "/dashboard/admin-panel/users",
                    description: "List of users",
                },
                {
                    name: "Company",
                    icon: faUsers,
                    link: "/dashboard/admin-panel/company",
                    isActive:
                        route.pathname === "/dashboard/admin-panel/company",
                    description: "List of companies",
                },
            ],
        },
        {
            name: "Dashboard",
            link: "/dashboard",
            isActiveSub: route.pathname === "/dashboard",
            sub: [
                {
                    name: "Dashboard",
                    link: "/dashboard",
                    isActive: route.pathname === "/dashboard",
                    description: "Dashboard of ProLeads app",
                },
                {
                    name: "Companies",
                    link: "/dashboard/company",
                    isActive: route.pathname === "/dashboard/company",
                    description: "List of companies",
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
                <div className="top">
                    <Link to="/dashboard" className="mr-5">
                     <h1>PROLEADS d.o.o.</h1>
                    </Link>
                </div>
                <div className="menu">
                    {menuItems.map((menu, index) => {
                        if (menu.adminOnly && user.role !== 'admin') return null;
                    
                        return (
                            <div key={index} className="menu-item">
                                <div className="top-menu-item flex">
                                    
                                    <div>
                                        <p className="title">{menu.name}</p>
                                    </div>
                                </div>
                                <ul className={`active`}>
                                    {menu.sub.map((item, index) => (
                                        <Link key={index} to={item.link}>
                                            <li
                                                className={`flex ${
                                                    item.isActive
                                                        ? "active"
                                                        : ""
                                                }`}
                                            >
                                                {/* <div className="icon"></div> */}
                                                <div>
                                                    <p className="title">
                                                        {item.name}
                                                    </p>
                                                    <p className="desc">
                                                        {item.description}
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
                <div className="user-data flex mt-auto">
                    <Link to={"/dashboard/account"} className="flex">
                        <div className="image" ref={imageRef}></div>
                        <div className="data">
                            <p>{user.email}</p>
                            <p className="role">{user.role}</p>
                        </div>
                    </Link>
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