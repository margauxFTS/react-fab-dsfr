import { type GridSize } from "@mui/material";
import { type ReactNode } from "react";
import { type AutoCompleteValue } from "../AutoCompleteDsfr/index.js";
import { type InlineEditSaveCancelButtonsProps } from "../InlineSaveCancelButtons/index.js";
type InlineAutoCompleteProps = {
    label: ReactNode;
    value?: AutoCompleteValue;
    options: AutoCompleteValue[];
    noOptionsText?: string;
    fieldSize?: GridSize;
    onChange?: (newValue: string) => void;
    editable?: boolean;
    disabled?: boolean;
    nativeButtonsProps?: InlineEditSaveCancelButtonsProps;
    nativeInputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};
export declare function InlineAutoComplete({ label, value, options, noOptionsText, fieldSize, onChange, editable, disabled, nativeButtonsProps, nativeInputProps, }: InlineAutoCompleteProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map