import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ButtonComponent from "../../components/Button/ButtonComponent";
import FormikFormDatePicker from "../../components/FormikFormHandlers/FormikFormDatePicker";
import FormikFormInput from "../../components/FormikFormHandlers/FormikFormInput";
import FormikFormNumberInput from "../../components/FormikFormHandlers/FormikFormNumberInput";
import { DateFormatForDatePicker } from "../../constants/DatePicker.constant";
import { useProfiles } from "../../context/ProfileContext";
import { initialValues } from "../../core/initialState/AddEditProfileForm";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(
      /^[A-Za-z]{3,}$/,
      "First name must be at least 3 characters long, with no spaces or special characters"
    )
    .required("First name is required"),
  lastName: Yup.string()
    .matches(
      /^[A-Za-z]{3,}$/,
      "Last name must be at least 3 characters long, with no spaces or special characters"
    )
    .required("Last name is required"),
  email: Yup.string()
    .email("Email must be a valid format")
    .required("Email is required"),
  contactNumber: Yup.string().matches(
    /^\d{10}$/,
    "Contact number must be exactly 10 digits"
  ),
  age: Yup.number()
    .positive("Age must be a positive number")
    .integer("Age must be an integer"),
});

const AddEditProfileForm = () => {
  const { profiles, updateProfileById, createNewProfile } = useProfiles();

  const navigate = useNavigate();
  const location = useLocation();
  const updatedValues = location.state?.updatedValues || null;
  const [initialValuesSetting, setInitialValues] = useState<any>(null);

  useEffect(() => {
    if (updatedValues) {
      const profile = profiles.find((profile) => profile.id === updatedValues);
      if (profile) {
        setInitialValues({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          contactNumber: profile.contactNumber,
          dob: profile.dob,
          age: profile.age,
        });
      }
    } else {
      setInitialValues(initialValues);
    }
  }, [updatedValues, profiles]);

  const handleNavigateBack = () => {
    navigate("/profile-management/profile");
  };

  const handleClose = () => {
    navigate("/profile-management/profile");
  };

  const handleSubmit = async (values: any) => {
    if (updatedValues) {
      if (values.dob) {
        let dob = moment(values.dob.$d).format(DateFormatForDatePicker);
        values.dob = dob;
      }
      values.id = updatedValues;
      await updateProfileById(updatedValues, values);
    } else {
      if (values.dob) {
        let dob = moment(values.dob.$d).format(DateFormatForDatePicker);
        values.dob = dob;
      }
      await createNewProfile(values);
    }
    navigate("/profile-management/profile");
  };

  return (
    <>
      <Grid container alignItems="center">
        <Grid item sx={{ m: 4 }}>
          <ButtonComponent
            startIcon={<ArrowBackIcon />}
            onClick={handleNavigateBack}
            label={""}
            color="info"
            id={"navigate_back"}
          />
        </Grid>
      </Grid>
      <Formik
        initialValues={initialValuesSetting}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form id="AddEditForm">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography
                            variant="h6"
                            color="primary"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            {updatedValues
                              ? "Update Personal Details "
                              : "Add Personal Details"}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Field
                            name="firstName"
                            type="text"
                            id="firstName_Field"
                            placeholder="Enter First Name"
                            as={FormikFormInput}
                            InputLabelProps={{ shrink: true }}
                            label="First Name"
                            size="small"
                            sx={{ width: "100%" }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Field
                            name="lastName"
                            type="text"
                            id="lastName_Field"
                            placeholder="Enter Last Name"
                            as={FormikFormInput}
                            InputLabelProps={{ shrink: true }}
                            label="Last Name"
                            size="small"
                            sx={{ width: "100%" }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Field
                            name="email"
                            type="text"
                            id="email_Field"
                            placeholder="Enter Email"
                            as={FormikFormInput}
                            InputLabelProps={{ shrink: true }}
                            label="Email"
                            size="small"
                            sx={{ width: "100%" }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Field
                            name="contactNumber"
                            type="text"
                            id="contactNumber_Field"
                            placeholder="Enter Contact Number"
                            as={FormikFormNumberInput}
                            InputLabelProps={{ shrink: true }}
                            label="Contact Number"
                            size="small"
                            sx={{ width: "100%" }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Field
                            name="age"
                            type="text"
                            id="age_Field"
                            placeholder="Enter Age"
                            InputLabelProps={{ shrink: true }}
                            as={FormikFormNumberInput}
                            label="Age"
                            sx={{ width: "100%" }}
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Field
                            name="dob"
                            type="text"
                            id="dob_Field"
                            placeholder="Enter DOB"
                            as={FormikFormDatePicker}
                            disableFuture
                            sx={{ width: "100%" }}
                            label="DOB"
                            // size="small"
                          />
                        </Grid>
                        <Grid
                          container
                          justifyContent="flex-end"
                          spacing={2}
                          mt={2}
                        >
                          <Grid item>
                            <ButtonComponent
                              type="button"
                              variant="contained"
                              onClick={handleClose}
                              color="inherit"
                              size="small"
                              id="btn_cancel_submit"
                              label="Cancel"
                            />
                          </Grid>
                          <Grid item>
                            <ButtonComponent
                              type="submit"
                              variant="contained"
                              color="primary"
                              form="AddEditForm"
                              size="small"
                              id="btn_Filter_submit"
                              label="Submit"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default AddEditProfileForm;
