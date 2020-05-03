const Booking = require("../models/Booking");
const Spot = require("../models/Spot");

module.exports = {
  async index(req, res) {
    const { user_id } = req.headers;

    const spots = await Spot.find({ user: user_id });

    if (!spots) {
      return res.status(400).send("Not found spot created by this user");
    }
    const ids = spots.map((spot) => spot._id);

    const bookings = await Booking.find({ spot: ids }).populate("user");

    return res.json(bookings);
  },

  async store(req, res) {
    const { user_id } = req.headers;
    const { spot_id } = req.params;
    const { date } = req.body;

    const spot = await Spot.findById(spot_id);

    if (!spot) {
      return res.status(400).json({ error: "Spot not found" });
    }

    if (spot.user == user_id) {
      return res
        .status(404)
        .json({ error: "You cant book a spot that you create." });
    }

    let booking = await Booking.create({
      date,
      user: user_id,
      spot: spot_id,
    });

    booking = await booking.populate("user").populate("spot").execPopulate();

    const ownerSocket = req.connectedUsers[booking.spot.user];

    if (ownerSocket) {
      req.io.to(ownerSocket).emit("booking_request", booking);
    }

    return res.json(booking);
  },
};
