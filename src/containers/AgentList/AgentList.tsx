import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonTypes } from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import CallModal from "../../components/Modal/Modals/CallModal/CallModal";
import Table from "../../components/Table/Table";
import DashboardLayout from "../../layouts/DashboardLayout";
import { loadCompanies } from "../../store/company/company.actions";
import { Input } from "../../components/Input/Input";
import "./AgentList.scss";

function AgentList() {
    const dispatch = useDispatch();

    const [currentCompany, setCurrentCompany] = useState<any>(null);
    const [isAdd, setIsAdd] = useState<any>(false);
    
     const [searchValue,setSearchValue] = useState("")
   
     

    const company = useSelector((state: any) => state.company);

    useEffect(() => {
        dispatch(loadCompanies());
    }, []);

    const showCompany = (companys: any) => {
        setIsAdd(false);
        setCurrentCompany(companys);
    };
      
   

    const actions = [
        {
            name: "Edit",
            row: "id",
            text: "Call",
            action: showCompany,
        },
    ];

    const columnsToShow = [
        "name",
        "address",
    ];

    const keys = [
        "name",
        "address"
    ]

    const search = (data:any) => {
        return data.filter(
            (item:any) => 
            keys.some(key =>item[key].toLowerCase().includes(searchValue)))
    }

    
    return (
        <DashboardLayout>
            <section id="admin-company">
                    <div className="mr-3">
                        <h1>All company</h1>
                        <p>List of all company.</p>
                    </div>
                <Input
                id={"search"}
                type={"text"}
                className={"search"}
                onChange={(e: any): void => setSearchValue(e.target.value)}
                placeholder={"Search..."}
            />
                <Table
                    data={search(company.list)}
                    actions={actions}
                    columnsToShow={columnsToShow}
                />
            </section>
            <Modal
                show={currentCompany}
                closeModal={() => setCurrentCompany(null)}
            >
            <CallModal companys={currentCompany} isAdd="true"/>
            </Modal>
        </DashboardLayout>
    );
}

export default AgentList;