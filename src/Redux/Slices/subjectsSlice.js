import { createSlice } from "@reduxjs/toolkit";

export const subjectsSlice = createSlice({
    name: 'subjects',
    initialState: {
        subjects: []
    },
    reducers: {
        initSubjectsData: (data, actions) => {
            data.subjects = actions.payload;
        },
        addSubject: (data, action) => {
            let withNewSubjects = JSON.parse(JSON.stringify(data.subjects));
            withNewSubjects.push(action.payload);
            withNewSubjects.sort((a, b) => {
                let first = a.major,
                second = b.major;
                if (first < second) {
                    return 1;
                }
                
                return -1;
            });
            data.subjects = withNewSubjects;
        },
        editSubject: (data, action) => {
            let currentSubject = JSON.parse(JSON.stringify(data.subjects));
            currentSubject = currentSubject.map(i => i.id === action.payload.id ? action.payload : i);

            currentSubject.sort((a, b) => {
                let first = a.major,
                second = b.major;
                if (first < second) {
                    return 1;
                }
                
                return -1;
            });

            data.subjects = currentSubject;
        },
        removeSubject: (data, action) => {
            let currentSubjects = JSON.parse(JSON.stringify(data.subjects));
            currentSubjects = currentSubjects.filter(subject => subject.id !== action.payload);

            data.subjects = currentSubjects;
        }
    }
});

export const {initSubjectsData, addSubject, editSubject, removeSubject} = subjectsSlice.actions;
export default subjectsSlice.reducer;