import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { gql, useQuery } from "@apollo/client";

const ProfileListQuery = gql`
  query allProfiles {
    allProfiles {
      name
    }
  }
`;

export default function ProfileList() {
    const { data, loading, error } = useQuery(ProfileListQuery);
  if (error || !data) {
    return <div>Error!</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <Typography variant="h1">Profile List</Typography>
      <ul>
        {data?.allLoans?.edges?.map((n: any) => n?.node && <Typography {...n.node.name} />)}
      </ul>
    </Container>
  );
}
