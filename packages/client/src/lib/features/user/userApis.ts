import api from "@/lib/api";

export const userAPIs = api.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (body) => ({
        url: "/user",
        body: body,
        method: "PUT",
      }),
    }),
  }),
});

export const { useUpdateProfileMutation } = userAPIs;
