"use client";

import type { FrIconClassName, RiIconClassName } from "@codegouvfr/react-dsfr";
import Input, { type InputProps } from "@codegouvfr/react-dsfr/Input";
import { Grid, type GridSize } from "@mui/material";
import { type ReactNode, useState } from "react";

import {
    InlineEditSaveCancelButtons,
    type InlineEditSaveCancelButtonsProps,
} from "../InlineSaveCancelButtons/index";

type InlineInputProps = {
    label: ReactNode;
    value: string;
    name: string;
    labelSize?: GridSize;
    buttonSize?: GridSize;
    fieldSize?: GridSize;
    onChange?: (
        newValue?: string,
        event?: React.ChangeEvent<HTMLInputElement>,
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
    labelSize = 2,
    buttonSize = 2,
    fieldSize = "grow",
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
            onChange(edition);
        }
    }

    return (
        <Grid className="row fr-grid-row--middle"
            container
            spacing={0}
        >
            <Grid size={labelSize}><label htmlFor={name}>{label}</label></Grid>
           <Grid
                className="cell-default"
                size={fieldSize}
            >
                <Input
                    className="display-none"
                    disabled={!modifiying || disabled}
                    iconId={alertIcon}
                    label=""
                    nativeInputProps={{
                        ...nativeInputProps,
                        value: edition,
                        type: "text",
                        id: name,
                        name,
                        onChange: (event) => {
                            setEdition(event.target.value);
                            onChange?.(event.target.value, event);
                        },
                    }}
                />
            </Grid>

            <Grid size={buttonSize}>
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
