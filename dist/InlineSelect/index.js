"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Select, {} from "@codegouvfr/react-dsfr/SelectNext";
import { Grid } from "@mui/material";
import { useState } from "react";
import { InlineEditSaveCancelButtons, } from "../InlineSaveCancelButtons/index";
export function InlineSelect({ label, value, options, name, fieldSize = "auto", onChange = undefined, editable = true, disabled = false, nativeButtonsProps = undefined, }) {
    const [modifiying, setModifiying] = useState(false);
    const [edition, setEdition] = useState(value);
    function onModify() {
        setEdition(value);
    }
    function onSave() {
        if (onChange) {
            onChange(edition.value === "" ? null : edition.value);
        }
    }
    return (_jsxs(Grid, { container: true, spacing: 0, children: [_jsx(Grid, { size: 2, children: label }), _jsx(Grid, { size: fieldSize, children: _jsx(Select, { disabled: !modifiying || disabled, label: "", nativeSelectProps: {
                        name,
                        onChange: (event) => {
                            const rawValue = event.target.value;
                            const option = options.find((opt) => opt.value === rawValue);
                            if (option) {
                                setEdition(option);
                            }
                        },
                        value: edition.value,
                    }, options: options }) }), _jsx(Grid, { size: 2, children: editable && options.length > 0 && (_jsx(InlineEditSaveCancelButtons, { ...nativeButtonsProps, disabled: disabled, modifying: modifiying, onModify: onModify, onSave: onSave, setModifying: setModifiying })) })] }));
}
//# sourceMappingURL=index.js.map