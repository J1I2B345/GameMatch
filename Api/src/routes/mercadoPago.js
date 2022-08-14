const { Router } = require("express");
const router = Router();
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: process.env.TOKEN,
});

router.post("/", (req, res) => {
  const { email, id } = req.body
let preference = {
    items: [
      {
        title: "Mi producto",
        quantity: 1,
        unit_price: 499.00
      },
    ],
    payer: {
      email: email
    },
    back_urls:{
      failure: "https://www.respuestadelback.com/failure",
      pending: "https://www.respuestadelback.com/pending",
      success: "https://www.respuestadelback.com/success"
    },
    payment_methods: {
        installments: 3,
        excluded_payment_types: [
          {"id":"ticket"},
          {"id":"debit_card"}
      ]
    }
  };
  
  mercadopago.preferences
    .create(preference)
    .then(function (r) {
      // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
      res.json(r.response)
    })
    .catch(function (error) {
      res.json("Malio Sal", error)
    });
})
//success
router.get

module.exports = router
