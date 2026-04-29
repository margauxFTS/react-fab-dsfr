"use client";
import Button from "@codegouvfr/react-dsfr/Button";
import type { Dispatch, SetStateAction } from "react";

export type InlineEditSaveCancelButtonsProps = {
    modifying: boolean;
    setModifying: Dispatch<SetStateAction<boolean>>;
    onModify: () => void;
    onSave: () => void;
    onCancel?: () => void;
    disabled?: boolean;
};

export function InlineEditSaveCancelButtons({
    modifying,
    setModifying,
    onModify,
    onSave,
    onCancel = undefined,
    disabled = false,
}: InlineEditSaveCancelButtonsProps) {
    return (
        <>
            <Button
                disabled={modifying || disabled}
                iconId="fr-icon-edit-line"
                onClick={() => {
                    onModify();
                    setModifying(true);
                }}
                priority="primary"
                title="Modifier"
                type="button"
            />
            {modifying && (
                <>
                    <Button
                        iconId="fr-icon-check-line"
                        onClick={() => {
                            onSave();
                            setModifying(false);
                        }}
                        priority="primary"
                        title="Enregistrer"
                        type="button"
                    />
                    <Button
                        iconId="fr-icon-close-line"
                        onClick={() => {
                            if (onCancel) {
                                onCancel();
                            }
                            setModifying(false);
                        }}
                        priority="secondary"
                        title="Annuler"
                        type="reset"
                    />
                </>
            )}
        </>
    );
}
