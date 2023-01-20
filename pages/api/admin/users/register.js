import nc from 'next-connect'
import bcrypt from 'bcryptjs'
import Store from '../../../../models/Store'
import db from '../../../../utils/db'

const handler = nc()

function slugify(string) {
  return string.toString()
  slug
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

handler.post(async (req, res) => {
  // console.log({
  //   storeName: req.body.storeName,
  //   storeLink: `https://makemycommerce.in/${req.body.storeName}`,
  //   name: req.body.name,
  //   email: req.body.email,
  //   phone: req.body.phone,
  //   verified: false,
  //   plan: 'Basic',
  //   password: bcrypt.hashSync(req.body.password),
  //   companyName: req.body.companyName,
  //   title: 'My Online Store',
  //   metatitle: 'My Online Store',
  //   metadescription: 'My Online Store',
  //   address: {
  //     addressLine1: req.body.addressLine1,
  //     addressLine2: req.body.addressLine2,
  //     city: req.body.city,
  //     state: req.body.state,
  //     pinCode: req.body.pinCode,
  //     country: req.body.country,
  //   },
  //   storeDetails: {
  //     storeIndustry: req.body.storeIndustry,
  //     // storeAudience: { type: String, required: false },
  //     companyName: req.body.companyName,
  //   },
  //   paymentProviders: {
  //     CodAvailable: true,
  //     // razorpay: { type: Object, required: false },
  //   },
  //   checkout: {
  //     checkoutCustomerAccount: 'required',
  //     checkoutCustomerContact: 'phoneEmail',
  //     marketingConsent: {
  //       emailMarketingSubscribe: true,
  //       smsMarketingSubscribe: false,
  //     },
  //     formOptions: {
  //       lastName: 'hidden',
  //       companyName: 'hidden',
  //       addressLine2: 'hidden',
  //       shippingAddressPhone: 'hidden',
  //     },
  //     taxes: {
  //       allPricesIncludeTaxes: false,
  //       shippingRatesTax: false,
  //       digitalProductVAT: false,
  //     },
  //     policies: {
  //       RefundPolicyHtml: false,
  //       PrivacyPolicyHtml: false,
  //       ShippingPolicyHtml: false,
  //       TermsOfServiceHtml: false,
  //     },
  //   }
  // })
  try {
    await db.connect()
    const newStore = new Store({
      storeName: req.body.storeName,
      storeLink: `https://makemycommerce.in/${slugify(req.body.storeName)}`,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      bio: 'Write Bio about Your Company',
      ceo: 'CEO Name',
      about: 'Write About about Your Company in breif',
      verified: false,
      plan: 'Basic',
      logo: '/makemycommerce.svg',
      password: bcrypt.hashSync(req.body.password),
      title: 'My Online Store',
      metatitle: 'My Online Store',
      metadescription: 'My Online Store',
      address: {
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        city: req.body.city,
        state: req.body.state,
        pinCode: req.body.pinCode,
        country: req.body.country,
      },
      storeDetails: {
        storeIndustry: req.body.storeIndustry,
        storeAudience: null,
        companyName: req.body.companyName,
      },
      paymentProviders: {
        CodAvailable: true,
        razorpay: null,
      },
      checkout: {
        checkoutCustomerAccount: 'required',
        checkoutCustomerContact: 'phoneEmail',
        marketingConsent: {
          emailMarketingSubscribe: true,
          smsMarketingSubscribe: false,
        },
        formOptions: {
          lastName: 'hidden',
          companyName: 'hidden',
          addressLine2: 'hidden',
          shippingAddressPhone: 'hidden',
        },
      },
      taxes: {
        allPricesIncludeTaxes: false,
        shippingRatesTax: false,
        digitalProductVAT: false,
      },
      policies: {
        RefundPolicyHtml: false,
        PrivacyPolicyHtml: false,
        ShippingPolicyHtml: false,
        TermsOfServiceHtml: false,
      },
      socialMediaLinks: null,
    })
    const store = await newStore.save()
    await db.disconnect()
    res.send(store)
  } catch {
    res.send({ code: 'exists', message: 'Store Name Already Exist' })
  }
})

export default handler
