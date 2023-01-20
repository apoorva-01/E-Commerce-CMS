import nc from 'next-connect';
import Store from '../../../../models/Store';
import db from '../../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {

    await db.connect();
    const filter = { storeID:req.body.storeID };
    const update = {
        bio:req.body.bioHtml,
        about:req.body.aboutHtml,
        storeDetails:{
            storeIndustry:req.body.storeIndustry,
            storeAudience:req.body.storeAudience,
            companyName:req.body.companyName,
        }
    };
    let doc = await Store.findOneAndUpdate(filter, update);
    await db.disconnect();

    res.send({success:true});

});

export default handler;
