import React, { useEffect, useContext } from 'react'
import Button from '@mui/material/Button'
import { DataStore } from '../../../utils/DataStore'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Controller, useForm } from 'react-hook-form'
import Cookies from 'js-cookie'
import { List, ListItem, Grid, TextField } from '@material-ui/core'
export default function CustomerAddress() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const { state, dispatch } = useContext(DataStore)
  const {
    customerInfo,
    cart: { shippingAddress },
  } = state
  const [addressModalOpen, setAddressModalOpen] = React.useState(false)

  const handleAddressClickOpen = () => {
    setAddressModalOpen(true)
  }

  const handleAddressClose = () => {
    setAddressModalOpen(false)
  }

  // const submitHandler = ({addressLine1,addressLine12, city,state, postalCode, country }:{addressLine1:any,addressLine12:any, city:any,state:any, postalCode:any, country:any}) => {
  // }

  const submitHandler = () => {
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleAddressClickOpen}>
        Open form dialog
      </Button>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Dialog open={addressModalOpen} onClose={handleAddressClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={12} lg={12}>
                <List>
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
                          label="Address Line 1"
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
                        required: true,
                        minLength: 2,
                      }}
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="addressLine2"
                          label="Address Line 2"
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
                  <ListItem></ListItem>
                </List>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddressClose}>Cancel</Button>
            {/* <Button type="submit" width="100%">
              Continue
            </Button> */}
          </DialogActions>
        </Dialog>
      </form>
    </div>
  )
}
