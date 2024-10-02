import api from "@/lib/api";

export const emailTemplateAPIs = api.injectEndpoints({
  endpoints: (builder) => ({
    getEmailTemplates: builder.query({
      query: (queryParams) => ({
        url: "/email-template",
        method: "GET",
        params: queryParams,
      }),
    }),

    createNewTemplate: builder.mutation({
      query: (body) => ({
        url: "/email-template",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useGetEmailTemplatesQuery, useCreateNewTemplateMutation } =
  emailTemplateAPIs;
