import Button from "@codegouvfr/react-dsfr/Button";
import Input from "@codegouvfr/react-dsfr/Input";

const MAXIMUM_ITEM_NUMBER = 10;
const ITEM_MAXIMUM_LENGTH = 100;

export type DynamicInputListProps = {
    label: string;
    placeHolder: string;
    values: string[];
    onSetValues: (values: string[]) => void;
    disabled?: boolean;
    maximumItemNumber?: number;
    itemMaximumLength?: number;
    disabledInputs?: boolean;
    addAllowed?: boolean;
    deleteAllowed?: boolean;
};

export function DynamicInputList({
    label,
    placeHolder,
    values,
    onSetValues,
    disabled = false,
    maximumItemNumber = MAXIMUM_ITEM_NUMBER,
    itemMaximumLength = ITEM_MAXIMUM_LENGTH,
    disabledInputs = false,
    addAllowed = true,
    deleteAllowed = true,
}: DynamicInputListProps) {
    function addInput() {
        const emptyValue = "";
        const addedValues = [...values, emptyValue];
        onSetValues(addedValues);
    }

    function deleteInput(delIndex: number) {
        const deletedValues = values.filter(
            (value, index) => index !== delIndex,
        );
        onSetValues(deletedValues);
    }

    function updateInput(index: number, value: string) {
        const updatedValues = Array.from(values);
        updatedValues[index] = value;
        onSetValues(updatedValues);
    }

    return (
        <>
            <div className="fr-col">
                <label className="fr-label">{label}</label>
                {values.map((item: string, index: number) => (
                    <div
                        className="fab-input-container-is"
                         
                        key={`dynamic-input-list-item-${index}`}
                    >
                        <Input
                            className="fab-input-no-label fab-input-full-width fab-input-no-margin-bottom"
                            disabled={disabledInputs}
                            label={`\u00A0`}
                            nativeInputProps={{
                                placeholder: placeHolder,
                                type: "text",
                                id: `${label}-${index}`,
                                value: item,
                                maxLength: itemMaximumLength,
                                onChange: (event) => {
                                    updateInput(index, event.target.value);
                                },
                            }}
                        />
                        {deleteAllowed && (
                            <Button
                                disabled={disabled}
                                iconId="fr-icon-delete-bin-line"
                                onClick={() => {
                                    deleteInput(index);
                                }}
                                priority="tertiary"
                                title="Supprimer ce champ"
                                type="button"
                            />
                        )}
                    </div>
                ))}
            </div>
            {addAllowed && (
                <Button
                    disabled={disabled || values.length >= maximumItemNumber}
                    onClick={addInput}
                    priority="secondary"
                    title="Ajouter un nouveau champ"
                    type="button"
                >
                    +
                </Button>
            )}
        </>
    );
}
