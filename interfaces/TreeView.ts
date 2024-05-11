export interface ITreeNode {
  name: string;
  children?: ITreeNode[];
  checked?: boolean;
  id: string;
  description?: string;
}

export interface ITreeViewProps {
  data: ITreeNode[];
  onSelectionChange?: (selectedNodes: ITreeNode[]) => void;
}
