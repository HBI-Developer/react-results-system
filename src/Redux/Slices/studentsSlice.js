import { createSlice } from "@reduxjs/toolkit";

export const studentsSlice = createSlice({
    name: 'students',
    initialState: {
        students: []
    },
    reducers: {
        initStudentsData: (data, actions) => {
            data.students = actions.payload;
        },
        addStudent: (data, action) => {
            let withNewStudents = JSON.parse(JSON.stringify(data.students));
            withNewStudents.push(action.payload);
            withNewStudents.sort((a, b) => {
                let first = a.name,
                second = b.name;
                if (first > second) {
                    return 1;
                }
                
                return -1;
            });
            data.students = withNewStudents;
        },
        editStudent: (data, action) => {
            let withEditingStudent = JSON.parse(JSON.stringify(data.students));
            withEditingStudent = withEditingStudent.filter(student => student.ssn !== action.payload.ssn);
            withEditingStudent.push(action.payload);
            
            withEditingStudent.sort((a, b) => {
                let first = a.name,
                second = b.name;
                if (first > second) {
                    return 1;
                }
                
                return -1;
            });

            data.students = withEditingStudent;
        },
        removeStudent: (data, action) => {
            let currentStudents = JSON.parse(JSON.stringify(data.students));
            currentStudents = currentStudents.filter(student => student.ssn !== action.payload);

            data.students = currentStudents;
        }
    }
});

export const {initStudentsData, addStudent, editStudent, removeStudent} = studentsSlice.actions;
export default studentsSlice.reducer;