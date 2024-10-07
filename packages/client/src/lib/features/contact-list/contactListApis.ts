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

    getAContactLists: builder.query({
      query: ({ project_id, contact_list_id }) => ({
        url: `/contact-list/${contact_list_id}`,
        method: "GET",
        params: { project_id },
      }),
    }),

    createNewList: builder.mutation({
      query: (listBody) => ({
        url: "/contact-list",
        method: "POST",
        body: listBody,
      }),
    }),

    searchForContactList: builder.query({
      query: (query) => ({
        url: `/contact-list/search`,
        method: "GET",
        params: { search: query },
      }),
    }),
  }),
});

export const {
  useCreateNewListMutation,
  useGetAllContactListsQuery,
  useGetAContactListsQuery,
  useSearchForContactListQuery
} = contactListAPIs;
