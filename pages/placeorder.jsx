import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { DataStore } from '../utils/DataStore';
// import { Layout } from '@components/common'
import { Navbar } from '@components/common'

import { Text } from '@components/ui'
import NextLink from 'next/link';
import Image from 'next/image';
import { useUI } from '@components/ui/context'
import {
  Grid,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  CircularProgress,
  Card,
  List,
  ListItem,
} from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import useStyles from '../utils/styles';
import CheckoutWizard from '../components/CheckoutWizard';
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import { Button } from '@components/ui'
function PlaceOrder() {
  const classes = useStyles();
  const router = useRouter();
  const { state, dispatch } = useContext(DataStore);
  const { openModal } = useUI()
  const {
    customerInfo,
    storeInfo,
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state;
  let orderInfo = JSON.parse(Cookies.get('orderInfo'));
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
  const itemsPrice = orderInfo?.subTotal
  const shippingPrice = orderInfo?.shippingPrice;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = orderInfo?.total;



  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
    if (!customerInfo) {
      router.push('/');
      openModal()
    }
    if (paymentMethod.length === 0) {
      router.push('/cart');
    }
  }, [paymentMethod, router, customerInfo, openModal]);
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);



  const justPlaceOrder = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        '/api/orders',
        {
          customerID: customerInfo._id,
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${customerInfo.token}`
          },
        }
      );
      // console.log(storeInfo)
      // console.log(customerInfo?.email)

      // New Order Notification to Owner
      await axios.post(
        '/api/email/new-order',
        {
          storeEmail: storeInfo?.email,
          orderItems: cartItems,
          paymentMethod,
          totalPrice,
        });
      // Order Details Notification to Customer
      await axios.post(
        '/api/email/customer-order-details',
        {
          customerEmail: customerInfo?.email,
          orderItems: cartItems,
          paymentMethod,
          totalPrice,
        });
      await axios.post(
        '/api/customers/order-count',
        { customerInfo });

      dispatch({ type: 'CART_CLEAR' });
      Cookies.remove('cartItems');
      setLoading(false);
      enqueueSnackbar('Order Placed Successfully', { variant: 'success' });
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(err, { variant: 'error' });
    }
  }




  const placeOrderHandler = async () => {
    closeSnackbar();
    if (paymentMethod == 'RazorPay') {
      makeRazorPayPayment(totalPrice)
    }
    else if (paymentMethod == 'COD') {
      justPlaceOrder()
    }
  };





  // RazorPay
  const makeRazorPayPayment = async (totalPrice) => {

    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    // Make API call to the serverless API
    const data = await fetch("/api/keys/razorpay", { method: "POST", body: JSON.stringify({ amount: totalPrice }) }).then((t) =>
      t.json()
    );
    console.log(data)


    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: storeInfo?.name,
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for your test donation",
      image: storeInfo?.logo,
      handler: function (response) {
        justPlaceOrder()
        // Validate payment at server - using webhooks is a better idea.
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: storeInfo?.name,
        email: storeInfo?.email,
        contact: '9650018878',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };


  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  return (
    <>
    <Navbar/>
      <CheckoutWizard activeStep={3}></CheckoutWizard>

      <Grid container justifyContent="center">
        <Grid style={{ margin: '1rem' }} item md={7} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Text variant="pageHeading"> Shipping Address</Text>

              </ListItem>
              <ListItem>
                 {shippingAddress.addressLine1},{' '}
                 {shippingAddress.addressLine2},{' '}
                {shippingAddress.city},{shippingAddress.state},  {shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </ListItem>
            </List>
          </Card>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Text variant="pageHeading">  Payment Method</Text>

              </ListItem>
              <ListItem>{paymentMethod}</ListItem>
            </List>
          </Card>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Text variant="pageHeading"> Order Items</Text>

              </ListItem>
              <ListItem>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Image
                                  src={`/assets${item.images[0]?.url}`}
                                  alt={item.images[0].altText}
                                  width={50}
                                  height={50}
                                ></Image>
                              </Link>
                            </NextLink>
                          </TableCell>

                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Typography>{item.name}</Typography>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>{item.quantity}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>${item.price.value}</Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid style={{ margin: '1rem' }} item md={3} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Text variant="pageHeading"> Order Summary</Text>

              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Items:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">${itemsPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              {/* <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Tax:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">${taxPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem> */}
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Shipping:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">${shippingPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Total:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      <strong>${totalPrice}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  onClick={placeOrderHandler}
                  width="100%"
                >
                  Place Order
                </Button>
              </ListItem>
              {loading && (
                <ListItem>
                  <CircularProgress />
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>

    </>
  );
}
export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });


// PlaceOrder.Layout = Layout

