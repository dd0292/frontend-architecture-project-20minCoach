"use client";

import type React from "react";
import { useState } from "react";
import { View, TouchableOpacity, Modal } from "react-native";
import { useTheme } from "../../styles/ThemeContext";
import { SearchBar } from "../molecules/SearchBar";
import { TagChip } from "../molecules/TagChip";
import { BodyText, Heading3 } from "../atoms/Typography";
import { Icon } from "../atoms/Icon";
import { createFilterPanelStyles } from "../../styles/organisms/FilterPanel.styles";

interface FilterPanelProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedFilters: string[];
  onFilterToggle: (filter: string) => void;
  availableFilters: string[];
  onMicPress?: () => void;
  placeholder?: string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  searchValue,
  onSearchChange,
  selectedFilters,
  onFilterToggle,
  availableFilters,
  onMicPress,
  placeholder = "Search...",
}) => {
  const theme = useTheme();
  const styles = createFilterPanelStyles(theme);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <View style={{ ...styles.panelDisplay }}>
      <SearchBar
        value={searchValue}
        onChangeText={onSearchChange}
        placeholder={placeholder}
        onMicPress={onMicPress}
      />

      <View style={{ ...styles.baseStyle }}>
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, flex: 1 }}
        >
          {selectedFilters.map((filter, index) => (
            <TagChip
              key={index}
              label={filter}
              variant="selected"
              onRemove={() => onFilterToggle(filter)}
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={() => setShowFilters(true)}
          style={{ ...styles.Touchable }}
        >
          <Icon name="options" size={16} />
          <BodyText>Filters</BodyText>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showFilters}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={{ ...styles.panelDisplay }}>
          <View style={{ ...styles.body }}>
            <Heading3>Filters</Heading3>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Icon name="close" size={24} />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {availableFilters.map((filter, index) => (
              <TagChip
                key={index}
                label={filter}
                variant={
                  selectedFilters.includes(filter) ? "selected" : "default"
                }
                onPress={() => onFilterToggle(filter)}
              />
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};
