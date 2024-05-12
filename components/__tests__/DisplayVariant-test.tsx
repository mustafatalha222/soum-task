import * as React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent, RenderAPI } from "@testing-library/react-native";
import DisplayVariants from "../DisplayVariants";
import { ITreeNode } from "@/interfaces/TreeView";

const selectedItems = [
  {
    id: "1",
    name: "Mobile",
    checked: true,
    children: [
      { id: "2", name: "Apple", checked: true },
      { id: "3", name: "Samsung", checked: true },
      { id: "4", name: "MI", checked: true },
    ],
  },
];

const selectedSomeItems = [
  {
    id: "1",
    name: "Mobile",
    checked: false,
    children: [
      { id: "2", name: "Apple", checked: false },
      { id: "3", name: "Samsung", checked: true },
      { id: "4", name: "MI", checked: true },
    ],
  },
];

const setupComponent = (selectedItems: ITreeNode[]) => {
  return render(<DisplayVariants selectedItems={selectedItems} />);
};

const firstChild = selectedItems[0];

describe("Display Variant Cases with selected Items", () => {
  let component: RenderAPI;

  it("display text selected variants on top", () => {
    const { getByText } = setupComponent([]);
    expect(getByText(/selected variants/i)).toBeTruthy();
  });

  it("should display parent value with All", () => {
    const { getByText } = setupComponent(selectedItems);
    expect(getByText(`All ${firstChild.name}`)).toBeTruthy();
  });

  it("should display parent with selected children by comma", () => {
    const { getByText } = setupComponent(selectedSomeItems);
    expect(
      getByText(
        `${selectedSomeItems[0].name} - ${selectedSomeItems[0].children[1].name}, ${selectedSomeItems[0].children[2].name}`
      )
    ).toBeTruthy();
  });
});

describe("Display Variant Snapshot", () => {
  it(`snapshot test for Display Variant correctly`, () => {
    const tree = renderer
      .create(<DisplayVariants selectedItems={selectedItems} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
