/** @format */

import * as dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT: string = process.env.PORT || "4000";

const handleListening = () => {
  console.log(`Listening on: ${PORT}`);
};

app.listen(PORT, handleListening);
