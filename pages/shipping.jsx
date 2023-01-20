import {
  List,
  ListItem,
  Grid,
  TextField,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { useUI } from '@components/ui/context'
import React, { useContext, useEffect } from 'react';
import { DataStore } from '../utils/DataStore';
import useStyles from '../utils/styles';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import CheckoutWizard from '../components/CheckoutWizard';
import { Button } from '@components/ui'
import { Layout } from '@components/common'
export default function Shipping() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const { state, dispatch } = useContext(DataStore);
  const {
    customerInfo,
    cart: { shippingAddress },
  } = state;

  const { closeSidebarIfPresent, openModal } = useUI()


  useEffect(() => {
    closeSidebarIfPresent()
    if (!customerInfo) {
      router.push('/');
      openModal()
    }
    const orderInfo=Cookies.get('orderInfo')
    if (!orderInfo) {
      router.push('/cart');
    }
    setValue('fullName', shippingAddress.fullName);
    setValue('addressLine1', shippingAddress.addressLine1);
    setValue('addressLine2', shippingAddress.addressLine2);
    setValue('state', shippingAddress.state);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, [customerInfo,setValue,router,shippingAddress.fullName,shippingAddress.addressLine1,shippingAddress.addressLine2,shippingAddress.state,shippingAddress.city,shippingAddress.postalCode, shippingAddress.country,openModal,closeSidebarIfPresent]);

  const classes = useStyles();
  const submitHandler = ({ fullName, addressLine1,addressLine2,state, city, postalCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, addressLine1,addressLine2,state, city, postalCode, country },
    });
    Cookies.set('shippingAddress', JSON.stringify({
      fullName, addressLine1,addressLine2,state, city, postalCode, country
    }));
    router.push('/payment');
  };
  return (
    <>
      <CheckoutWizard activeStep={1} />
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>


        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} lg={6}>
       
            <List>
              <ListItem>
                <Controller
                  name="fullName"
                  defaultValue={customerInfo?.name}
                  control={control}
                  rules={{
                  }}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      variant="outlined"
                      id="fullName"
                      defaultValue={customerInfo?.name}
                      label="Full Name"
                      error={Boolean(errors.fullName)}
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="addressLine1"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="addressLine1"
                      label="Address"
                      error={Boolean(errors.addressLine1)}
                      helperText={
                        errors.addressLine1
                          ? errors.addressLine1.type === 'minLength'
                            ? 'Address Line 1 length is more than 1'
                            : 'Address Line 1 is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="addressLine2"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: false,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="addressLine2"
                      label="Landmark Near By"
                      error={Boolean(errors.addressLine2)}
                      helperText={
                        errors.addressLine2
                          ? errors.addressLine2.type === 'minLength'
                            ? 'Address Line 2 length is more than 1'
                            : 'Address Line 2 is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="state"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="state"
                      label="State"
                      error={Boolean(errors.state)}
                      helperText={
                        errors.state
                          ? errors.state.type === 'minLength'
                            ? 'State length is more than 1'
                            : 'State is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="city"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="city"
                      label="City"
                      error={Boolean(errors.city)}
                      helperText={
                        errors.city
                          ? errors.city.type === 'minLength'
                            ? 'City length is more than 1'
                            : 'City is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="postalCode"
                  control={control}
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="postalCode"
                      label="Postal Code"
                      type="number"
                      error={Boolean(errors.postalCode)}
                      helperText={
                        errors.postalCode
                          ? errors.postalCode.type === 'minLength'
                            ? 'Postal Code length is more than 1'
                            : 'Postal Code is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="country"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="country"
                      label="Country"
                      error={Boolean(errors.country)}
                      helperText={
                        errors.country
                          ? errors.country.type === 'minLength'
                            ? 'Country length is more than 1'
                            : 'Country is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
   
                <Button type="submit"  width="100%" >
                 Continue
                </Button>
               
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </form>

      </>
  );
}

Shipping.Layout = Layout