import * as React from "react";
import renderer from "react-test-renderer";
import TreeView from "../TreeView";
import { render, fireEvent, RenderAPI } from "@testing-library/react-native";

const sampleData = [
  {
    id: "1",
    name: "mobile",
    description: "Mobile Devices",
    children: [
      { id: "2", name: "Apple" },
      { id: "3", name: "Samsung" },
    ],
  },
];

const firstChild = sampleData[0];

describe("TreeView Cases with Data", () => {
  let component: RenderAPI;

  beforeEach(() => {
    component = render(<TreeView data={sampleData} />);
  });

  it("renders parent correctly with name and description", () => {
    const { getByText } = component;
    expect(getByText(firstChild.name)).toBeTruthy();
    expect(getByText(firstChild.description)).toBeTruthy();
  });

  it("expands nodes correctly", () => {
    const { getByText } = component;
    const node = getByText(firstChild.name);
    fireEvent.press(node);
    expect(getByText(firstChild!.children![0].name)).toBeTruthy();
  });

  it("collapses nodes correctly when press 2", () => {
    const { getByText, queryByText } = component;
    const node = getByText(firstChild.name);
    // Pressed twice to collapse
    fireEvent.press(node);
    fireEvent.press(node);
    expect(queryByText(firstChild!.children![0].name)).toBeFalsy();
  });

  it("checkbox toggle check", () => {
    const { getByTestId } = component;
    const checkbox = getByTestId(`checkbox-${firstChild.id}`);
    expect(checkbox).toBeDefined();

    fireEvent.press(checkbox);
    expect(checkbox.props.accessibilityState.checked).toBe(true);

    fireEvent.press(checkbox);
    expect(checkbox.props.accessibilityState.checked).toBe(false);
  });

  it("should show all children when parent text is clicked with false checkbox", () => {
    const { getByTestId, getByText } = component;
    const node = getByText(firstChild.name);
    fireEvent.press(node);

    firstChild.children.forEach((checkbox) => {
      const childCheckbox = getByTestId(`checkbox-${checkbox.id}`);
      expect(childCheckbox).toBeDefined();
      expect(childCheckbox.props.accessibilityState.checked).toBe(false);
    });
  });

  it("should check all children when parent is checked", () => {
    const { getByTestId, getByText } = component;
    const node = getByText(firstChild.name);
    fireEvent.press(node);
    const parentCheckbox = getByTestId(`checkbox-${firstChild.id}`);
    fireEvent.press(parentCheckbox);

    firstChild.children.forEach((checkbox) => {
      const childCheckbox = getByTestId(`checkbox-${checkbox.id}`);
      expect(childCheckbox).toBeDefined();
      expect(childCheckbox.props.accessibilityState.checked).toBe(true);
    });
  });
});

describe("TreeView Cases without Data", () => {
  it("No data case", () => {
    const { queryByText } = render(<TreeView data={[]} />);
    expect(queryByText(/no data/i)).toBeTruthy();
  });
});

describe("Tree View Snapshot", () => {
  it(`snapshot test for TreeView correctly`, () => {
    const tree = renderer.create(<TreeView data={sampleData} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
