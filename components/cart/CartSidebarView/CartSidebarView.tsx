import cn from 'classnames'
import Link from 'next/link'
import { FC,useContext,useEffect,useState } from 'react'
import s from './CartSidebarView.module.css'
import Cookies from 'js-cookie';
import CartItem from '../CartItem'
import { Button, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import { Bag, Cross, Check } from '@components/icons'
// import useCart from '@framework/cart/use-cart'
// import usePrice from '@framework/product/use-price'
import SidebarLayout from '@components/common/SidebarLayout'
import { DataStore } from '../../../utils/DataStore';
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
const CartSidebarView: FC = () => {
  const { state,dispatch } = useContext(DataStore);
  const {cart} = state;
  const { closeSidebar, setSidebarView } = useUI()
  // const { isLoading, isEmpty } = useCart()

  const isEmpty =cart.cartItems.length==0?true:false;
  const isLoading =false;


  const handleClose = () => closeSidebar()
  const goToCheckout = () => setSidebarView('CHECKOUT_VIEW')

  const error = null
  const success = null


  const round2 = (num: any) => Math.round(num * 100 + Number.EPSILON) / 100 // 123.456 => 123.46

  useEffect(() => {
    const itemsPrice = round2(
      cart.cartItems.reduce(
        (a: any, c: any) => a + c.price.value * c.quantity,
        0
      )
    )
    setSubTotal(itemsPrice)
  }, [cart])

  const [subTotal, setSubTotal] = useState(0)
  const [shipping, setShipping] = useState(50)
  let total = round2(subTotal) + round2(shipping)

  const handleShippingChange = (event:any) => {
    setShipping(event.target.value)
  }

  async function CheckoutCookieSet(){
    Cookies.set('orderInfo', JSON.stringify({subTotal: subTotal,total: total,shippingPrice: shipping}));
    // dispatch({ type: 'ORDER_INFO_SETUP', payload: JSON.stringify({subTotal: subTotal,total: total,shippingPrice: shipping})});
   }

  return (
    <SidebarLayout
      className={cn({
        [s.empty]: error || success || isLoading || isEmpty,
      })}
      handleClose={handleClose}
    >
      {isLoading || isEmpty ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-dashed border-primary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-secondary text-secondary">
            <Bag className="absolute" />
          </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            Your cart is empty
          </h2>
          <p className="text-accent-3 px-10 text-center pt-2">
             ice cream tiramisu pudding cupcake.
          </p>
        </div>
      ) : error ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Cross width={24} height={24} />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            We couldn’t process the purchase. Please check your card information
            and try again.
          </h2>
        </div>
      ) : success ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Check />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            Thank you for your order.
          </h2>
        </div>
      ) : (
        <>
          <div className="px-4 sm:px-6 flex-1">
            <Link href="/cart">
              <a>
                <Text variant="sectionHeading" onClick={handleClose}>
                  My Cart
                </Text>
              </a>
            </Link>
            <ul className={s.lineItemsList}>
              {cart.cartItems.map((item: any) => (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={item.price.currencyCode}
                />
              ))}
            </ul>
          </div>

          <div className="flex-shrink-0 px-6 py-6 sm:px-6 sticky z-20 bottom-0 w-full right-0 left-0 bg-accent-0 border-t text-sm">
            <ul className="pb-2">
              <li className="flex justify-between py-1">
                <span>Total Items</span>
                <span>({cart.cartItems.reduce((a:any,c:any) => a + c.quantity, 0)}{' '}items)</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>{subTotal}</span>
              </li>
              {/* <li className="flex justify-between py-1">
                <span>Taxes</span>
                <span>Calculated at checkout (INR 15.00)</span>
              </li> */}
              <li className="flex justify-between py-1">
                <span>Shipping</span>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={shipping}
                    onChange={handleShippingChange}
                  >
                    <FormControlLabel
                      value={50}
                      control={<Radio />}
                      label="Delhi/ NCR - ₹50"
                    />

                    <FormControlLabel
                      value={80}
                      control={<Radio />}
                      label="NorthEast/ J&K - ₹80"
                    />
                    <FormControlLabel
                      value={70}
                      control={<Radio />}
                      label="Rest Of India - ₹70"
                    />
                  </RadioGroup>
                </FormControl>
                <span className="font-bold tracking-wide">{shipping}</span>
              </li>
            </ul>
            <div className="flex justify-between border-t border-accent-2 py-3 font-bold mb-2">
              <span>Total</span>
              <span>{total}</span>
            </div>
            <div>
              {process.env.COMMERCE_CUSTOMCHECKOUT_ENABLED ? (
                <Link href="/shipping">
                <a>
                <Button Component="a" width="100%" onClick={CheckoutCookieSet}>
                  Proceed to Checkout ({total})
                </Button></a>
                </Link>
              ) : (
                <Button href="/" Component="a" width="100%">
                  Proceed to Checkout
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </SidebarLayout>
  )
}

export default CartSidebarView
