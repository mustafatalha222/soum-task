import { ITreeNode, ITreeViewProps } from "@/interfaces/TreeView";
import Checkbox from "expo-checkbox";
import React, { memo } from "react";
import { View, Pressable, StyleSheet, FlatList } from "react-native";
import { Colors } from "@/constants/Colors";
import { useExpandedNodes } from "@/hooks/useExpandedNodes";
import { useCheckedState } from "@/hooks/useCheckedState";
import { ThemedText } from "./ThemedText";

const initializeCheckedState = (treeData: ITreeNode[]): ITreeNode[] => {
  return treeData.map((node) => {
    const children = node.children
      ? initializeCheckedState(node.children)
      : undefined;
    return { ...node, checked: false, children };
  });
};

const TreeView = ({ data, onSelectionChange }: ITreeViewProps) => {
  const { nodes, toggleNodeCheckbox } = useCheckedState(
    data,
    onSelectionChange
  );
  const { expandedNodes, handleToggleNode } = useExpandedNodes();

  const renderItem = ({ item }: { item: ITreeNode }) => {
    const isExpanded = expandedNodes.includes(item.id);
    return (
      <View style={styles.nodeContainer}>
        <View style={styles.row}>
          <Checkbox
            value={item.checked}
            onValueChange={() => toggleNodeCheckbox(item)}
          />
          <Pressable onPress={() => handleToggleNode(item.id)}>
            <View style={styles.ThemedTextContainer}>
              <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
              <ThemedText style={styles.nodeDescription}>
                {item.description}
              </ThemedText>
            </View>
          </Pressable>
        </View>
        {isExpanded && item.children && (
          <FlatList
            data={item.children}
            renderItem={renderItem}
            keyExtractor={(child) => child.id}
          />
        )}
      </View>
    );
  };

  return (
    <FlatList
      data={nodes}
      renderItem={renderItem}
      keyExtractor={(node) => node.id}
    />
  );
};

const styles = StyleSheet.create({
  nodeContainer: {
    marginLeft: 20,
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.grey,
    padding: 4,
    borderRadius: 8,
    marginBottom: 8,
    gap: 1,
  },
  ThemedTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  nodeDescription: {
    color: "#777",
    fontSize: 12,
    lineHeight: 12,
  },
});

export default memo(TreeView);
