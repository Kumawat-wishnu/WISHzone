const catchAsyncErrors=require("../middleware/catchAsyncError");

const stripe = require("stripe")('sk_test_51NYp0qSDPmkrrCcwC1qwoZNGKuRCcVszAOnEidm7w1qVy9pfKKt7steVmx5vpj6OuShZCmSE2djsw8UkNTl6mtFy00X6MXsDgk');

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});