import React, { useContext, useEffect, useState } from "react";
import db from "../../../utils/db";
import Store from "../../../models/Store";
import { useRouter } from 'next/router';
import Layout from '../../../layouts/Layout/Layout';
import TextEditor from '../../../components/admin/ui/TextEditor'
import { AdminDataStore } from '../../../utils/admin/AdminDataStore';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import useStyles from '../../../utils/admin/styles';
import ButtonSaveProgress from '../../../components/admin/ui/ButtonSaveProgress'
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { Text } from '@components/ui'
export default function Setting({ store }) {
    const classes = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { state, dispatch } = useContext(AdminDataStore);
    const { adminStoreInfo } = state;
    const router = useRouter();
    useEffect(() => {
        if (!adminStoreInfo) {
            router.push('/admin/login');
        }
    }, [adminStoreInfo,router]);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();




    const [bioHtml, setBio] = useState(store?.bio ? store?.bio : null)
    const [aboutHtml, setAbout] = useState(store?.about ? store?.about : null)


    const [storeAudience, setStoreAudience] = React.useState(
        store ? (
            store.storeDetails ? (
                store.storeDetails.storeAudience ? (store.storeDetails.storeAudience) : ''
            ) : ''
        ) : ''
    );
    const handleStoreAudience = (e) => {
        setStoreAudience(e.target.value);
    };

    const submitHandler = async ({ companyName, storeIndustry}) => {
        closeSnackbar();
        try {
            setButtonProgressLoading(true)
            await axios.post('/api/admin/store/store-details', {
                companyName, storeIndustry, storeAudience,bioHtml,aboutHtml
            });
            setButtonProgressLoading(false)
            enqueueSnackbar("Updated Successfully", { variant: 'success' });
        } catch (err) {
            enqueueSnackbar(err, { variant: 'error' });
        }
    };


    const [buttonProgressLoading, setButtonProgressLoading] = React.useState(false);


    return (
        <Layout>
            <Box sx={{ width: '100%', px: 4 }} >
                {store ? (<>
                    <form onSubmit={handleSubmit(submitHandler)} >
                        <Text variant="pageHeading">Store Details</Text>
                        <Typography fontWeight={700} component="p">Store Contact Information</Typography>
                        <Typography sx={{ mb: 2 }} component="p">Your customers will use this information to contact you</Typography>
                        <Paper sx={{ p: 3 }} variant="outlined" square>
                            <Typography component="p">Store Name</Typography>
                            <Typography component="p">How would you categorize your store?</Typography>

                            <Controller
                                name="companyName"
                                control={control}
                                rules={{
                                    required: false,
                                    minLength: 2,
                                }}
                                defaultValue={store?.storeDetails?.companyName}

                                render={({ field }) => (
                                    <TextField
                                        variant="outlined"
                                        sx={{ my: 2 }}
                                        fullWidth
                                        label='Legal Name Of Company'
                                        inputProps={{ type:  'text' }}
                                        error={Boolean(errors.companyName)}
                                        helperText={
                                            errors.name
                                                ? errors.name.type === 'minLength'
                                                    ? 'Company Name length is more than 1'
                                                    : ''
                                                : ''
                                        }
                                        {...field}
                                    ></TextField>
                                )}
                            ></Controller>

                            <Controller
                                name="storeIndustry"
                                control={control}
                                rules={{
                                    required: false,
                                    minLength: 2,
                                }}

                                defaultValue={store?.storeDetails?.storeIndustry}
                                render={({ field }) => (
                                    <TextField
                                        variant="outlined"
                                        sx={{ my: 2 }}
                                        fullWidth
                                        label='Store Industry'
                                        inputProps={{ type: 'text' }}
                                        error={Boolean(errors.storeIndustry)}
                                        helperText={
                                            errors.name
                                                ? errors.name.type === 'minLength'
                                                    ? 'Store Industry length should be more than 1'
                                                    : ''
                                                : ''
                                        }
                                        {...field}
                                    ></TextField>
                                )}
                            ></Controller>


                    

                            <FormControl sx={{ m: 1, minWidth: 120, width: '100%' }}>
                                <InputLabel id="demo-simple-select-helper-label">Approximately how large is your audience?</InputLabel>

                                <Select
                                    label="Your Total Audience"
                                    onChange={handleStoreAudience}
                                    defaultValue={storeAudience}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'Less Than 1000'}>Less Than 1000</MenuItem>
                                    <MenuItem value={'1000 - 10000'}>1,000 - 10,000</MenuItem>
                                    <MenuItem value={'10000 - 100000'}>10,000 - 100,000</MenuItem>
                                    <MenuItem value={'100000 - 1000000'}>100,000 - 1000,000</MenuItem>
                                    <MenuItem value={'100000 - 1000000'}>100,000 - 1,000,000</MenuItem>
                                    <MenuItem value={'1,000,000 +'}>1,000,000 +</MenuItem>

                                </Select>
                            </FormControl>
                        </Paper>
                        <Paper sx={{ p: 3 }} variant="outlined" square>
                        <Typography fontWeight={700} sx={{ mt: 2 }} component="p">Company's Bio</Typography>
                        <TextEditor text={bioHtml} setText={setBio} />
                        <Typography fontWeight={700} sx={{ mt: 2 }} component="p">About Company</Typography>
                        <TextEditor text={aboutHtml} setText={setAbout} />
                        </Paper>

                        <ButtonSaveProgress text='Save' size='md' buttonProgressLoading={buttonProgressLoading} setButtonProgressLoading={setButtonProgressLoading} />

                    </form>




                    {/* <TextField fullWidth id="outlined-basic" label={store.username} variant="outlined" disabled /> */}
                    {/* <Typography  component="p">https://makemycommerce/{store.username}</Typography> */}

                    {/* <Grid sx={{ my: 1 }} container spacing={2}>
                    <Grid item xs={12} lg={6}>
                        <Typography  component="p">Store contact email</Typography>
                        <TextField fullWidth id="outlined-basic" label={email} variant="outlined" disabled />
                        <Typography  component="p">We'll use this address if we need to contact you about your store.</Typography>

                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Typography  component="p">Sender email</Typography>
                        <TextField fullWidth id="outlined-basic" label={email} variant="outlined" disabled />
                        <Typography  component="p">Your customers will see this address if you email them.</Typography>

                    </Grid>

                </Grid> */}
                </>) : (<></>)}
            </Box>
        </Layout >

    )
}




export async function getServerSideProps() {
    await db.connect();
    const store = await Store.find({ _id: process.env.STORE_OBJECT_ID }).lean();
    await db.disconnect();
    return {
        props: {
            store: store.map(db.convertDocToObj)[0],
        },
    };
}
