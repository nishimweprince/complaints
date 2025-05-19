import Modal from '@/components/cards/Modal';
import Button from '@/components/inputs/Button';
import { InputErrorMessage } from '@/components/inputs/ErrorLabels';
import Input from '@/components/inputs/Input';
import { SkeletonLoader } from '@/components/inputs/Loader';
import TextArea from '@/components/inputs/TextArea';
import { Heading } from '@/components/inputs/TextInputs';
import { capitalizeString } from '@/helpers/strings.helper';
import validateInputs from '@/helpers/validations.helper';
import { useAppDispatch, useAppSelector } from '@/states/hooks';
import { setCreateInstitutionModal } from '@/states/slices/institutionSlice';
import { useFetchCategories } from '@/usecases/categories/category.hooks';
import { useCreateInstitution } from '@/usecases/institutions/institution.hooks';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const CreateInstitution = () => {
  /**
   * STATE VARIABLES
   */
  const dispatch = useAppDispatch();
  const { createInstitutionModal } = useAppSelector(
    (state) => state.institution
  );
  const { categoriesList } = useAppSelector((state) => state.category);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // USE CASES
  const { fetchCategories, categoriesIsFetching } = useFetchCategories();
  const {
    createInstitution,
    createInstitutionIsLoading,
    createInstitutionIsSuccess,
  } = useCreateInstitution();

  // FETCH CATEGORIES
  useEffect(() => {
    if (createInstitutionModal) {
      fetchCategories({ searchQuery: '' });
    }
  }, [fetchCategories, createInstitutionModal]);

  /**
   * REACT HOOK FORM
   */
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
    clearErrors,
  } = useForm();

  // HANDLE FORM SUBMISSION
  const onSubmit = handleSubmit((data) => {
    if (selectedCategories.length === 0) {
      setError('categories', {
        message: 'Please select at least one category',
      });
      return;
    } else {
      clearErrors('categories');
    }

    createInstitution({
      institution: {
        name: data.name,
        description: data.description,
        categories: selectedCategories,
      },
      admin: {
        email: data.email,
      },
    });
  });

  // CLOSE MODAL
  const closeModal = useCallback(() => {
    dispatch(setCreateInstitutionModal(false));
    reset({
      name: '',
      description: '',
      email: '',
    });
    setSelectedCategories([]);
  }, [dispatch, reset, setSelectedCategories]);

  useEffect(() => {
    if (createInstitutionIsSuccess) {
      toast.success('Institution created successfully');
      closeModal();
    }
  }, [createInstitutionIsSuccess, closeModal]);

  return (
    <Modal
      isOpen={createInstitutionModal}
      onClose={closeModal}
      className="min-w-[45vw]"
      heading="Create Institution"
    >
      <form className="w-full flex flex-col gap-6" onSubmit={onSubmit}>
        <fieldset className="w-full grid grid-cols-1 gap-4 justify-between">
          <Controller
            name="name"
            control={control}
            rules={{ required: `Please provide the name` }}
            render={({ field }) => (
              <Input
                {...field}
                label="Name"
                placeholder="Enter name"
                required
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                label="Description"
                placeholder="Enter description"
                required
              />
            )}
          />
        </fieldset>
        {categoriesIsFetching && (
          <menu className="w-full grid grid-cols-4 gap-4 justify-between">
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonLoader
                key={index}
                className="w-full h-[30px] bg-gray-200 rounded-md"
              />
            ))}
          </menu>
        )}
        {categoriesList?.length > 0 && (
          <menu className="w-full flex flex-col gap-3">
            <Heading type="h4">Select categories</Heading>
            <ul className="w-full grid grid-cols-3 gap-3 justify-between">
              {categoriesList.map((category, index) => {
                const isSelected = selectedCategories.includes(category?.name);
                return (
                  <Link
                    to={`#`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (isSelected) {
                        setSelectedCategories(
                          selectedCategories.filter((c) => c !== category?.name)
                        );
                        clearErrors('categories');
                      } else {
                        setSelectedCategories([
                          ...selectedCategories,
                          category?.name,
                        ]);
                      }
                    }}
                    key={index}
                    className={`w-full p-1 px-3 rounded-md text-[12px] text-center ${
                      isSelected
                        ? 'bg-green-700 text-white'
                        : 'bg-background text-black shadow-sm'
                    }`}
                  >
                    {capitalizeString(category?.name)}
                  </Link>
                );
              })}
            </ul>
          </menu>
        )}
        {errors.categories && (
          <InputErrorMessage
            message={errors.categories.message}
            className="text-center"
          />
        )}
        <menu className="w-full flex flex-col gap-4">
          <Heading type="h4">Institution admin</Heading>
          <fieldset className="w-full grid grid-cols-1 gap-4 justify-between">
            <Controller
              name="email"
              control={control}
              rules={{
                required: `Please provide the email of the admin`,
                validate: (value) => {
                  return (
                    validateInputs(value, 'email') || 'Invalid email address'
                  );
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Email"
                  placeholder="Enter admin email"
                  errorMessage={errors.email?.message}
                  required
                />
              )}
            />
          </fieldset>
        </menu>
        <Button
          isLoading={createInstitutionIsLoading || categoriesIsFetching}
          primary
          className="self-end"
          type="submit"
        >
          Save
        </Button>
      </form>
    </Modal>
  );
};

export default CreateInstitution;
