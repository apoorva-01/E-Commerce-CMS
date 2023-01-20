import nc from 'next-connect'
import PhysicalProduct from '../../../../../models/PhysicalProduct'
import db from '../../../../../utils/db'

const handler = nc()

handler.post(async (req, res) => {
  try {
    await db.connect()
    const filter = { _id:req.body.productID };
    const update = {
        storeID: req.body.storeID,
        name: req.body.name,
        vendor: req.body.vendor,
        path: `/${req.body.slug}`,
        slug: req.body.slug,
        price: req.body.price,
        listPrice: req.body.listPrice,
        descriptionHtml: req.body.descriptionHtml,
        images: req.body.images,
        variants: req.body.variants,
        options: req.body.options,
        status: req.body.status,
        isFeatured: req.body.isFeatured,
        isDeleted: req.body.isDeleted,
        type: req.body.type,
        categories: req.body.categories,
        features: req.body.features,
        reviews: req.body.reviews,
        rating: req.body.rating,
        sku: req.body.sku,
        barcode: req.body.barcode,
        inventory: req.body.inventory,
        size: req.body.size
    }
    let doc = await PhysicalProduct.findOneAndUpdate(filter, update);
    await db.disconnect()
    res.send({code:'success', message: 'Success'})
  } catch {
    res.send({ code:'exists',message: 'Some Error' })
  }
})

export default handler
