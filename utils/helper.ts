import { ITreeNode } from "@/interfaces/TreeView";

export const getCheckedIds = (data: ITreeNode[]): string[] => {
  const checkedIds: string[] = [];

  const traverseTree = (node: ITreeNode) => {
    if (node.checked) {
      checkedIds.push(node.id);
    }
    if (node.children) {
      node.children.forEach(traverseTree);
    }
  };

  data.forEach(traverseTree);

  return checkedIds;
};
