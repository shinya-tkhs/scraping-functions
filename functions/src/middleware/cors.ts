import * as Cors from "cors";

const options: Cors.CorsOptions = {
  methods: "GET,OPTIONS,POST,DELETE,HEAD,PATCH,PUT",
  preflightContinue: false
};

export const cors = Cors(options);
