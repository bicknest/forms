/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FormsData
// ====================================================

export interface FormsData_profile {
  __typename: "Profile";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  age: number | null;
  phoneNumber: string;
}

export interface FormsData {
  profile: FormsData_profile | null;
}

export interface FormsDataVariables {
  pk?: number | null;
}
