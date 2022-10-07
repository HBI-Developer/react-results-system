import { configureStore } from "@reduxjs/toolkit";
import degreesSlice from "./Slices/degreesSlice";
import studentsSlice from "./Slices/studentsSlice";
import subjectsSlice from "./Slices/subjectsSlice";

const store = configureStore({
    reducer: {
        students: studentsSlice,
        degrees: degreesSlice,
        subjects: subjectsSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    })
});

export default store;