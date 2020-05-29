import React from "react";
import * as Yup from "yup";
import { Formik, Field, FieldProps } from "formik";
import { gql, useMutation } from "@apollo/client";

import { ProfileData } from "./__generated__/ProfileData";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      flex: 1
    }
  })
);

const fragments = {
  data: gql`
    fragment ProfileData on Profile {
      name
      age
      phoneNumber
      business {
        id
      }
    }
  `
};

const ProfileFormSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  age: Yup.number(),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "Phone is not valid")
    .required("Required")
});

interface Props {
  profile: ProfileData;
}

function ProfileForm(props: Props) {
  const classes = useStyles();
  const initialValues = { age: 0 };
  return (
    <Grid container item spacing={2} xs={12} sm={6}>
      <Paper className={classes.paper}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom>
            Enter your profile information
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          <Formik
            onSubmit={values => console.log(values)}
            initialValues={initialValues}
            validationSchema={ProfileFormSchema}
          >
            {props => (
              <Grid item xs={12}>
                <Field name="name">
                  {({ field, form: { isSubmitting }, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      id="acq"
                      select
                      label="Name"
                      fullWidth
                      variant="outlined"
                      error={!!meta.error}
                    ></TextField>
                  )}
                </Field>
                <Field name="age">
                  {({ field, form: { isSubmitting }, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      type="number"
                      id="acq"
                      select
                      label="Age"
                      fullWidth
                      variant="outlined"
                      error={!!meta.error}
                    ></TextField>
                  )}
                </Field>
                <Field name="phoneNumber">
                  {({ field, form: { isSubmitting }, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      id="acq"
                      select
                      label="Phone Number"
                      fullWidth
                      variant="outlined"
                      error={!!meta.error}
                    ></TextField>
                  )}
                </Field>
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
