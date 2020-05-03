// index = metodo que retorna uma listagem do model (lista de session)
// show = retorna uma sessao
// store = salvar uma sessao
// update = atualizar uma sessao
// destroy = deleta uma sessao
const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }

    return res.json(user);
  }
};
