import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const ProfileFormsQuery = gql`
  query ProfileForms {
    profile(pk: $pk) {
      ...ProfileForm
    }
  }
  ${ProfileForm.data}
`;

export default function ProfileForms() {
  const { pk } = useParams();
  const pk_num = Number(pk);
  const { data, loading, error } = useQuery<
    ProfileFormsQueryType,
    ProfileFormsQueryVariables
  >(ProfileFormsQuery, {
    variables: {
      pk: pk_num
    }
  });
  if (error) {
    return (
      <Container>
        <Typography>OH NO! ERROR! {error.message}</Typography>
      </Container>
    );
  }
  if (loading || !data) {
    return (
      <Container>
        <Typography>LOADING</Typography>
      </Container>
    );
  }
  const profile = data && data.profile;
  return (
    <Container>
      <Typography variant="h1">Profile Forms</Typography>
      <ProfileForm profile={profile} />
    </Container>
  );
}
