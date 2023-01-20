import nc from 'next-connect';
import { SMTPClient } from 'emailjs';

const handler = nc();

handler.post(async (req, res) => {

  const client = new SMTPClient({
    user: 'bizdamn@gmail.com',
    password: 'Bizdamn1435@#$%',
    host: 'smtp.gmail.com',
    ssl: true
  });

  try {
// console.log(req.body.data)
// console.log(req.body.name)

    client.send(
      {
        text: `Name: ${req.body.name}
Email: ${req.body.email}
Message: ${req.body.message}`,
        to: 'junkyjewellerystore@gmail.com',
        subject: `Message from ${req.body.name}`,
        from: 'bizdamn@gmail.com',
      }
    )
    console.log( {
      text: `Name: ${req.body.name}
Email: ${req.body.email}
Message: ${req.body.message}`,
      to: 'junkyjewellerystore@gmail.com',
      subject: `Message from ${req.body.name}`,
      from: 'bizdamn@gmail.com',
    })
  }
  catch (e) {
    console.log(e)
    res.status(400).end(JSON.stringify({ message: e }))
    return;
  }

  res.status({ message: 'Send Mail' })
});

export default handler;