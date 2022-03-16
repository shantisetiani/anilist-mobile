import { View, Text, StyleSheet } from "react-native";
import {
  useMediaTrendQuery,
  MediaTrendSort,
  useRecommendationQuery,
  RecommendationSort,
  useAiringScheduleQuery,
} from "../../generated/graphql";
import Home from "./Home";

const HomeContainer = () => {
  /* Get Datas - Start */
  const {
    data: mediaTrend,
    error: mediaTrendError,
    loading: mediaTrendLoading,
  } = useMediaTrendQuery({
    variables: { sort: MediaTrendSort.Trending },
  });

  const {
    data: airing,
    error: airingError,
    loading: airingLoading,
  } = useAiringScheduleQuery({
    variables: { notYetAired: true },
  });

  const {
    data: recommendation,
    error: recommendationError,
    loading: recommendationLoading,
  } = useRecommendationQuery({
    variables: { sort: RecommendationSort.RatingDesc },
  });
  /* Get Datas - End */

  if (mediaTrendLoading || airingLoading || recommendationLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Home
      mediaTrend={mediaTrend}
      airing={airing}
      recommendation={recommendation}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default HomeContainer;
