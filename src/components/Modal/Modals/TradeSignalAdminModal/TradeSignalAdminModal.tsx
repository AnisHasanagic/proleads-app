import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTradeSignal, updateTradeSignal } from "../../../../store/trade_signals/trade_signals.actions";
import { Button, ButtonTypes } from "../../../Button/Button";
import { Checkbox } from "../../../Checkbox/Checkbox";
import { Form } from "../../../Form/Form";
import { Input } from "../../../Input/Input";
import { Select } from "../../../Select/Select";

import "./TradeSignalAdminModal.scss";

function TradeSignalAdminModal({ trade_signal, isAdd }: any) {
    const dispatch = useDispatch();

    const trade_signals = useSelector((state: any) => state.trade_signals);

    const INITIAL_BLOG = {
        action: "",
        pair: "",
        op: "",
        tp: "",
        sl: "",
        exchange: "",
        description: "",
        is_active: true,
    };

    const [newTradeSignal, setNewTradeSignal] = useState<any>(INITIAL_BLOG);
    const [newTradeSignalErrors, setNewTradeSignalErrors] = useState<any>({});

    const validations: any = {
        action: {
            isRequired: true,
        },
        pair: {
            isRequired: true,
        },
        op: {
            isRequired: true,
        },
        tp: {
            isRequired: true,
        },
        sl: {
            isRequired: true,
        },
        exchange: {
            isRequired: true,
        },
        description: {
            isRequred: true,
        },
        is_active: {
            isRequred: true,
            isBoolean: true,
        },
    };

    const changeEvent = (e: any): void => {
        const name = e.target.name;
        const value = e.target.value;

        const validator = validations[name];
        const errors = [];

        if (validator) {
            if (validator.isRequired) {
                if (validator.isBoolean) {
                    if (value !== true || value !== false) {
                        errors.push("REQUIRED_FIELD");
                    }
                } else {
                    if (value.length < 1) {
                        errors.push("REQUIRED_FIELD");
                    }
                }
            }
        }

        setNewTradeSignal({
            ...newTradeSignal,
            [name]: value,
        });
        if (errors.length > 0)
            setNewTradeSignalErrors({
                ...newTradeSignalErrors,
                [name]: errors,
            });
        else
            setNewTradeSignalErrors({
                ...newTradeSignalErrors,
                [name]: [],
            });
    };

    const blurEvent = (e: any): void => {
        const name = e.target.name;
        const value = e.target.value;

        const validator = validations[name];
        const errors = [];

        if (validator) {
            if (validator.isRequired) {
                if (validator.isBoolean) {
                    if (value !== true || value !== false) {
                        errors.push("REQUIRED_FIELD");
                    }
                } else {
                    if (value.length < 1) {
                        errors.push("REQUIRED_FIELD");
                    }
                }
            }
        }

        setNewTradeSignal({
            ...newTradeSignal,
            [name]: value ? value.trim() : "",
        });

        if (errors.length > 0)
            setNewTradeSignalErrors({
                ...newTradeSignalErrors,
                [name]: errors,
            });
        else
            setNewTradeSignalErrors({
                ...newTradeSignalErrors,
                [name]: [],
            });
    };

    const hasSomeErrors = (): boolean => {
        const hasErrors = Object.keys(newTradeSignalErrors).some(
            (value: any) => newTradeSignalErrors[value].length > 0
        );

        return hasErrors;
    };

    useEffect(() => {
        if (trade_signal) {
            setNewTradeSignal({
                action: trade_signal.action,
                pair: trade_signal.pair,
                op: trade_signal.op,
                tp: trade_signal.tp,
                sl: trade_signal.sl,
                exchange: trade_signal.exchange,
                description: trade_signal.description,
                is_active: !!trade_signal.is_active,
            });
            setNewTradeSignalErrors({});
        }
    }, [trade_signal]);

    useEffect(() => {
        if (trade_signals.update.errors) {
            setNewTradeSignalErrors(trade_signals.update.errors);
        }
    }, [trade_signals.update]);

    useEffect(() => {
        if (trade_signals.add.errors) {
            setNewTradeSignalErrors(trade_signals.add.errors);
        }
    }, [trade_signals.add]);

    const actionsList = [
        {
            value: "",
            label: "Select Action",
        },
        {
            value: "long",
            label: "Long",
        },
        {
            value: "short",
            label: "Short",
        },
        {
            value: "sell_spot",
            label: "Sell Spot",
        },
        {
            value: "buy_spot",
            label: "Buy Spot",
        },
    ];

    const exchangesList = [
        {
            value: "",
            label: "Select Exchange",
        },
        {
            value: "binance",
            label: "Binance",
        },
        {
            value: "pancake_swap",
            label: "Pancake Swap",
        }
    ];

    return (
        <div id="tradesignal-admin-modal">
            <Form>
                <Input
                    id={"tsPair"}
                    type={"text"}
                    name={"pair"}
                    value={newTradeSignal["pair"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newTradeSignalErrors["pair"]}
                    placeholder={"Pair"}
                />
                <Select
                    id={"tsExchange"}
                    name="exchange"
                    value={newTradeSignal["exchange"]}
                    onChange={(e: any) => changeEvent(e)}
                    large
                    disabled={false}
                    options={exchangesList}
                    required
                    errors={newTradeSignalErrors["exchange"]}
                />
                <Select
                    id={"tsAction"}
                    name="action"
                    value={newTradeSignal["action"]}
                    onChange={(e: any) => changeEvent(e)}
                    large
                    disabled={false}
                    options={actionsList}
                    required
                    errors={newTradeSignalErrors["action"]}
                />
                <Input
                    id={"tsOP"}
                    type={"number"}
                    name={"op"}
                    value={newTradeSignal["op"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newTradeSignalErrors["op"]}
                    placeholder={"Open Position"}
                />
                <Input
                    id={"tsTP"}
                    type={"number"}
                    name={"tp"}
                    value={newTradeSignal["tp"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newTradeSignalErrors["tp"]}
                    placeholder={"Take Profit"}
                />
                <Input
                    id={"tsSL"}
                    type={"number"}
                    name={"sl"}
                    value={newTradeSignal["sl"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newTradeSignalErrors["sl"]}
                    placeholder={"Stop Loss"}
                />
                <Input
                    id={"tsDesc"}
                    type={"text"}
                    name={"description"}
                    value={newTradeSignal["description"]}
                    onChange={(e: any): void => changeEvent(e)}
                    onBlur={(e: any): void => blurEvent(e)}
                    errors={newTradeSignalErrors["description"]}
                    placeholder={"Description"}
                    isTextarea
                />
                <Checkbox
                    checkItem={(): void =>
                        setNewTradeSignal({
                            ...newTradeSignal,
                            is_active: !newTradeSignal.is_active,
                        })
                    }
                    isChecked={newTradeSignal.is_active}
                    disabled={false}
                    label="Is active?"
                />
                {!isAdd && (
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() =>
                            dispatch(updateTradeSignal(newTradeSignal, trade_signal.id))
                        }
                        loading={trade_signals.update.loading}
                        disabled={trade_signals.update.loading || hasSomeErrors()}
                    >
                        Save
                    </Button>
                )}
                {isAdd && (
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() => dispatch(addTradeSignal(newTradeSignal))}
                        loading={trade_signals.add.loading}
                        disabled={trade_signals.add.loading || hasSomeErrors()}
                    >
                        Create
                    </Button>
                )}
            </Form>
        </div>
    );
}

export default TradeSignalAdminModal;
