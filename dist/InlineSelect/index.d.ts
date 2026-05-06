import { type SelectProps } from "@codegouvfr/react-dsfr/SelectNext";
import { type GridSize } from "@mui/material";
import { type ReactNode } from "react";
import { type InlineEditSaveCancelButtonsProps } from "../InlineSaveCancelButtons/index";
type InlineSelectProps = {
    label: ReactNode;
    value: SelectProps.Option;
    options: SelectProps.Option[];
    name: string;
    fieldSize?: GridSize;
    onChange?: (newValue: string | null) => void;
    editable?: boolean;
    disabled?: boolean;
    nativeButtonsProps?: InlineEditSaveCancelButtonsProps;
};
export declare function InlineSelect({ label, value, options, name, fieldSize, onChange, editable, disabled, nativeButtonsProps, }: InlineSelectProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map