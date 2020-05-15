import React from "react";
import { gql, useMutation } from "@apollo/client";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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
      gender
      business
    }
  `
};

interface Props {
  profile: ProfileData;
  saveID: number;
}

function ProfileForm(props: Props) {
  const classes = useStyles();
  return (
    <Grid container item spacing={2} xs={12} sm={6}>
      <Paper className={classes.paper}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom>
            Enter your profile information
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          <FormikWrapper>
            <Grid item xs={12}>
              <Field name="acquisitionChannel">
                {({ field, form: { isSubmitting }, meta }: FieldProps) => (
                  <TextField
                    {...field}
                    id="acq"
                    select
                    label="Acquisition Channel"
                    fullWidth
                    variant="outlined"
                    error={!!meta.error}
                  ></TextField>
                )}
              </Field>
            </Grid>
          </FormikWrapper>
        </Grid>
      </Paper>
    </Grid>
  );
}

ProfileForm.fragments = fragments;

export default ProfileForm;
