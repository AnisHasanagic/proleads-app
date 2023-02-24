import React from "react";
import "./Input.scss";

export const Input = React.memo(
    ({
        id,
        type,
        name,
        prepend,
        append,
        disabled,
        onChange,
        onBlur,
        errors,
        label,
        isOptional,
        value,
        isNumeric,
        small,
        placeholder,
        autocomplete = false,
        onKeyPress,
        light,
        isTextarea,
    }: any) => {
        return (
            <div
                className={`inputGroup ${
                    errors && errors.length > 0 ? "error" : ""
                } ${disabled ? "disabled" : ""} ${isNumeric ? "numeric" : ""} ${
                    small ? "small" : ""
                } ${light ? "light" : ""}`}
            >
                {label && (
                    <label htmlFor={id}>
                        {label}
                        {isOptional && (
                            <span className="optional">Optional</span>
                        )}
                    </label>
                )}
                <div className="inputInner">
                    {prepend ? <div className="prepend">{prepend}</div> : null}
                    {!isTextarea && (
                        <input
                            type={type}
                            name={name}
                            id={id}
                            placeholder={placeholder}
                            onChange={(e): void => onChange(e)}
                            onKeyPress={(e): void =>
                                onKeyPress ? onKeyPress(e) : null
                            }
                            onBlur={(e): void => (onBlur ? onBlur(e) : null)}
                            className="formControl"
                            disabled={disabled}
                            value={value}
                            autoComplete="new-password"
                        />
                    )}
                    {isTextarea && (
                        <textarea
                            name={name}
                            id={id}
                            placeholder={placeholder}
                            onChange={(e): void => onChange(e)}
                            onKeyPress={(e): void =>
                                onKeyPress ? onKeyPress(e) : null
                            }
                            onKeyDown={(e): void =>
                                onkeydown ? onKeyPress(e) : null
                            }
                            onBlur={(e): void => (onBlur ? onBlur(e) : null)}
                            className="formControl"
                            disabled={disabled}
                            value={value}
                            rows={7}
                            autoComplete="new-password"
                        />
                    )}
                    {append ? <div className="append">{append}</div> : null}
                </div>
                <p className="errorMessage">{errors && errors.length > 0 && errors[0]}</p>
            </div>
        );
    }
);
