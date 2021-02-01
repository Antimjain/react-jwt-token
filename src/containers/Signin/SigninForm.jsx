import React from 'react';

// Handling form submission.
import { Formik } from 'formik';

// Validation and error messages
import * as Yup from 'yup';

// common components
import Button from '../../components/Button/Button';
import TextField from '../../components/TextField/TextField';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
});

/**
 * Signin Form
 */
const SigninForm = (props) => (
  <Formik
    initialValues={{ email: '', password: '' }}
    validationSchema={schema}
    onSubmit={values => {
      props.handleSubmit(values);
    }}>
    {({ handleSubmit, handleBlur, handleChange, values, errors, touched }) => (
      <form className="signin-form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <TextField
            name="email"
            type="email"
            placeholder="Type your email"
            className="ss-text-box-40"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.email && touched.email ? errors.email : null}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <TextField
            name="password"
            type="password"
            placeholder="Type your password"
            className="ss-text-box-40"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.password && touched.password ? errors.password : null}
          />
        </div>
        <span onClick={props.forgotPassword} className="ss-text-primary ss-cursor-pointer"><u>Forgot password?</u></span>
        <div>
          <Button btnClass="mt-4" type="submit" text="Login" isLoading={props.isLoading} />
        </div>
      </form>
    )}
  </Formik>
)

export default SigninForm;

