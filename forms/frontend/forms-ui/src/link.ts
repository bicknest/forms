import { HttpLink } from "@apollo/client";

export default new HttpLink({ uri: "http://localhost:8000/graphql" });
