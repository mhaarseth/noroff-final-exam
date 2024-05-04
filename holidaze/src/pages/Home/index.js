import React from "react";
import { useApi } from "../../hooks/useApi";
import { ALL_VENUES_URL } from "../../constants/constants";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  const { data, isLoading, isError } = useApi(ALL_VENUES_URL);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContentContainer}>
        <h2>All venues</h2>
        <div className={styles.container}>
          {data.map((venue) => (
            <div className={styles.card} key={venue.id}>
              <div className={styles.imgContainer}>
                {venue.media.length > 0 && (
                  <img src={venue.media[0].url} alt={venue.media[0].alt} />
                )}
              </div>
              <div className={styles.cardBottomContainer}>
                <div className={styles.cardTextContainer}>
                  <h3 className={styles.venueName}>{venue.name}</h3>
                  <p>
                    {venue.location.city}, {venue.location.country}
                  </p>
                </div>
                <Link to={`/venue/${venue.id}`} className={styles.button}>
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
