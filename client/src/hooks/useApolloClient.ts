import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { init } from "../store/apollo-client";

export const useApolloClient = () => {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();

  const initApollo = useCallback(async () => {
    const client = await init();
    setClient(client);
  }, []);

  useEffect(() => {
    initApollo();
  }, [initApollo]);

  return client;
};
