import api from "@/lib/api";

export const contactListAPIs = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllContactLists: builder.query({
      query: (queryParams) => ({
        url: "/contact-list",
        method: "GET",
        params: queryParams,
      }),
    }),

    createNewList: builder.mutation({
      query: (listBody) => ({
        url: "/contact-list",
        method: "POST",
        body: listBody,
      }),
    }),
  }),
});

export const { useCreateNewListMutation, useGetAllContactListsQuery } =
  contactListAPIs;