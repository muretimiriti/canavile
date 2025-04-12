const axios = require("axios");

const createToken = async (req, res) => {
  const secret = process.env.CONSUMER_SECRET;
  const consumer = process.env.CONSUMER_KEY;
  const auth = new Buffer.from(`${consumer}:${secret}`).toString("base64");

  await axios.get(
    "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers: { authorization: `Basic ${auth}` } }
  )
  .then((data) => {
    token = data.data.access_token;
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err.message);
  });
};

const stkPush = async (req, res, token) => {
  const { phone } = req.body; // Destructure phone from request body
  if (!phone) {
    return res.status(400).json({ message: "Missing phone number in request body" });
  }
  const shortcode = process.env.SHORTCODE;
  const amount = req.body.amount;
  const passkey = process.env.PASSKEY;

  const url = "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

  const date = new Date();
  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);

  const password = new Buffer.from(shortcode + passkey + timestamp).toString("base64");

  const data = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerBuyGoodsOnline",
    Amount: amount,
    PartyA: `254${phone}`,
    PartyB: shortcode,
    PhoneNumber: `254${phone}`,
    CallBackURL: "https://your-callback-url.com/callback",
    AccountReference: "Canaville",
    TransactionDesc: "Activity deposit"
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    res.status(200).json({ message: "STK Push initiated", response: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error processing transaction", error: error.message });
  }
};

// New function to handle the callback from M-Pesa API
const handleCallback = async (req, res) => {
  const callbackData = req.body.Body.stkCallback;
  console.log("M-Pesa Callback Data:", callbackData);

  if (callbackData.ResultCode === 0) {
    // Successful transaction
    const transactionDetails = callbackData.CallbackMetadata.Item.reduce((acc, item) => {
      acc[item.Name] = item.Value;
      return acc;
    }, {});

    const transaction = {
      transactionId: transactionDetails.MpesaReceiptNumber,
      phone: transactionDetails.PhoneNumber,
      amount: transactionDetails.Amount,
      transactionDate: new Date(),
      bookingId: callbackData.MerchantRequestID, // Store the linked booking
      status: "SUCCESS",
    };

    // Return transaction details to the frontend
    res.status(200).json({ message: "Transaction successful", transaction });
  } else {
    // Failed transaction
    console.warn("Transaction failed:", callbackData.ResultDesc);
    res.status(400).json({ message: "Transaction failed", details: callbackData.ResultDesc });
  }
};

module.exports = { createToken, stkPush, handleCallback };