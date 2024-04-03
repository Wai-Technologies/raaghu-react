import { TypedUseSelectorHook , useDispatch , useSelector } from "react-redux";
import type { RootState , AppDispatch } from "./index";

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();