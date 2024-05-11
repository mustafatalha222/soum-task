import { ITreeNode } from "@/interfaces/TreeView";
import { StyleSheet, View } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import React, { memo } from "react";
import { Colors } from "@/constants/Colors";

const renderSelectedChildren = (selectedItem: ITreeNode) => {
  const selectedChildren =
    selectedItem.children?.filter((child) => child.checked) || [];
  if (!selectedChildren.length) return;
  return (
    <ThemedText key={selectedItem.id} style={styles.variant}>
      {selectedItem.name} -{" "}
      {selectedChildren.map((child) => child.name).join(", ")}
    </ThemedText>
  );
};

const renderItem = ({
  item,
  isParent,
}: {
  item: ITreeNode;
  isParent?: boolean;
}) => (
  <>
    {item.checked && (item.children || isParent) ? (
      <ThemedText style={styles.variant} key={item.id}>
        All {item.name}
      </ThemedText>
    ) : (
      <>
        {renderSelectedChildren(item)}
        {item.children && (
          <View style={styles.variantWrapper}>
            {item.children.map((child) => (
              <React.Fragment key={child.id}>
                {renderItem({ item: child })}
              </React.Fragment>
            ))}
          </View>
        )}
      </>
    )}
  </>
);

const DisplayVariants = ({ selectedItems }: { selectedItems: ITreeNode[] }) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.heading}>
        Selected Variants:
      </ThemedText>
      <View style={[styles.variantWrapper]}>
        {selectedItems.map((item) => (
          <React.Fragment key={item.id}>
            {renderItem({ item, isParent: true })}
          </React.Fragment>
        ))}
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 5, minHeight: 50 },
  heading: {
    marginBottom: 5,
  },
  variantWrapper: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 3,
    overflow: "scroll",
  },
  variant: {
    backgroundColor: Colors.light.grey,
    paddingHorizontal: 10,
    fontSize: 12,
    borderRadius: 5,
    textAlign: "center",
  },
});

export default memo(DisplayVariants);
