import { createItemList } from "../../repositories/item";

export const ItemCreateService = async (data: any): Promise<any> => {
  try {
    await createItemList(data);

    return {
      status: 200,
      data: {}
    };
  } catch (err) {
    console.error("Failed to save item data to firestore", err);
    return {
      status: 500,
      data: {
        message: "Failed to save item data to firestore"
      }
    };
  }
};
