import { useState } from "react";
import { useMediaListQuery, MediaListSort } from "../../generated/graphql";
import MediaList, { MediaFilter } from "./MediaList";

const MediaListContainer = () => {
  /* Filter's state */
  const [mediaFilter, setMediaFilter] = useState<MediaFilter>({
    sort: MediaListSort.MediaPopularityDesc,
  } as MediaFilter);

  /* Get data */
  const {
    data: mediaList,
    error: listError,
    loading: listLoading,
  } = useMediaListQuery({
    variables: {
      sort: mediaFilter.sort,
      type: mediaFilter.type,
      status: mediaFilter.status,
    },
  });

  return (
    <MediaList
      mediaList={mediaList}
      loading={listLoading}
      mediaFilter={mediaFilter}
      setMediaFilter={setMediaFilter}
    />
  );
};

export default MediaListContainer;
