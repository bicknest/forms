import { HttpLink } from "@apollo/client";

const link = new HttpLink({ uri: "localhost:8000/graphql" });

export default link;
