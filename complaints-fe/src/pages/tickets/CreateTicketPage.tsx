import Button from '@/components/inputs/Button';
import Combobox from '@/components/inputs/Combobox';
import Input from '@/components/inputs/Input';
import Select from '@/components/inputs/Select';
import TextArea from '@/components/inputs/TextArea';
import { Heading } from '@/components/inputs/TextInputs';
import { TicketPriority } from '@/constants/ticket.constants';
import AppLayout from '@/containers/navigation/AppLayout';
import { capitalizeString } from '@/helpers/strings.helper';
import { useAppSelector } from '@/states/hooks';
import { useFetchCategories } from '@/usecases/categories/category.hooks';
import { useFetchInstitutions } from '@/usecases/institutions/institution.hooks';
import { useCreateTicket } from '@/usecases/tickets/ticket.hooks';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

const CreateTicketPage = () => {
  /**
   * STATE VARIABLES
   */
  const { categoriesList } = useAppSelector((state) => state.category);
  const { institutionsList } = useAppSelector((state) => state.institution);

  /**
   * REACT HOOK FORM
   */
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  /**
   * USE CASES
   */

  // FETCH CATEGORIES
  const { fetchCategories, categoriesIsFetching } = useFetchCategories();

  useEffect(() => {
    fetchCategories({});
  }, [fetchCategories]);

  // FETCH INSTITUTIONS
  const { fetchInstitutions, institutionsIsFetching } = useFetchInstitutions();

  useEffect(() => {
    fetchInstitutions({
      page: 0,
      size: 100,
    });
  }, [fetchInstitutions]);

  // CREATE TICKET
  const { createTicket, createTicketIsLoading } = useCreateTicket();

  // HANDLE FORM SUBMISSION
  const onSubmit = handleSubmit((data) => {
    createTicket({
      ticket: {
        title: data.title,
        priority: data.priority,
        category: data.category,
        assignedInstitutionId: data?.assignedInstitutionId,
      },
      ticketMessage: {
        message: data.message,
      },
    });
  });

  return (
    <AppLayout>
      <main className="w-full flex flex-col gap-4">
        <nav className="w-full flex flex-col items-center gap-4">
          <Heading>Submit complaint</Heading>
        </nav>
        <section className="w-full flex flex-col gap-4 px-4 sm:px-6">
          <form
            className="w-full flex flex-col gap-6 max-w-full sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] m-auto shadow-md p-4 sm:p-6 rounded-md"
            onSubmit={onSubmit}
          >
            <Heading type="h3" className="text-center text-lg sm:text-xl">
              Please provide the following details
            </Heading>
            <p className="text-gray-700 text-center text-wrap text-xs sm:text-sm font-medium max-w-full sm:max-w-[90%] m-auto">
              If you are not sure of the institution or category, you can leave
              these fields empty. Our AI system will help categorize your ticket
              and assign it to the appropriate institution.
            </p>
            <fieldset className="w-full flex flex-col gap-4">
              <Controller
                name="title"
                rules={{
                  required: `Please provide the subject of the complaint`,
                }}
                control={control}
                render={({ field }) => (
                  <Input
                    errorMessage={errors.title?.message}
                    label="Subject"
                    placeholder="Enter subject"
                    {...field}
                    required
                  />
                )}
              />
              <ul className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 justify-between">
                <Controller
                  name="priority"
                  control={control}
                  rules={{ required: `Please select priority` }}
                  render={({ field }) => (
                    <Select
                      options={Object.values(TicketPriority)?.map(
                        (priority) => ({
                          label: capitalizeString(priority),
                          value: priority,
                        })
                      )}
                      {...field}
                      label={`Priority`}
                      placeholder="Select priority"
                    />
                  )}
                />
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select
                      isLoading={categoriesIsFetching}
                      options={categoriesList?.map((category) => ({
                        label: capitalizeString(category?.name),
                        value: category?.id,
                      }))}
                      {...field}
                      label="Category (optional)"
                      placeholder="Select category (optional)"
                    />
                  )}
                />
              </ul>
              <Controller
                name="message"
                control={control}
                rules={{ required: `Message is required` }}
                render={({ field }) => (
                  <TextArea
                    resize
                    errorMessage={errors.message?.message}
                    label="Message"
                    placeholder="Enter message"
                    {...field}
                    required
                  />
                )}
              />
              <Controller
                name="assignedInstitutionId"
                control={control}
                render={({ field }) => (
                  <Combobox
                    options={institutionsList?.map((institution) => ({
                      label: capitalizeString(institution?.name),
                      value: institution?.id,
                    }))}
                    {...field}
                    label="Institution (optional)"
                    placeholder="Select institution (optional)"
                    isLoading={institutionsIsFetching}
                  />
                )}
              />
            </fieldset>
            <menu className="w-full flex flex-col sm:flex-row items-center gap-3 justify-between">
              <Button 
                variant='secondary' 
                to={`/tickets`}
                className="w-full sm:w-auto"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto"
                isLoading={createTicketIsLoading}
              >
                Submit
              </Button>
            </menu>
          </form>
        </section>
      </main>
    </AppLayout>
  );
};

export default CreateTicketPage;
