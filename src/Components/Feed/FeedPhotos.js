import React from "react";
import { PHOTOS_GET } from "../../Api/api";
import useFetch from "../../Hooks/useFetch";
import Loading from "../Helper/Loading";
import Error from "../Helper/Error";
import FeedPhotoItem from "./FeedPhotoItem";
import styles from "./FeedPhotos.module.css";

const FeedPhotos = ({ page,user,setModalPhoto,setInfinite }) => {
  const { data, loading, error, request } = useFetch();
  

  React.useEffect(() => {
      let total;
      const screen = window.innerWidth

      if (screen >= 1024 ) {
        total = 6
      } else if (screen >= 780) {
        total = 6
      } else {
        total = 6
      }

    async function fetchPhotos() {
      
      const { url, options } = PHOTOS_GET({
        page,
        total,
        user,
      });
      const {response,json } = await request(url, options);
      if(response && response.ok && json.length < total) setInfinite(false)
    }
    fetchPhotos();
  }, [request,user,page,setInfinite]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <ul className={`${styles.feed} animeTop`}>
        {data.map((photo) => (
          <FeedPhotoItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    );
  else return <Loading />;
};

export default FeedPhotos;
