import express from 'express'
import { transporter } from './transporter.js'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const port = process.env.PORT || 5000

app.get('/api/v1', (req, res) => {
  res.end('API version 1.0 ROOT level')
})

// SEND EMAIL ENDPOINT SAMMY
app.post('/api/v1/send-email', (req, res) => {
  const { to } = req.body

  // TEST SEND EMAIL DATA
  const mailData = {
    from: 'your-email@gmail.com',
    to: to,
    subject: 'Axibord Email Test',
    text: 'send text email',
    html: '<b>Hey there! </b> <br> Axibord here<br/>',
    attachments: [
      {
        filename: 'fileToSend.txt',
        path: path.join(__dirname, 'fileToSend.txt'),
      },
    ],
  }

  // Send email
  transporter.sendMail(mailData, (err, info) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    }
    res.status(200).json({
      message: 'Email sent',
      messageId: info.messageId,
    })
  })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`)
})
