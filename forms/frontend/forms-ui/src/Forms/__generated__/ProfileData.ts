/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileData
// ====================================================

export interface ProfileData_business {
  __typename: "Business";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ProfileData {
  __typename: "Profile";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  age: number | null;
  phoneNumber: string;
  business: ProfileData_business | null;
}
