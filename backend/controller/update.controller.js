import cron from "node-cron";
import Booking from "../booking.model.js";

// Runs every hour
cron.schedule("0 * * * *", async () => {
  console.log("⏰ Checking for expired bookings...");

  const now = new Date();

  // find bookings whose checkout time has passed
  const expiredBookings = await Booking.find({ checkOut: { $lte: now } });

  for (let booking of expiredBookings) {
    await Booking.findByIdAndUpdate(booking, { isBooked: "false" });
  }

  console.log("✅ Updated available properties.");
});
