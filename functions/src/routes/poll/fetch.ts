import { Request, Response, Router } from "express";
import { PollFetchService } from "../../services/poll/fetch";

const router = Router();

const handleFetch = async (req: Request, res: Response) => {
  const result = await PollFetchService();
  return res.status(result.status).json(result.data);
};

router.get("/", handleFetch);

export const fetch: any = {
  name: "fetch",
  router
};
