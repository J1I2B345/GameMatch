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
        unit_price: 100.00
      },
    ],
    payer: {
      email: email
    },
    payment_methods: {
        installments: 3
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