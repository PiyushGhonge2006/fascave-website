const AdminUser = require("./model/adminUser");

const connectDB = require("./config/db");

require("dotenv").config();


// Standalone runs must open their own connection,
// otherwise every query buffers and times out.
const runAsScript = async () => {

  await connectDB();

  await seedAdmin();

  process.exit(0);

};


const seedAdmin = async () => {

  try {

    const email =
      process.env.ADMIN_SEED_EMAIL ||
      "admin@fascave.com";

    const password =
      process.env.ADMIN_SEED_PASSWORD ||
      "Admin@12345";


    const existing =
      await AdminUser.findOne({
        email,
      });

    if (existing) {

      console.log(
        "Admin user already exists:",
        email
      );

      return;

    }


    const admin =
      await AdminUser.create({
        name: "Admin",
        email,
        password,
        role: "admin",
      });

    console.log(
      "Admin user seeded successfully:",
      admin.email
    );

  } catch (error) {

    console.error(
      "Error seeding admin:",
      error.message
    );

  }

};


if (require.main === module) {

  runAsScript().catch((error) => {

    console.error(
      "Error seeding admin:",
      error.message
    );

    process.exit(1);

  });

}


module.exports = seedAdmin;
