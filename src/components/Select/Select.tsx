import React from "react";
import "./Select.scss";

export const Select = React.memo(
    ({
        name,
        value,
        large = false,
        disabled = false,
        onChange = null,
        errors = null,
        light = false,
        label = null,
        required = false,
        options = [],
    }: any) => {
        return (
            <div
                className={`selectGroup ${large ? "large" : ""} ${
                    errors && errors.length > 0 ? "error" : ""
                } ${light ? "light" : ""}`}
            >
                <div className="inputInner">
                    <select
                        name={name}
                        id={name}
                        onChange={(e) => onChange(e)}
                        className="formControl"
                        disabled={disabled}
                        value={value}
                    >
                        {options.map((option: any, index: any) => (
                            <option
                                key={index}
                                value={option.value}
                                disabled={option.disabled}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <p className="errorMessage">{errors && errors.length > 0 && errors[0]}</p>
            </div>
        );
    }
);
