/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FormsData
// ====================================================

export interface FormsData_profile_business {
  __typename: "Business";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface FormsData_profile {
  __typename: "Profile";
  name: string;
  age: number | null;
  phoneNumber: string;
  business: FormsData_profile_business | null;
}

export interface FormsData {
  profile: FormsData_profile | null;
}