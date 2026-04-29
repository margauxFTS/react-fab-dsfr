"use client";

import type { FrIconClassName, RiIconClassName } from "@codegouvfr/react-dsfr";
import Input, { type InputProps } from "@codegouvfr/react-dsfr/Input";
import { Grid, type GridSize } from "@mui/material";
import { type ReactNode, useState } from "react";

import {
    InlineEditSaveCancelButtons,
    type InlineEditSaveCancelButtonsProps,
} from "../InlineSaveCancelButtons/index.js";

type InlineInputProps = {
    label: ReactNode;
    value: string;
    name: string;
    fieldSize?: GridSize;
    onChange?: (
        event: React.ChangeEvent<HTMLInputElement> | null,
        newValue?: string,
    ) => void;
    editable?: boolean;
    disabled?: boolean;
    alertIcon?: FrIconClassName | RiIconClassName;
    nativeButtonsProps?: InlineEditSaveCancelButtonsProps;
    nativeInputProps?: InputProps.RegularInput["nativeInputProps"];
};

export function InlineInput({
    label,
    value,
    name,
    fieldSize = "auto",
    onChange = undefined,
    editable = true,
    disabled = false,
    alertIcon = undefined,
    nativeButtonsProps = undefined,
    nativeInputProps = {},
}: InlineInputProps) {
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

    return (
        <Grid
            container
            spacing={0}
        >
            <Grid size={2}>{label}</Grid>
            <Grid size={fieldSize}>
                <Input
                    disabled={!modifiying || disabled}
                    iconId={alertIcon}
                    label=""
                    nativeInputProps={{
                        ...nativeInputProps,
                        value: edition,
                        type: "text",
                        id: name,
                        onChange: (event) => {
                            setEdition(event.target.value);
                            onChange?.(event);
                        },
                    }}
                />
            </Grid>

            <Grid size={2}>
                {editable && (
                    <InlineEditSaveCancelButtons
                        {...nativeButtonsProps}
                        disabled={disabled}
                        modifying={modifiying}
                        onModify={onModify}
                        onSave={onSave}
                        setModifying={setModifiying}
                    />
                )}
            </Grid>
        </Grid>
    );
}
