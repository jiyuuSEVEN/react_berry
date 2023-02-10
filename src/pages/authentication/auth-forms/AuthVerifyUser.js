import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

import AnimateButton from 'components/@extended/AnimateButton';

// project imports
import { selectCurrentUserEmail } from '../../../store/reducers/auth';
import { useVerifyOTPMutation, useSendOTPMutation } from '../../../store/reducers/api/auth.api';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthVerifyUser = () => {
    const email = useSelector(selectCurrentUserEmail);
    const navigate = useNavigate();
    const [verifyOTP] = useVerifyOTPMutation();
    const [sendOTP] = useSendOTPMutation();
    const [isResentOTP, setIsResentOTP] = useState(false);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            } else if (seconds === 0 && isResentOTP) {
                setIsResentOTP(false);
            }
        }, 1000);
    }, [seconds, isResentOTP]);

    const onResendOTP = async () => {
        await setSeconds(60);
        await setIsResentOTP(true);
        // api call
        sendOTP({ email });
    };

    const onVerificationSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
        values.email = email;
        try {
            setStatus({ success: true });
            setSubmitting(true);

            // api call
            verifyOTP({ ...values })
                .unwrap()
                .then(() => {
                    navigate('/login', { replace: true });
                })
                .catch((value) => {
                    setSubmitting(false);
                    setStatus({ success: false });
                    if (value.status === 409) {
                        setErrors({ submit: 'Invalid OTP' });
                    } else {
                        setErrors({ submit: 'Sorry! Somthing went wrong' });
                    }
                });
        } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
        }
    };

    return (
        <>
            <Formik
                initialValues={{
                    otp: ''
                }}
                validationSchema={Yup.object().shape({
                    otp: Yup.string().max(6).required('OTP is required')
                })}
                onSubmit={onVerificationSubmit}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-otp">Email Address</InputLabel>
                                    <OutlinedInput
                                        id="email-otp"
                                        type="number"
                                        value={values.otp}
                                        name="otp"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter OTP"
                                        fullWidth
                                        error={Boolean(touched.otp && errors.otp)}
                                    />
                                    {touched.otp && errors.otp && (
                                        <FormHelperText error id="standard-weight-helper-text-email-otp">
                                            {errors.otp}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            <Grid item xs={12} sx={{ mt: -1 }}>
                                <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                                    {isResentOTP ? (
                                        <Typography variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                                            Time Remaining: 00:{seconds > 9 ? seconds : '0' + seconds}
                                        </Typography>
                                    ) : (
                                        <Button disabled={isResentOTP} variant="text" color="primary" onClick={() => onResendOTP()}>
                                            Resend OTP
                                        </Button>
                                    )}
                                </Stack>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Login
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthVerifyUser;
