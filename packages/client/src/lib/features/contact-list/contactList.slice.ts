import { createSlice } from "@reduxjs/toolkit";
import { contactListAPIs } from "./contactListApis";

interface ContactList {
  name: string;
  description: string;
  email_type: string;
  email_opt_in: string;
  template_id: string;
  first_name: string;
  last_name: string;
  updated_at: Date;
  created_at: string;
}

interface ContactListSlice { 
    contactList : ContactList | null
}

const initialState : ContactListSlice = { 
    contactList : null
}
const contactListSlice = createSlice({
  name: "contact-list",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      contactListAPIs.endpoints.getAContactLists.matchFulfilled,
      (state, action) => {
        state.contactList = action.payload;
      }
    );
  },
});

export default contactListSlice.reducer;
