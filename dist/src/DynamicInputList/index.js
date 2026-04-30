import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Button from "@codegouvfr/react-dsfr/Button";
import Input from "@codegouvfr/react-dsfr/Input";
const MAXIMUM_ITEM_NUMBER = 10;
const ITEM_MAXIMUM_LENGTH = 100;
export function DynamicInputList({ label, name, placeHolder, values, onSetValues, disabled = false, maximumItemNumber = MAXIMUM_ITEM_NUMBER, itemMaximumLength = ITEM_MAXIMUM_LENGTH, disabledInputs = false, addAllowed = true, deleteAllowed = true, }) {
    function addInput() {
        const emptyValue = "";
        const addedValues = [...values, emptyValue];
        onSetValues(addedValues);
    }
    function deleteInput(delIndex) {
        const deletedValues = values.filter((value, index) => index !== delIndex);
        onSetValues(deletedValues);
    }
    function updateInput(index, value) {
        const updatedValues = Array.from(values);
        updatedValues[index] = value;
        onSetValues(updatedValues);
    }
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "fr-col", children: [_jsx("label", { className: "fr-label", children: label }), values.map((item, index) => (_jsxs("div", { className: "fab-input-container-is", children: [_jsx(Input, { className: "fab-input-no-label fab-input-full-width fab-input-no-margin-bottom", disabled: disabledInputs, label: `\u00A0`, nativeInputProps: {
                                    placeholder: placeHolder,
                                    type: "text",
                                    id: `${label}-${index}`,
                                    name,
                                    value: item,
                                    maxLength: itemMaximumLength,
                                    onChange: (event) => {
                                        updateInput(index, event.target.value);
                                    },
                                } }), deleteAllowed && (_jsx(Button, { disabled: disabled, iconId: "fr-icon-delete-bin-line", onClick: () => {
                                    deleteInput(index);
                                }, priority: "tertiary", title: "Supprimer ce champ", type: "button" }))] }, `dynamic-input-list-item-${index}`)))] }), addAllowed && (_jsx(Button, { disabled: disabled || values.length >= maximumItemNumber, onClick: addInput, priority: "secondary", title: "Ajouter un nouveau champ", type: "button", children: "+" }))] }));
}
//# sourceMappingURL=index.js.map