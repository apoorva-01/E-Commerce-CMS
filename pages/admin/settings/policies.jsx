import React, { useContext, useEffect, useState } from "react";
import db from "../../../utils/db";
import Store from "../../../models/Store";
import Layout from '../../../layouts/Layout/Layout';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextEditor from '../../../components/admin/ui/TextEditor'
import { useRouter } from 'next/router';
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
import Checkbox from '@mui/material/Checkbox';
import { Text } from '@components/ui'
export default function Policies({ store }) {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(AdminDataStore);
  const { adminStoreInfo } = state;
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (!adminStoreInfo) {
        router.push('/admin/login');
    }
}, [adminStoreInfo]);
  const [refundPolicyHtml, setRefundPolicyHtml] = React.useState(store?.policies?.RefundPolicyHtml?store?.policies?.RefundPolicyHtml:null);
  const [privacyPolicyHtml, setPrivacyPolicyHtml] = React.useState(store?.policies?.PrivacyPolicyHtml?store?.policies?.PrivacyPolicyHtml:null);
  const [shippingPolicyHtml, setShippingPolicyHtml] = React.useState(store?.policies?.ShippingPolicyHtml?store?.policies?.ShippingPolicyHtml:null);
  const [termsOfServiceHtml, setTermsOfServiceHtml] = React.useState(store?.policies?.TermsOfServiceHtml?store?.policies?.TermsOfServiceHtml:null);


  const submitHandler = async ({ }) => {
    closeSnackbar();
    try {
      setButtonProgressLoading(true)
      await axios.post('/api/admin/store/policies', {
         refundPolicyHtml,
        privacyPolicyHtml,
         shippingPolicyHtml,
        termsOfServiceHtml,
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
        {adminStoreInfo ? (<>
          <form onSubmit={handleSubmit(submitHandler)} >
            <Text variant="pageHeading">Store policies</Text>

            <Typography fontWeight={700} component="p"></Typography>
            <Typography sx={{ mb: 2 }} component="p">Create your own store policies, or customize a template. Saved policies are linked in the footer of your checkout. </Typography>

            <Paper sx={{ p: 3, my: 3 }} variant="outlined" square>
              <Typography sx={{ my: 1, fontWeight: 700 }} component="p">Refund policy</Typography>
              <TextEditor text={refundPolicyHtml} setText={setRefundPolicyHtml} />
            </Paper>
            <Paper sx={{ p: 3, my: 3 }} variant="outlined" square>
              <Typography sx={{ my: 1, fontWeight: 700 }} component="p">Privacy policy</Typography>
              <TextEditor text={privacyPolicyHtml} setText={setPrivacyPolicyHtml} />
            </Paper>
            <Paper sx={{ p: 3, my: 3 }} variant="outlined" square>
              <Typography sx={{ my: 1, fontWeight: 700 }} component="p">Terms of service</Typography>
              <TextEditor text={shippingPolicyHtml} setText={setShippingPolicyHtml} />
            </Paper>
            <Paper sx={{ p: 3, my: 3 }} variant="outlined" square>
              <Typography sx={{ my: 1, fontWeight: 700 }} component="p">Shipping policy</Typography>
              <TextEditor text={termsOfServiceHtml} setText={setTermsOfServiceHtml} />
            </Paper>



            <ButtonSaveProgress text='Save' size='md' buttonProgressLoading={buttonProgressLoading} setButtonProgressLoading={setButtonProgressLoading} />

          </form>





        </>) : (<></>)}
      </Box>
    </Layout>

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
