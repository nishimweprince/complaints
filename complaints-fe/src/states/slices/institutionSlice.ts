import { Institution } from "@/types/institution.type";
import { createSlice } from "@reduxjs/toolkit";

interface InstitutionState {
  institutionsList: Institution[];
  institution?: Institution;
  selectedInstitution?: string;
  createInstitutionModal: boolean;
  deleteInstitutionModal: boolean;
}

const initialState: InstitutionState = {
  institutionsList: [],
  institution: undefined,
  selectedInstitution: undefined,
  createInstitutionModal: false,
  deleteInstitutionModal: false,
};

const institutionSlice = createSlice({
  name: "institution",
  initialState,
  reducers: {
    setInstitutionsList: (state, action) => {
      state.institutionsList = action.payload;
    },
    setInstitution: (state, action) => {
      state.institution = action.payload;
    },
    setSelectedInstitution: (state, action) => {
      state.selectedInstitution = action.payload;
    },
    setCreateInstitutionModal: (state, action) => {
      state.createInstitutionModal = action.payload;
    },
    setDeleteInstitutionModal: (state, action) => {
      state.deleteInstitutionModal = action.payload;
    },
  },
});

export const {
  setInstitutionsList,
  setInstitution,
  setSelectedInstitution,
  setCreateInstitutionModal,
  setDeleteInstitutionModal,
} = institutionSlice.actions;

export default institutionSlice.reducer;
