import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  MediaTrendQuery,
  AiringScheduleQuery,
  RecommendationQuery,
} from "../../generated/graphql";
import { toDateHourString } from "../../utilities/date";

interface HomeProps {
  mediaTrend: MediaTrendQuery | undefined;
  airing: AiringScheduleQuery | undefined;
  recommendation: RecommendationQuery | undefined;
}

const Home: React.FC<HomeProps> = ({ mediaTrend, airing, recommendation }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.row}>
          <Text style={styles.title}>Trends</Text>
          <View style={styles.divider}></View>
        </View>
        <View style={styles.row}>
          {mediaTrend?.MediaTrend && (
            <View style={{ width: "calc(50% - 12px)" }}>
              <View>
                <img
                  alt="Media Trend"
                  src={
                    mediaTrend.MediaTrend.media?.coverImage?.extraLarge || ""
                  }
                  style={{ width: "100%" }}
                />
                <Text
                  style={{ fontWeight: "700", fontSize: 16, marginTop: 12 }}
                >
                  {mediaTrend.MediaTrend.media?.title?.userPreferred}
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={{ ...styles.row, marginTop: "40px" }}>
          <Text style={styles.title}>Airing Schedule</Text>
          <View style={styles.divider}></View>
        </View>
        <View style={styles.row}>
          {airing?.AiringSchedule && (
            <View style={{ width: "calc(50% - 12px)" }}>
              <Text>{toDateHourString(airing.AiringSchedule.airingAt)}</Text>
              <View>
                <img
                  alt="Media Trend"
                  src={
                    airing.AiringSchedule.media?.coverImage?.extraLarge || ""
                  }
                  style={{ width: "100%" }}
                />
                <Text
                  style={{ fontWeight: "700", fontSize: 16, marginTop: 12 }}
                >
                  {airing.AiringSchedule.media?.title?.userPreferred}
                </Text>
                <Text style={{ fontSize: 12 }}>
                  Episode {airing.AiringSchedule.episode || "?"}
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={{ ...styles.row, marginTop: "40px" }}>
          <Text style={styles.title}>Recommendation</Text>
          <View style={styles.divider}></View>
        </View>
        <View style={styles.row}>
          {recommendation?.Recommendation?.media && (
            <View style={{ width: "calc(50% - 12px)" }}>
              <View>
                <img
                  alt="Media Trend"
                  src={
                    recommendation.Recommendation.media.coverImage
                      ?.extraLarge || ""
                  }
                  style={{ width: "100%" }}
                />
                <Text
                  style={{ fontWeight: "700", fontSize: 16, marginTop: 12 }}
                >
                  {recommendation.Recommendation.media.title?.userPreferred}
                </Text>
              </View>
            </View>
          )}
          {recommendation?.Recommendation?.mediaRecommendation && (
            <View style={{ width: "calc(50% - 12px)" }}>
              <View>
                <img
                  alt="Media Trend"
                  src={
                    recommendation.Recommendation.mediaRecommendation.coverImage
                      ?.extraLarge || ""
                  }
                  style={{ width: "100%" }}
                />
                <Text
                  style={{ fontWeight: "700", fontSize: 16, marginTop: 12 }}
                >
                  {
                    recommendation.Recommendation.mediaRecommendation.title
                      ?.userPreferred
                  }
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
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
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 16,
  },
  divider: {
    borderBottomColor: "#757575",
  },
  imageFull: {
    width: 100,
  },
});

export default Home;
