import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null,
        companies: [],
        searchCompanyByText: "",
    },
    reducers: {
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        setCompanies: (state, action) => {
            state.companies = action.payload;
        },
        setSearchCompanyByText: (state, action) => {
            state.searchCompanyByText = action.payload;
        },
        deleteCompany: (state, action) => {
            // ✅ Filter out the deleted company by id
            state.companies = state.companies.filter(c => c._id !== action.payload);
        }
    }
});

export const { setSingleCompany, setCompanies, setSearchCompanyByText, deleteCompany } = companySlice.actions;
export default companySlice.reducer;
