// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthVerifyUser from './auth-forms/AuthVerifyUser';
import AuthWrapper from './AuthWrapper';

// ================================|| LOGIN ||================================ //

const VerifyUser = () => (
    <AuthWrapper>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h3">Verification</Typography>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <AuthVerifyUser />
            </Grid>
        </Grid>
    </AuthWrapper>
);

export default VerifyUser;
