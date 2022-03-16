import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import SelectDropdown from "react-native-select-dropdown";
import {
  MediaListQuery,
  MediaListSort,
  MediaType,
  MediaListStatus,
} from "../../generated/graphql";
import { capitalizeFirstLetter } from "../../utilities/string";

interface MediaListProps {
  mediaList: MediaListQuery | undefined;
  loading: boolean;
  mediaFilter: MediaFilter;
  setMediaFilter: Dispatch<SetStateAction<MediaFilter>>;
}

export interface MediaFilter {
  sort: MediaListSort | null;
  type: MediaType;
  status: MediaListStatus;
}

const MediaList: React.FC<MediaListProps> = ({
  mediaList,
  loading,
  mediaFilter,
  setMediaFilter,
}) => {
  const typeList = Object.values(MediaType);
  const statusList = Object.values(MediaListStatus);

  /* Handle media type filter on change */
  const onMediaTypeChange = (value: MediaType) => {
    setMediaFilter({ ...mediaFilter, sort: null, type: value });
  };

  /* Handle media status filter on change */
  const onMediaStatusChange = (value: MediaListStatus) => {
    setMediaFilter({ ...mediaFilter, sort: null, status: value });
  };

  const renderFilter = () => (
    <View>
      <View style={styles.row}>
        <View>
          <Text>Media Type</Text>
          <SelectDropdown
            data={typeList}
            onSelect={onMediaTypeChange}
            buttonTextAfterSelection={(selectedItem) => {
              return selectedItem;
            }}
            rowTextForSelection={(item) => {
              return item;
            }}
            buttonStyle={{
              borderStyle: "solid",
              borderColor: "#333",
              backgroundColor: "white",
              marginTop: "8px",
              marginBottom: "12px",
              width: "100%",
            }}
          />
        </View>
        <View>
          <Text>Media Status</Text>
          <SelectDropdown
            data={statusList}
            onSelect={onMediaStatusChange}
            buttonTextAfterSelection={(selectedItem) => {
              return selectedItem;
            }}
            rowTextForSelection={(item) => {
              return item;
            }}
            buttonStyle={{
              borderStyle: "solid",
              borderColor: "#333",
              backgroundColor: "white",
              marginTop: "8px",
              marginBottom: "12px",
              width: "100%",
            }}
          />
        </View>
      </View>
    </View>
  );

  const data = mediaList?.MediaList;
  const tableHead = ["Title", "Type", "Genre", "Status", "Episode"];
  const tableData = [
    [
      data?.media?.title?.userPreferred || "",
      data?.media?.type || "",
      data?.media?.genres ? data.media.genres.join(", ") : "-",
      data?.status || "",
      data?.media?.episodes || "",
    ],
  ];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>Media List</Text>
        </View>
      </View>
      <View style={{ ...styles.row, margin: "0 0 12px" }}>
        {renderFilter()}
      </View>
      <View style={styles.row}>
        <View>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <Table borderStyle={{ borderWidth: 2, borderColor: "#000" }}>
              <Row
                data={tableHead}
                textStyle={{ margin: "0 8px", textAlign: "center" }}
              />
              <Rows data={tableData} textStyle={{ marginLeft: 8 }} />
            </Table>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  title: {
    fontWeight: "bold",
    fontSize: 32,
    marginBottom: 16,
  },
});

export default MediaList;
