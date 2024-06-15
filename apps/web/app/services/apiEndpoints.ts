export const endpoint = {
  base: process.env.NEXT_PUBLIC_API_URL,
  users: {
    base: "/users",
    list: (page: number, limit: number) => `/users?page=${page}&limit=${limit}`,
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
  },
};
