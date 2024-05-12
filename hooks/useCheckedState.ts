import { ITreeNode, ITreeViewProps } from "@/interfaces/TreeView";
import { useState } from "react";

export const useCheckedState = (
  data: ITreeNode[],
  onSelectionChange: ITreeViewProps["onSelectionChange"]
) => {
  const [nodes, setNodes] = useState<ITreeNode[]>(initializeCheckedState(data));

  const toggleNodeCheckbox = (node: ITreeNode) => {
    const updatedNodes = [...nodes];
    node.checked = !node.checked;
    const updateChildren = (children: ITreeNode[] | undefined) => {
      if (children) {
        children.forEach((child) => {
          child.checked = node.checked;
          updateChildren(child.children);
        });
      }
    };
    updateChildren(node.children);
    const updateParent = (parent: ITreeNode | undefined) => {
      if (parent) {
        const allChildrenChecked = parent.children?.every(
          (child) => child.checked
        );
        parent.checked = !!allChildrenChecked;
        updateParent(getParent(parent));
      }
    };
    updateParent(getParent(node));
    setNodes(updatedNodes);

    if (onSelectionChange) onSelectionChange(updatedNodes);
    // getCheckedIds(updatedNodes)
  };

  const getParent = (node: ITreeNode) => {
    for (const rootNode of nodes) {
      const parent = findParent(rootNode, node);
      if (parent) return parent;
    }
    return undefined;
  };

  const findParent = (
    currentNode: ITreeNode,
    nodeToFind: ITreeNode
  ): ITreeNode | undefined => {
    if (currentNode.children) {
      for (const child of currentNode.children) {
        if (child === nodeToFind) {
          return currentNode;
        }
        const parent = findParent(child, nodeToFind);
        if (parent) return parent;
      }
    }
    return undefined;
  };

  return { nodes, toggleNodeCheckbox };
};

const initializeCheckedState = (treeData: ITreeNode[]): ITreeNode[] => {
  return treeData.map((node) => {
    const children = node.children
      ? initializeCheckedState(node.children)
      : undefined;
    return { ...node, checked: node.checked || false, children };
  });
};
