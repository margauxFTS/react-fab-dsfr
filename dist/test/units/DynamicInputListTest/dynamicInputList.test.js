import { jsx as _jsx } from "react/jsx-runtime";
/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { DynamicInputList } from "@/src/DynamicInputList";
describe("DynamicInputList", () => {
    const defaultProps = {
        label: "Test Label",
        name: "test",
        onSetValues: jest.fn(),
        placeHolder: "Enter value",
        values: ["Item 1"],
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("doit afficher les valeurs initiales", () => {
        render(_jsx(DynamicInputList, { ...defaultProps, values: ["Item 1", "Item 2"] }));
        expect(screen.getByDisplayValue("Item 1")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Item 2")).toBeInTheDocument();
    });
    it("doit appeler onSetValues avec un champ vide lors du clic sur ajouter", () => {
        render(_jsx(DynamicInputList, { ...defaultProps, addAllowed: true }));
        const addButton = screen.getByTitle("Ajouter un nouveau champ");
        fireEvent.click(addButton);
        expect(defaultProps.onSetValues).toHaveBeenCalledWith(["Item 1", ""]);
    });
    it("doit supprimer le bon input lors du clic sur supprimer", () => {
        render(_jsx(DynamicInputList, { ...defaultProps, deleteAllowed: true, values: ["Item 1", "Item 2"] }));
        const deleteButtons = screen.getAllByTitle("Supprimer ce champ");
        fireEvent.click(deleteButtons[0]); // Supprime le premier
        expect(defaultProps.onSetValues).toHaveBeenCalledWith(["Item 2"]);
    });
    it("doit mettre à jour la valeur lors de la saisie", () => {
        render(_jsx(DynamicInputList, { ...defaultProps }));
        const input = screen.getByDisplayValue("Item 1");
        fireEvent.change(input, { target: { value: "Nouvelle Valeur" } });
        expect(defaultProps.onSetValues).toHaveBeenCalledWith([
            "Nouvelle Valeur",
        ]);
    });
});
//# sourceMappingURL=dynamicInputList.test.js.map