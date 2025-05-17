import { Category } from "@/types/category.type";
import { createSlice } from "@reduxjs/toolkit";

interface CategoryState {
  categoriesList: Category[];
  selectedCategory?: string;
  createCategoryModal: boolean;
  deleteCategoryModal: boolean;
}

const initialState: CategoryState = {
  categoriesList: [],
  selectedCategory: undefined,
  createCategoryModal: false,
  deleteCategoryModal: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoriesList: (state, action) => {
      state.categoriesList = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setCreateCategoryModal: (state, action) => {
      state.createCategoryModal = action.payload;
    },
    setDeleteCategoryModal: (state, action) => {
      state.deleteCategoryModal = action.payload;
    },
  },
});

export const {
  setCategoriesList,
  setSelectedCategory,
  setCreateCategoryModal,
  setDeleteCategoryModal,
} = categorySlice.actions;

export default categorySlice.reducer;
