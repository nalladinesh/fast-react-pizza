import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      (error) => reject(error),
    );
  });
}

/* In createAsyncThunk, we need to pass the action name (which we will never use but redux needs it internally) and async function that will return the payload for reducer later (for fulfilled state). fetchAddress is now the action creator function which we can call later. createAsyncThunk will create 3 additional action types each for pending promise state, fulfilled and rejected state. We need to handle these cases seperately in reducers this is how we will connect thunk with reducers */
export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    const coords = await getPosition();
    const position = {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);

    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    // payload of FULFILLED state
    return { position, address };
  },
);

const initialState = {
  userName: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error = 'There was a problem in getting your address. Make sure to fill this field!';
      }),
});

export const { updateName } = userSlice.actions;

export const getUserName = (state) => state.user.userName;

export default userSlice.reducer;
