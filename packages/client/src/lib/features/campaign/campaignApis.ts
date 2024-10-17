import api from "@/lib/api";

export const campaignAPIs = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCampaigns: builder.query({
      query: (project_id: string) => ({
        url: "/campaign",
        method: "GET",
        params: { project_id },
      }),
    }),

    getACampaign: builder.query({
      query: ({ campaign_id }) => ({
        url: `/campaign/${campaign_id}`,
        method: "GET",
      }),
    }),

    createACampaign: builder.mutation({
      query: (body) => ({
        url: "/campaign",
        method: "POST",
        body: body,
      }),
    }),

    editACampaign: builder.mutation({
      query: (body) => ({
        query: "campaign",
        method: "PUT",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetAllCampaignsQuery,
  useCreateACampaignMutation,
  useEditACampaignMutation,
  useGetACampaignQuery,
} = campaignAPIs;
