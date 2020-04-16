import { IonList, IonItem, IonLabel, IonText } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { getFeedListing } from "../services/loadfeed";

interface IFeed {
  description: string;
  title: string;
  pubDate: string;
}

function FeedPage(url: string) {
  const [initialized, setInitialized] = useState(false);
  const [listings, setListings] = useState([]);
  // const [data, setData] = useState({});

  const getListing = async (url: any) => {
    try {
      const response = await getFeedListing(url);
      setListings(response.data.items);
      // setData(response.data.feed);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    if (!initialized) {
      getListing(url);
      setInitialized(true);
    }
  }, [url, initialized]);

  return (
    <div>
      {listings.map((l: IFeed, i) => {
        return (
          <IonItem key={i}>
            <IonLabel>
              <IonText color="primary">
                <h3>{l.title}</h3>
              </IonText>
              <IonText color="secondary">
                <p>{l.description}</p>
              </IonText>
              <p>{l.pubDate} </p>
            </IonLabel>
          </IonItem>
        );
      })}
    </div>
  );
}

const News: React.FC = () => {
  // const { name } = useParams<{ name: string }>();

  // const feedList = FeedPage("https://www.smh.com.au/rss/feed.xml");
  // const feedList_hk = FeedPage("https://hk.news.yahoo.com/rss/hong-kong");
  const feedList_sbs = FeedPage("https://feeds.sbs.com.au/sbs-cantonese");

  return <IonList>{feedList_sbs}</IonList>;
};

export default News;
