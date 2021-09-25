import { ApolloProvider } from "@apollo/client";
import { useApolloClient } from "../../hooks/useApolloClient";
import { useInitializedUserId } from "../../hooks/useInitializeUserId";
import Loading from "../Loading/Loading";

const ClientInit: React.FC = ({ children }) => {
  const client = useApolloClient();
  const userId = useInitializedUserId();

  if (!client || !userId) {
    return <Loading />;
  }

  return (
    <>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </>
  );
};

export default ClientInit;
