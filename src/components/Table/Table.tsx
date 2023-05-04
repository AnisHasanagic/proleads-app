import React from "react";
import { useTable } from "react-table";
import classnames from "classnames";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import { useMemo } from "react";

import "./Table.scss";

const Table = ({
    data,
    actions,
    columnsToShow,
    hidePagination,
    hideHeaders,
    small,
    showAll,
    actionsOnRow = {},
}: any) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(!showAll ? 5 : -1);
    const columns = useMemo(() => {
        let columns: any = [];
        if (columnsToShow)
            columns = Object.keys(data[0] ? data[0] : {}).filter((el) => {
                return columnsToShow.includes(el);
            });

        columns = columns.map((el: string) => {
            return {
                Header: el.replace(/_/g, " "),
                accessor: el,
                Cell: ({ value }: any) => {
                    let string = String(value);

                    if (string.length >= 100) {
                        string = string.slice(0, 100) + "...";
                    }

                    return string;
                },
            };
        });

        if (actions) {
            const action_columns = actions.map((action: any) => {
                return {
                    id: action.name,
                    accessor: action.row,
                    Cell: ({ row }: any) => (
                        <IconButton
                            className="icon"
                            onClick={() => action.action(row.original)}
                        >
                            {action.icon}
                        </IconButton>
                    ),
                    width: 40,
                };
            });

            columns = [...columns, ...action_columns];
        }

        return columns;
    }, [data, actions, columnsToShow]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const preparedData = hidePagination
        ? data
        : data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data: preparedData });

    return (
        <div
            className={classnames("table100 ver1", {
                small: small,
            })}
        >
            <div>
                <table {...getTableProps()}>
                    {!hideHeaders && (
                        <thead className="table100-head">
                            {headerGroups.map((headerGroup) => (
                                <tr
                                    {...headerGroup.getHeaderGroupProps()}
                                    className="row100 head"
                                >
                                    {headerGroup.headers.map((column) => (
                                        <th
                                            {...column.getHeaderProps()}
                                            className="cell100"
                                        >
                                            {column.render("Header")}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                    )}
                    <tbody {...getTableBodyProps()} className="table100-body">
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr
                                    {...row.getRowProps()}
                                    className={classnames("row100 body", {
                                        deleted: (row.original as any)
                                            .isDeleted,
                                    })}
                                >
                                    {row.cells.map((cell) => {
                                        return (
                                            <td
                                                {...cell.getCellProps({
                                                    style: {
                                                        width: cell.column
                                                            .width,
                                                    },
                                                })}
                                                className="cell100"
                                                onClick={actionsOnRow[cell.column.id] ? () => actionsOnRow[cell.column.id](cell.row.original) : undefined}
                                            >
                                                {cell.render("Cell")}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {!hidePagination && (
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
            </div>
        </div>
    );
};

export default Table;
