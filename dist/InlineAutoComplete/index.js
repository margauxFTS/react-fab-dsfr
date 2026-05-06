"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Input from "@codegouvfr/react-dsfr/Input";
import { Grid } from "@mui/material";
import { useState } from "react";
import { AutoCompleteDsfr, extractAutocompleteValue, } from "../AutoCompleteDsfr/index";
import { InlineEditSaveCancelButtons, } from "../InlineSaveCancelButtons/index";
export function InlineAutoComplete({ label, value = undefined, options, noOptionsText = "", fieldSize = "auto", onChange = undefined, editable = true, disabled = false, nativeButtonsProps = undefined, nativeInputProps = {}, }) {
    const [modifiying, setModifiying] = useState(false);
    const [edition, setEdition] = useState(value);
    function onModify() {
        setEdition(value);
    }
    function onSave() {
        if (onChange && edition) {
            onChange(edition.id);
        }
    }
    return (_jsxs(Grid, { container: true, spacing: 0, children: [_jsx(Grid, { size: 2, children: label }), _jsxs(Grid, { size: fieldSize, children: [(!modifiying || disabled) && (_jsx(Input, { disabled: true, label: "", nativeInputProps: {
                            ...nativeInputProps,
                            value: value?.label,
                            type: "text",
                        } })), modifiying && !disabled && (_jsx(AutoCompleteDsfr, { label: "", nativeAutocompleteProps: {
                            disableClearable: true,
                            autoHighlight: true,
                            noOptionsText,
                            options,
                            value: edition,
                            onChange: (event, values) => {
                                const value = extractAutocompleteValue(values);
                                if (value) {
                                    setEdition(value);
                                }
                            },
                        }, nativeInputProps: {
                            className: "fr-select",
                            ...nativeInputProps,
                        } }))] }), _jsx(Grid, { size: 2, children: editable && options.length > 0 && (_jsx(InlineEditSaveCancelButtons, { ...nativeButtonsProps, disabled: disabled, modifying: modifiying, onModify: onModify, onSave: onSave, setModifying: setModifiying })) })] }));
}
//# sourceMappingURL=index.js.map