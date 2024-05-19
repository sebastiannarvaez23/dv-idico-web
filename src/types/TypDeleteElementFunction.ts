import { AppDispatch, RootState } from "../store/store";

export type DeleteElementFunction = () => (dispatch: AppDispatch, getState: () => RootState) => Promise<void>;