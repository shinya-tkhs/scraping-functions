import { Router, Request, Response } from "express";
import { ItemFetchService } from "../../services/item/fetch";

const router = Router();

router.get("/", async (_: Request, res: Response) => {
  const result = await ItemFetchService();
  return res.status(result.status).json(result.data);
});

export const fetch = {
  name: "fetch__item__list",
  router
};
