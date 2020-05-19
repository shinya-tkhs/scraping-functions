import { Router, Request, Response } from "express";
import { ItemCreateService } from "../../services/item/create";

const router = Router();

router.put("/", async (req: Request, res: Response) => {
  const data = req.body;

  const result = await ItemCreateService(data);
  return res.status(result.status).json(result.data);
});

export const create = {
  name: "create__item__list",
  router
};
