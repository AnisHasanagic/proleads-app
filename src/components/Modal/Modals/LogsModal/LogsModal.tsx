import React from "react";
import { useDispatch } from "react-redux";
import { clearAllLogs } from "../../../../store/users/users.actions";
import { Button, ButtonTypes } from "../../../Button/Button";
import Table from "../../../Table/Table";

import "./LogsModal.scss";

function LogsModal({ logs, user_id, clearUsersLogs }: any) {
    const dispatch = useDispatch();

    const columnsToShow = ["ip_address", "created_at"];

    return (
        <div id="logs-modal">
            {logs && logs.length > 0 && (
                <Table data={logs} columnsToShow={columnsToShow} />
            )}
            {logs && logs.length > 0 && (
                <Button
                    btnClass={ButtonTypes.secondary}
                    customClass="mt-4"
                    onClick={() => dispatch(clearAllLogs(user_id, clearUsersLogs))}
                >
                    Clear logs
                </Button>
            )}
            {logs && logs.length <= 0 && <p>No logs found for the user.</p>}
        </div>
    );
}

export default LogsModal;
