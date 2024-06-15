import { AxiosError } from "axios";
import { IData, IDocs } from "../interfaces";
import api from "./api";
import { endpoint } from "./apiEndpoints";

export async function getUserList(
  page: number,
  limit: number
): Promise<IData<IDocs>> {
  try {
    const response = await api.get(endpoint.users.base, {
      params: {
        page,
        limit,
      },
    });
    return response?.data as IData<IDocs>;
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error?.message);
  }
}
