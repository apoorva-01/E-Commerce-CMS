import cn from 'classnames'
import React, { FC,useContext } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { CommerceProvider } from '@framework'
import { useUI } from '@components/ui/context'
import type { Page } from '@commerce/types/page'
import { Navbar, Footer } from '@components/common'
import type { Category } from '@commerce/types/site'
import ShippingView from '@components/checkout/ShippingView'
import CartSidebarView from '@components/cart/CartSidebarView'
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies'
import { Sidebar, Button, LoadingDots } from '@components/ui'
import PaymentMethodView from '@components/checkout/PaymentMethodView'
import CheckoutSidebarView from '@components/checkout/CheckoutSidebarView'
import { CheckoutProvider } from '@components/checkout/context'
import MenuSidebarView, { Link } from '../UserNav/MenuSidebarView'
import { DataStore } from '../../../utils/DataStore'
import LoginView from '@components/auth/LoginView'
import s from './Layout.module.css'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <LoadingDots />
  </div>
)

const dynamicProps = {
  loading: Loading,
}

const SignUpView = dynamic(
  () => import('@components/auth/SignUpView'),
  {
    ...dynamicProps
  }
)

const ForgotPassword = dynamic(
  () => import('@components/auth/ForgotPassword'),
  {
    ...dynamicProps
  }
)

const FeatureBar = dynamic(
  () => import('@components/common/FeatureBar'),
  {
    ...dynamicProps
  }
)

const Modal = dynamic(
  () => import('@components/ui/Modal'),
  {
    ...dynamicProps,
    ssr: false
  }
)

interface Props {
  pageProps: {
    pages?: Page[]
    categories: Category[]
  }
}

const ModalView: FC<{ modalView: string; closeModal(): any }> = ({
  modalView,
  closeModal,
}) => {
  return (
    <Modal onClose={closeModal}>
      {modalView === 'LOGIN_VIEW' && <LoginView />}
      {modalView === 'SIGNUP_VIEW' && <SignUpView />}
      {modalView === 'FORGOT_VIEW' && <ForgotPassword />}
    </Modal>
  )
}

const ModalUI: FC = () => {
  const { displayModal, closeModal, modalView } = useUI()
  return displayModal ? (
    <ModalView modalView={modalView} closeModal={closeModal} />
  ) : null
}

const SidebarView: FC<{
  sidebarView: string
  closeSidebar(): any
  links: Link[]
}> = ({ sidebarView, closeSidebar, links }) => {
  return (
    <Sidebar onClose={closeSidebar}>
      {sidebarView === 'MOBILEMENU_VIEW' && <MenuSidebarView links={links} />}
      {sidebarView === 'CART_VIEW' && <CartSidebarView />}
      {sidebarView === 'CHECKOUT_VIEW' && <CheckoutSidebarView />}
      {sidebarView === 'PAYMENT_VIEW' && <PaymentMethodView />}
      {sidebarView === 'SHIPPING_VIEW' && <ShippingView />}
    </Sidebar>
  )
}

const SidebarUI: FC<{ links: any }> = ({ links }) => {
  const { displaySidebar, closeSidebar, sidebarView } = useUI()
  return displaySidebar ? (
    <SidebarView
      sidebarView={sidebarView}
      closeSidebar={closeSidebar}
      links={links}
    />
  ) : null
}

const Layout: FC<Props> = ({
  children,
  pageProps: { categories = [], ...pageProps },
}) => {
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  const { locale = 'en-US' } = useRouter()
  const navBarlinks = categories.slice(0, 2).map((c) => ({
    label: c.name,
    href: `/search/${c.slug}`,
  }))
  const { state } = useContext(DataStore)
  const { storeInfo } = state


  const [discountOpen, setDiscountOpen] = React.useState(true);
  return (
    <CommerceProvider locale={locale}>
      <div className={cn(s.root)}>
        {/* Discount */}
        {/* <Box sx={{ width: '100%' }}>
      <Collapse in={discountOpen}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="info"
              size="small"
              onClick={() => {
                setDiscountOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
         <Typography align="center" sx={{ fontWeight:700}}>Surprise Gift for Order above ₹2000....😍😍</Typography>
        </Alert>
      </Collapse>
    
    </Box> */}

        <Navbar links={navBarlinks} />
        <main className="fit">{children}</main>
        <Footer pages={pageProps.pages} />
        <ModalUI />
        <CheckoutProvider>
          <SidebarUI links={navBarlinks} />
        </CheckoutProvider>
        <FeatureBar
          title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
          hide={acceptedCookies}
          action={
            <Button className="mx-5" onClick={() => onAcceptCookies()}>
              Accept cookies
            </Button>
          }
        />
            <a href={`https://api.whatsapp.com/send?phone=+91${storeInfo?.phone}&text=Hello`} className="float" target="_blank"  rel="noreferrer">
  <WhatsAppIcon sx={{fontSize:'2.6rem',mt:1}} />
</a>
      </div>
  
    </CommerceProvider>
  )
}

export default Layout
