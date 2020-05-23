/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allProfiles
// ====================================================

export interface allProfiles_allProfiles_edges_node {
  __typename: "Profile";
  name: string;
}

export interface allProfiles_allProfiles_edges {
  __typename: "ProfileEdge";
  /**
   * The item at the end of the edge
   */
  node: allProfiles_allProfiles_edges_node | null;
}

export interface allProfiles_allProfiles {
  __typename: "ProfileConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (allProfiles_allProfiles_edges | null)[];
}

export interface allProfiles {
  allProfiles: allProfiles_allProfiles | null;
}
