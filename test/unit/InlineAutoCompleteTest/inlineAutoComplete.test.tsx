/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import type { AutoCompleteValue } from "@/src/AutoComplete";
import { InlineAutoComplete } from "@/src/InlineAutoComplete";

const mockOptions: AutoCompleteValue[] = [
    { id: "1", label: "Option 1" },
    { id: "2", label: "Option 2" },
];

describe("InlineAutoComplete", () => {
    const mockValue = { id: "1", label: "Option 1" };

    it("doit afficher la valeur en mode lecture", () => {
        const onChange = jest.fn();

        render(
            <InlineAutoComplete
                editable
                label="Test Label"
                onChange={onChange}
                options={mockOptions}
                value={mockValue}
            />,
        );

        expect(screen.getByDisplayValue("Option 1")).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: "Modifier" }),
        ).toBeInTheDocument();
    });

    it("doit passer en mode édition et sauvegarder", () => {
        const onChange = jest.fn();
        render(
            <InlineAutoComplete
                editable
                label="Test Label"
                onChange={onChange}
                options={mockOptions}
                value={mockValue}
            />,
        );

        fireEvent.click(screen.getByRole("button", { name: "Modifier" }));

        const input = screen.getByRole("combobox");

        fireEvent.change(input, { target: { value: "Option 2" } });

        fireEvent.keyDown(input, { key: "ArrowDown" });
        fireEvent.keyDown(input, { key: "Enter" });

        const saveButton = screen.getByRole("button", {
            name: /enregistrer|valider/i,
        });
        fireEvent.click(saveButton);

        expect(onChange).toHaveBeenCalledWith("1");
    });
});
