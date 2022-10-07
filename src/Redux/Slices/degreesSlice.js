import { createSlice } from "@reduxjs/toolkit";

export const degreesSlice = createSlice({
    name: 'degrees',
    initialState: {
        degrees: []
    },
    reducers: {
        initDegreesData: (data, actions) => {
            data.degrees = actions.payload;
        },
        addDegrees: (data, action) => {
            let withNewdegree = JSON.parse(JSON.stringify(data.degrees));
            withNewdegree.push(action.payload);
            data.degrees = withNewdegree;
        },
        addDegree: (data, action) => {
            let currentDegree = JSON.parse(JSON.stringify(data.degrees));
            if (action.payload.major === 'مشترك') {
                currentDegree.map(degree => degree.degrees.push([action.payload.id, 0]));
            } else {
                action.payload.major.map(m => {
                    currentDegree.map(d => m === d.ssn ? d.degrees.push([action.payload.id, 0]) : '');
                    return 0;
                });
            }

            currentDegree.map(d => d.degrees.sort((a, b) => a[0] - b[0]));

            data.degrees = currentDegree;
        },
        editDegrees: (data, action) => {
            let withEditingDegrees = JSON.parse(JSON.stringify(data.degrees));
            withEditingDegrees = withEditingDegrees.filter(degree => degree.ssn !== action.payload.ssn);
            
            withEditingDegrees.push(action.payload);

            data.degrees = withEditingDegrees;
        },
        editDegree: (data, action) => {
            let withEditDegree = JSON.parse(JSON.stringify(data.degrees));
            withEditDegree.map(m => {
                let degree = m.degrees.filter(degree => degree[0] === action.payload)[0];

                if (!degree) {
                    m.degrees.push([action.payload, 0]);
                    m.degrees.sort((a, b) => a[0] - b[0]);
                }

                return 0;
            });

            data.degrees = withEditDegree;
        },
        removeDegrees: (data, action) => {
            let currentDegrees = JSON.parse(JSON.stringify(data.degrees));
            currentDegrees = currentDegrees.filter(defree => defree.ssn !== action.payload);
            data.degrees = currentDegrees;
        },
        removeDegree: (data, action) => {
            let withDegree = JSON.parse(JSON.stringify(data.degrees));
            if (typeof action.payload === "object") {
                withDegree.map(i => {
                    if (action.payload.ssn.indexOf(i.ssn) === -1) {
                        i.degrees = i.degrees.filter(degree => degree[0] !== action.payload.id);
                    }

                    return 0;
                });
            } else {
                withDegree.map(i => i.degrees = i.degrees.filter(subject => subject[0] !== action.payload));
            }

            data.degrees = withDegree;
        }
    }
});

export const {initDegreesData, addDegrees, addDegree, editDegrees, editDegree, removeDegrees, removeDegree} = degreesSlice.actions;
export default degreesSlice.reducer;