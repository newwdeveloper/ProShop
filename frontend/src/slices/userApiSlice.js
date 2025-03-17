import { USERS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

// In RTK Query, you use mutations for modifying or sending data to the server, while queries are used for fetching data.

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;
