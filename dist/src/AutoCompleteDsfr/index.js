/* eslint-disable react/no-multi-comp */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Autocomplete, } from "@mui/material";
import { useId } from "react";
import clsx from "clsx";
export function extractAutocompleteValue(value) {
    if (value === null) {
        return null;
    }
    if (Array.isArray(value)) {
        // On filtre pour ne garder que les objets avec `id`
        const firstValid = value.find((item) => typeof item !== "string" && "id" in item);
        return firstValid ?? null;
    }
    if (typeof value === "string") {
        return null;
    }
    return value;
}
export function AutoCompleteRenderInputDsfr(params, nativeInputProps) {
    const { slotProps } = params;
    return (_jsx("div", { ref: slotProps.input.ref, children: _jsx("input", { ...nativeInputProps, ...slotProps.htmlInput, className: clsx(nativeInputProps?.className, "fr-input", "fr-mt-md-2v"), placeholder: nativeInputProps?.placeholder }) }));
}
export function AutoCompleteDsfr({ className, label, nativeInputProps, nativeAutocompleteProps, state, stateRelatedMessage, }) {
    const autocompleteID = useId();
    return (_jsxs("div", { className: clsx(className, "fr-input-group", state === "error" && "fr-input-group--error"), children: [label !== null && (_jsx("label", { className: "fr-label", htmlFor: autocompleteID, children: label })), _jsx(Autocomplete, { ...nativeAutocompleteProps, id: autocompleteID, renderInput: (params) => AutoCompleteRenderInputDsfr(params, nativeInputProps) }), state === "error" && (_jsx("p", { className: "fr-error-text", children: stateRelatedMessage }))] }));
}
//# sourceMappingURL=index.js.map