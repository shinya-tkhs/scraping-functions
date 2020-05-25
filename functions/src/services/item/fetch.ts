import { IService } from "../../interfaces";
import { fetchItemList } from "../../repositories/item";

export const ItemFetchService = async (): Promise<IService> => {
  try {
    const data = await fetchItemList();

    return {
      status: 200,
      data
    };
  } catch (err) {
    console.error("Failed to fetch item data", err);
    return {
      status: 500,
      data: {
        message: "Failed to fetch item data"
      }
    };
  }
};
