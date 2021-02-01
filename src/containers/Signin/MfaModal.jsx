// import React, { Component, Fragment } from "react";
// import { connect } from "react-redux";

// //for router history
// import { withRouter } from "react-router";

// // Handling form submission.
// import { Formik } from "formik";

// // Validation and error messages
// import * as Yup from "yup";

// // common components
// import Button from "../../components/Button/Button";
// import TextField from "../../components/TextField/TextField";
// import Card from "../../components/CardOne/CardOne";
// import WhiteHeader from "../../components/WhiteHeader/WhiteHeader";

// // actions
// import { authActions } from "../../actions";

// //config
// import config from "../../config";

// //opening a URL in the user's default browser using shell.openExternal()
// const shell = require("electron").shell;

// /** 
//  * @class (MfaModal)
// */
// class MfaModal extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoading: false,
//       serverError: "",
//       resendOTP: false,
//       seconds: 60,
//       otpExpired: false,
//       otpFailure: false,
//     };
//     this.startTimer = this.startTimer.bind(this);
//   }

//   handleSubmit = async (values) => {
//     const { authCode } = values;
//     this.props.doTotpVerify(authCode);
//   };

//   startTimer() {
//     this.myInterval = setInterval(() => {
//       const { seconds } = this.state;
//       if (seconds > 0) {
//         this.setState(({ seconds }) => ({
//           seconds: seconds - 1,
//         }));
//       }
//       if (seconds === 0) {
//         this.setState({ startTimer: false, otpExpired: true });
//         clearInterval(this.myInterval);
//       }
//     }, 1000);
//   }

//   componentDidMount() {
//     this.startTimer();
//   }

//   componentDidUpdate(prevProps) {
//     if (
//       prevProps.mfaFailure !== this.props.mfaFailure &&
//       !this.props.mfaProcess
//     )
//       this.setState({ otpFailure: true });
//     if (prevProps.mfaSuccess !== this.props.mfaSuccess) {
//       if (this.props.mfaSuccess) {
//         this.props.appLoadingStart();
//         this.props.startDeamon();
//         this.props.resetLoginProcess();
//         setTimeout(() => {
//           this.props.getDeviceStatus();
//           setTimeout(() => {
//             this.props.history.push("/app/dashboard");
//             this.props.appLoadingStop();
//           }, 10000);
//         }, 10000);
        
//       }
//     }
//   }
//   componentWillUnmount() {
//     clearTimeout(this.id);
//   }

//   resendCode = () => {
//     if (this.state.seconds > 0) {
//       clearInterval(this.myInterval);
//     }
//     this.setState({ seconds: 60 });
//     this.startTimer();
//     this.props.resendCode();
//     this.setState({ otpFailure: false, otpExpired: false });
//   };

//   render() {
//     const {
//       serverError,
//       isLoading,
//       mfaType,
//     } = this.props;

//     const schema = Yup.object().shape({
//       authCode: Yup.string()
//         .matches(/^[0-9]*$/, {
//           message: `${ mfaType === 2 ? 'SMS Code': 'Auth code'} must be a number`,
//           excludeEmptyString: false,
//         })
//         .length(6, `${ mfaType === 2 ? 'SMS Code': 'Auth code'} must be 6 digits`)
//         .required(`${ mfaType === 2 ? 'SMS Code': 'Auth code'} is required`),
//     });

//     return (
//       <Fragment>
//         <div className="auth-base-container">
//           <Card
//             containerClassName="auth-dialog-container ss-position-center"
//             className="p-0"
//           >
//             <WhiteHeader
//               label={
//                 <div className="text-center">
//                   {mfaType === 1 ? 
//                      <label>Authentication Code</label> :
//                     <h5>SMS Authentication</h5>
//                   }
//                 </div>
//               }
//             ></WhiteHeader>
//             <div className="mt-2 mb-2">
//               <Formik
//                 initialValues={{ authCode: "" }}
//                 validationSchema={schema}
//                 onSubmit={(values) => {
//                   this.handleSubmit(values);
//                 }}
//               >
//                 {({
//                   handleSubmit,
//                   handleBlur,
//                   handleChange,
//                   values,
//                   errors,
//                   touched,
//                 }) => (
//                   <form className="auth-form-container" onSubmit={handleSubmit}>
//                     <div className="form-group">
//                       {mfaType === 1 ? 
//                         <label>Authentication Code</label> :
//                         <label>SMS Code</label>
//                       }
                     
//                       <TextField
//                         name="authCode"
//                         type="text"
//                         value={values.authCode}
//                         onBlur={handleBlur}
//                         onChange={handleChange}
//                         error={
//                           errors.authCode && touched.authCode
//                             ? errors.authCode
//                             : null
//                         }
//                       />
//                     </div>
//                     {mfaType === 2 ? (
//                       <div className="text-center">
//                         {this.state.seconds > 0 ? (
//                           <span>
//                             Submit authentication code in <br />
//                             {`00:${this.state.seconds > 9? this.state.seconds:`0${this.state.seconds}` }`}
//                           </span>
//                         ) : (
//                           !isLoading && <span className="ss-text-danger ss-text-medium">
//                             Otp expired, resend otp
//                           </span>
//                         )}
//                       </div>
//                     ) : null}

//                     <div className="mt-4 text-center">
//                       <Button
//                         type="submit"
//                         text="Submit"
//                         btnClass="ss-text-large-4 ss-text-weight-400 w-50 pt-2 pb-2"
//                         isLoading={isLoading}
//                       />
//                     </div>

//                     {mfaType === 2 ? (
//                       <div className="mt-3 text-center">
//                         <button
//                           type="submit"
//                           text="resend code"
//                           className="resendButton"
//                           id="resendOTP"
//                           onClick={() => {
//                             if (this.state.otpFailure || this.state.otpExpired)
//                               this.resendCode();
//                           }}
//                           disabled={
//                             !this.state.otpFailure && !this.state.otpExpired
//                           }
//                         >Resend code</button>
//                       </div>
//                     ) : null}

//                     <div className="mt-3 mb-3 text-center">
//                       <span className="ss-text-light ss-text-medium">
//                       { mfaType === 2 ? `If you have problem getting OTP please`:`If you can’t access your authenticator app please`}&nbsp;
//                         <span
//                           onClick={() => {
//                             shell.openExternal(`${config.CONTACT_URL}`);
//                           }}
//                           className="ss-text-primary ss-cursor-pointer"
//                         >
//                           <u>Contact Us</u>
//                         </span>
//                       </span>
//                     </div>
//                   </form>
//                 )}
//               </Formik>
//             </div>
//             {serverError && (
//               <div className="text-center ss-text-danger ss-text-medium mt-2 mb-2">
//                 {serverError}
//               </div>
//             )}
//           </Card>
//         </div>
//       </Fragment>
//     );
//   }
// }

// const mapStateToProps = (state) => ({ ...state.authState });

// const mapDispatchToProps = (dispatch) => ({
//   doTotpVerify: (authCode) => dispatch(authActions.doTotpVerify(authCode)),
//   startDeamon: () => dispatch(authActions.startDeamon()),
//   getDeviceStatus: () => dispatch(authActions.getDeviceStatus()),
//   resetLoginProcess: () => dispatch(authActions.resetLoginProcess()),
//   appLoadingStart: () => dispatch(authActions.appLoadingStart()),
//   appLoadingStop: () => dispatch(authActions.appLoadingStop()),
//   resendCode: () => dispatch(authActions.resendCode()),
// });

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(MfaModal)
// );
