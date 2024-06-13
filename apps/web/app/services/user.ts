import { IData, IDocs } from "../interfaces";

const baseServer = process.env.NEXT_PUBLIC_API_URL;

export async function getUserList(page: number, limit: number) {
  return (await fetch(`${baseServer}/users?page=${page}&limit=${limit}`)
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(err);
    })) as IData<IDocs>;
}
