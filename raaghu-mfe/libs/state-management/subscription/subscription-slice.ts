import { Subscription, SubscriptionInformation } from "./subscription.models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SubscriptionState {
    subscriptions: Subscription;
    error: string | null;
    status: "pending" | "loading" | "error" | "success";
}

export const subscriptionInitialState: SubscriptionState = {
    subscriptions: { items: [] },
    error: null,
    status: "pending",
};

export interface SubscriptionInformationState {
    subscriptionInformation: {};
    error: string | null;
    status: "pending" | "loading" | "error" | "success";
}

export const subscriptionInformationInitialState: SubscriptionInformationState = {
    subscriptionInformation: {},
    error: null,
    status: "pending",
};

export const subscriptionSlice = createSlice({
    name: "subscription",
    initialState: subscriptionInitialState,
    reducers: {
        getSubscription: (state) => {
            state.status = "loading";
        },
        getSubscriptionSuccess: (state, action: PayloadAction<Subscription>) => {
            state.status = "error",
                state.subscriptions = action.payload;
        },
        getSubscriptionFailure: (state, action: PayloadAction<string>) => {
            state.status = "error",
                state.error = action.payload;
        },
    },
});

const subscriptionInformationSlice = createSlice({
    name: "subscriptionInformation",
    initialState: subscriptionInformationInitialState,
    reducers: {
        getSubscriptionInformation: (state) => {
            state.status = "loading";
        },
        getSubscriptionInformationSuccess: (state, action: PayloadAction<SubscriptionInformation>) => {
            state.status = "success",
                state.subscriptionInformation = action.payload;
        },
        getSubscriptionInformationFailure: (state, action: PayloadAction<string>) => {
            state.status = "error",
                state.error = action.payload;
        },
    },
});

export const subscriptionActions = subscriptionSlice.actions;
export const subscriptionReducer = subscriptionSlice.reducer;
export const subscriptionInformationActions = subscriptionInformationSlice.actions;
export const subscriptionInformationReducer = subscriptionInformationSlice.reducer;