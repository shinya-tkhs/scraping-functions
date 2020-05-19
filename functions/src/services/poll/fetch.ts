import { fetchPoll } from "../../repositories/poll";

export const PollFetchService = async (): Promise<any> => {
  try {
    const poll = await fetchPoll();

    return {
      status: 200,
      data: poll
    };
  } catch (err) {
    console.error("failed to fetch polls", err);

    return {
      status: 500,
      data: {
        message: "faild to fetch polls"
      }
    };
  }
};
