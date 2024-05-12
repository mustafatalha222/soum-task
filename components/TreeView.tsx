import { ITreeNode, ITreeViewProps } from "@/interfaces/TreeView";
import Checkbox from "expo-checkbox";
import React, { memo } from "react";
import { View, Pressable, StyleSheet, FlatList } from "react-native";
import { Colors } from "@/constants/Colors";
import { useExpandedNodes } from "@/hooks/useExpandedNodes";
import { useCheckedState } from "@/hooks/useCheckedState";
import { ThemedText } from "./ThemedText";

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
            testID={`checkbox-${item.id}`}
            value={item.checked}
            onValueChange={() => toggleNodeCheckbox(item)}
          />
          <Pressable onPress={() => handleToggleNode(item.id)}>
            <View style={styles.ThemedTextContainer}>
              <ThemedText type={item.children ? "defaultSemiBold" : "default"}>
                {item.name}
              </ThemedText>
              {item.description && (
                <ThemedText style={styles.nodeDescription}>
                  {item.description}
                </ThemedText>
              )}
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

  if (!data.length)
    return (
      <ThemedText type="subtitle" style={styles.noData}>
        No Data Found
      </ThemedText>
    );
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
  noData: {
    margin: 20,
    textAlign: "center",
  },
});

export default memo(TreeView);
