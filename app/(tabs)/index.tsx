import { useState } from "react";
import { ITreeNode } from "@/interfaces/TreeView";
import TreeView from "@/components/TreeView";
import { sampleProducts } from "@/constants/sampleProducts";
import DisplayVariants from "@/components/DisplayVariants";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Products() {
  const [selectedItems, setselectedItems] =
    useState<ITreeNode[]>(sampleProducts);

  const handleSelectionChange = (selectedItems: ITreeNode[]) => {
    setselectedItems(selectedItems);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DisplayVariants selectedItems={selectedItems} />
      <TreeView
        data={sampleProducts}
        onSelectionChange={handleSelectionChange}
      />
    </SafeAreaView>
  );
}
