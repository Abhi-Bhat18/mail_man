import { createSlice } from "@reduxjs/toolkit";
import { emailTemplateAPIs } from "./emailTemplateApis";
import { resetDocument } from "@/components/email-builder/documents/editor/EditorContext";

interface IinitialState {
  name: string | null;
  description: string | null;
  template_id: string | null;
}
const initialState: IinitialState = {
  name: null,
  description: null,
  template_id: null,
};

const templateSlice = createSlice({
  name: "email-template",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      emailTemplateAPIs.endpoints.getAnEmailTemplate.matchFulfilled,
      (state, action) => {
        console.log("Payload", action.payload);
        state.description = action.payload.description;
        state.name = action.payload.name;
        state.template_id = action.payload.id;
        resetDocument(action.payload.json);
      }
    );
  },
});

export default templateSlice.reducer;
