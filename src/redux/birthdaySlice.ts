import { createSlice } from "@reduxjs/toolkit";

const dates = localStorage.getItem("birthdayDates") ?? "[]";

const parsedDates = JSON.parse(dates);

export interface Birthday {
  name: string;
  surname: string;
  date: string;
  interests: string;
}

export interface State extends Array<Birthday> {}

const initialState: State = parsedDates;

const addBirthdaySlice = createSlice({
  name: "addBirthday",
  initialState,
  reducers: {
    add: (state, action) => {
      const newDate = action.payload;
      state.push({
        name: newDate.name,
        surname: newDate.surname,
        date: newDate.date,
        interests: newDate.interests,
      });

      localStorage.setItem(
        "birthdayDates",
        JSON.stringify(state.map((item) => item))
      );
    },
    remove: (state, action) => {
      const index = action.payload;
      state.splice(index, 1);
      localStorage.setItem(
        "birthdayDates",
        JSON.stringify(state.map((item) => item))
      );
    },
  },
});

export const birthdayActions = addBirthdaySlice.actions;

export default addBirthdaySlice.reducer;
