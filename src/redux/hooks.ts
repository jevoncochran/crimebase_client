// It’s recommended to create typed versions of the useDispatch and useSelector hooks
// This helps avoid potential circular import dependency issues
// and makes it easier to use these hooks across your application

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
