import nc from 'next-connect'
import Store from '../../../../models/Store'
import db from '../../../../utils/db'

const handler = nc()

handler.post(async (req, res) => {
 
  await db.connect()
  const filter = { storeID: req.body.storeID }
  const update = {
    policies: {
      RefundPolicyHtml: req.body.refundPolicyHtml,
      PrivacyPolicyHtml: req.body.privacyPolicyHtml,
      ShippingPolicyHtml: req.body.shippingPolicyHtml,
      TermsOfServiceHtml: req.body.termsOfServiceHtml,
    }
  }
  let doc = await Store.findOneAndUpdate(filter, update)
  await db.disconnect()

  res.send({ success: true })
})

export default handler
