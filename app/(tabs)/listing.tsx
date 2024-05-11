import React from "react";
import { FlatList, StyleSheet, ScrollView } from "react-native";
import { sampleProducts } from "@/constants/sampleProducts";
import { Collapsible } from "@/components/Collapsible";
import { ITreeNode } from "@/interfaces/TreeView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";

const Product = ({ name }: ITreeNode) => {
  return (
    <ThemedView style={styles.productContainer}>
      <ThemedText>{name}</ThemedText>
    </ThemedView>
  );
};

const renderCategoryOrProduct = (item: ITreeNode) => {
  if (
    "children" in item &&
    Array.isArray(item.children) &&
    item.children.length > 0
  ) {
    return (
      <Collapsible title={item.name} key={item.id}>
        {item.children.map(renderCategoryOrProduct)}
      </Collapsible>
    );
  } else {
    return <Product key={item.id} {...item} />;
  }
};

const ListingPage = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <ThemedText style={styles.header} type="title">
          All Products Listing
        </ThemedText>
        <ThemedView style={styles.wrapper}>
          <FlatList
            data={sampleProducts}
            renderItem={({ item }) => renderCategoryOrProduct(item)}
            keyExtractor={(item) => item.id}
          />
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 18,
    textAlign: "center",
  },
  productContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  name: {
    fontWeight: "semibold",
  },
  wrapper: {
    padding: 5,
  },
});

export default ListingPage;
