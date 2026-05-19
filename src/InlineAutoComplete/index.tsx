"use client";
import Input from "@codegouvfr/react-dsfr/Input";
import { Grid, type GridSize } from "@mui/material";
import { type ReactNode, useState } from "react";

import {
    AutoCompleteDsfr,
    type AutocompleteDsfrValue,
    type AutoCompleteValue,
    extractAutocompleteValue,
} from "../AutoComplete/index";

import {
    InlineEditSaveCancelButtons,
    type InlineEditSaveCancelButtonsProps,
} from "../InlineSaveCancelButtons/index";

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

export function InlineAutoComplete({
    label,
    value = undefined,
    options,
    noOptionsText = "",
    fieldSize = "auto",
    onChange = undefined,
    editable = true,
    disabled = false,
    nativeButtonsProps = undefined,
    nativeInputProps = {},
}: InlineAutoCompleteProps) {
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

    return (
        <Grid
            container
            spacing={0}
        >
            <Grid size={2}>{label}</Grid>
            <Grid size={fieldSize}>
                {(!modifiying || disabled) && (
                    <Input
                        disabled
                        label=""
                        nativeInputProps={{
                            ...nativeInputProps,
                            value: value?.label,
                            type: "text",
                        }}
                    />
                )}
                {modifiying && !disabled && (
                    <AutoCompleteDsfr
                        label=""
                        nativeAutocompleteProps={{
                            disableClearable: true,
                            autoHighlight: true,
                            noOptionsText,
                            options,
                            value: edition,
                            onChange: (
                                event,
                                values: AutocompleteDsfrValue,
                            ) => {
                                const value = extractAutocompleteValue(values);
                                if (value) {
                                    setEdition(value);
                                }
                            },
                        }}
                        nativeInputProps={{
                            className: "fr-select",
                            ...nativeInputProps,
                        }}
                    />
                )}
            </Grid>

            <Grid size={2}>
                {editable && options.length > 0 && (
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
