import { useState } from "react";

export const useExpandedNodes = () => {
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

  const handleToggleNode = (nodeId: string) => {
    setExpandedNodes((prevExpandedNodes) =>
      prevExpandedNodes.includes(nodeId)
        ? prevExpandedNodes.filter((id) => id !== nodeId)
        : [...prevExpandedNodes, nodeId]
    );
  };

  return { expandedNodes, handleToggleNode };
};
