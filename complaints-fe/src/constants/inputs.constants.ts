export const genderOptions = [
  { value: "M", label: "Male" },
  { value: "F", label: "Female" },
];

export const getGenderLabel = (gender?: string) => {
  if (!gender) return "Male";
  return genderOptions?.find((g) => g?.value === gender)?.label;
};

export const ellipsisHClassName = `text-primary cursor-pointer text-md transition-all duration-300 hover:scale-[.98] bg-slate-200 hover:bg-slate-300 rounded-md p-1 px-4`;

export const tableActionClassName = `w-full text-primary flex items-center gap-2 text-[13px] text-center p-1 px-2 rounded-md hover:bg-gray-100`;
