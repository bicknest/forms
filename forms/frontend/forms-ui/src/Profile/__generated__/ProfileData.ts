/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProfileGender } from "./../../__generated__/globalTypes";

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
  name: string;
  age: number | null;
  phoneNumber: string;
  gender: ProfileGender | null;
  business: ProfileData_business | null;
}
