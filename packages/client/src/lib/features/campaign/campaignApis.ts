import api from "@/lib/api";

export const campaignSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCampaigns: builder.query({
      query: (project_id: string) => ({
        url: "/campaign",
        method: "GET",
        params: { project_id },
      }),
    }),

    getACampaign: builder.query({
      query: ({ project_id, campaign_id }) => ({
        url: `campaign/${campaign_id}`,
        method: "GET",
        params: { project_id },
      }),
    }),

    createACampaign: builder.query({
      query: (body) => ({
        query: "campaign",
        method: "POST",
        body: body,
      }),
    }),

    editACampaign: builder.query({
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
  useCreateACampaignQuery,
  useEditACampaignQuery,
  useGetACampaignQuery,
} = campaignSlice;
