"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Input, {} from "@codegouvfr/react-dsfr/Input";
import { Grid } from "@mui/material";
import { useState } from "react";
import { InlineEditSaveCancelButtons, } from "../InlineSaveCancelButtons/index.js";
export function InlineInput({ label, value, name, fieldSize = "auto", onChange = undefined, editable = true, disabled = false, alertIcon = undefined, nativeButtonsProps = undefined, nativeInputProps = {}, }) {
    const [modifiying, setModifiying] = useState(false);
    const [edition, setEdition] = useState(value);
    function onModify() {
        setEdition(value);
    }
    function onSave() {
        if (onChange) {
            onChange(null, edition);
        }
    }
    return (_jsxs(Grid, { container: true, spacing: 0, children: [_jsx(Grid, { size: 2, children: label }), _jsx(Grid, { size: fieldSize, children: _jsx(Input, { disabled: !modifiying || disabled, iconId: alertIcon, label: "", nativeInputProps: {
                        ...nativeInputProps,
                        value: edition,
                        type: "text",
                        id: name,
                        onChange: (event) => {
                            setEdition(event.target.value);
                            onChange?.(event);
                        },
                    } }) }), _jsx(Grid, { size: 2, children: editable && (_jsx(InlineEditSaveCancelButtons, { ...nativeButtonsProps, disabled: disabled, modifying: modifiying, onModify: onModify, onSave: onSave, setModifying: setModifiying })) })] }));
}
//# sourceMappingURL=index.js.map