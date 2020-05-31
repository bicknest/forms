/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateProfileInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateProfile
// ====================================================

export interface UpdateProfile_updateProfile_profile_business {
  __typename: "Business";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface UpdateProfile_updateProfile_profile {
  __typename: "Profile";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  age: number | null;
  phoneNumber: string;
  business: UpdateProfile_updateProfile_profile_business | null;
}

export interface UpdateProfile_updateProfile_errors {
  __typename: "ErrorType";
  field: string;
  messages: string[];
}

export interface UpdateProfile_updateProfile {
  __typename: "UpdateProfilePayload";
  profile: UpdateProfile_updateProfile_profile | null;
  errors: (UpdateProfile_updateProfile_errors | null)[] | null;
}

export interface UpdateProfile {
  updateProfile: UpdateProfile_updateProfile | null;
}

export interface UpdateProfileVariables {
  input: UpdateProfileInput;
}
