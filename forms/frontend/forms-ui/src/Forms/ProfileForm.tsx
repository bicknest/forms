import React from "react";
import * as Yup from "yup";
import { Formik, Field, FieldProps } from "formik";
import { gql, useMutation } from "@apollo/client";

import { ProfileData } from "./__generated__/ProfileData";
import { UpdateProfile, UpdateProfileVariables } from "./__generated__/UpdateProfile";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export const toCamel = (s: string) => {
  return s.replace(/([-_][a-z])/gi, $1 => {
    return $1
      .toUpperCase()
      .replace("-", "")
      .replace("_", "");
  });
};

export const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      flex: 1
    },
    textInput: {
      padding: "0 0 10px 0"
    }
  })
);

const fragments = {
  data: gql`
    fragment ProfileData on Profile {
      id
      name
      age
      phoneNumber
    }
  `
};

const UPDATE_PROFILE_INFORMATION = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      profile {
        ...ProfileData
      }
      errors {
        field
        messages
      }
    }
  }
  ${fragments.data}
`;

const ProfileFormSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  age: Yup.number(),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "Phone is not valid")
    .required("Required"),
});

interface Props {
  profile: ProfileData;
}

function ProfileForm(props: Props) {
  const classes = useStyles();
  const { profile } = props;
  const initialValues = {
        name: profile?.name || "",
        age: profile?.age || "",
        phoneNumber: profile?.phoneNumber || "",
  };
    const [updateProfile] = useMutation<UpdateProfile, UpdateProfileVariables>(UPDATE_PROFILE_INFORMATION);
  return (
    <Grid container item spacing={2} xs={12} sm={6}>
      <Paper className={classes.paper}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Enter the user's profile information
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          <Formik
            onSubmit={async (values) => 
              updateProfile({
                variables: {
                  input: {
                    id: profile?.id || "",
                    ...values,
                      age: typeof values.age === "string" ? parseInt(values.age) : values.age,
                  }
                }
              })
            }
            initialValues={initialValues}
            validationSchema={ProfileFormSchema}
          >
            {props => (
              <Grid item xs={12}>
                <Field name="name">
                  {({ field, form: { isSubmitting }, meta }: FieldProps) => (
                    <TextField
                      className={classes.textInput}
                      {...field}
                      id="acq"
                      label="Name"
                      fullWidth
                      variant="outlined"
                      error={!!meta.error}
                      helperText={meta.error}
                    ></TextField>
                  )}
                </Field>
                <Field name="age">
                  {({ field, form: { isSubmitting }, meta }: FieldProps) => (
                    <TextField
                      className={classes.textInput}
                      {...field}
                      type="number"
                      id="acq"
                      label="Age"
                      fullWidth
                      variant="outlined"
                      error={!!meta.error}
                      helperText={meta.error}
                    ></TextField>
                  )}
                </Field>
                <Field name="phoneNumber">
                  {({ field, form: { isSubmitting }, meta }: FieldProps) => (
                    <TextField
                      className={classes.textInput}
                      {...field}
                      id="acq"
                      label="Phone Number"
                      fullWidth
                      variant="outlined"
                      error={!!meta.error}
                      helperText={meta.error}
                    ></TextField>
                  )}
                </Field>
                <Button onClick={() => props.handleSubmit()}>
                    Submit
                </Button>
              </Grid>
            )}
          </Formik>
        </Grid>
      </Paper>
    </Grid>
  );
}

ProfileForm.fragments = fragments;

export default ProfileForm;
