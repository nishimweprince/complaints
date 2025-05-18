import Button from "@/components/inputs/Button";
import Combobox from "@/components/inputs/Combobox";
import Input from "@/components/inputs/Input";
import Select from "@/components/inputs/Select";
import TextArea from "@/components/inputs/TextArea";
import { Heading } from "@/components/inputs/TextInputs";
import { TicketPriority } from "@/constants/ticket.constants";
import AppLayout from "@/containers/navigation/AppLayout";
import { capitalizeString } from "@/helpers/strings.helper";
import { useAppSelector } from "@/states/hooks";
import { useFetchCategories } from "@/usecases/categories/category.hooks";
import { useFetchInstitutions } from "@/usecases/institutions/institution.hooks";
import { useCreateTicket } from "@/usecases/tickets/ticket.hooks";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

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
        <section className="w-full flex flex-col gap-4">
          <form
            className="w-full flex flex-col gap-6 max-w-[60%] m-auto shadow-md p-4 rounded-md"
            onSubmit={onSubmit}
          >
            <Heading type="h3" className="text-center">
              Please provide the following details
            </Heading>
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
              <ul className="w-full grid grid-cols-2 gap-4 justify-between">
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
                  rules={{ required: `Please select category` }}
                  render={({ field }) => (
                    <Select
                      isLoading={categoriesIsFetching}
                      options={categoriesList?.map((category) => ({
                        label: capitalizeString(category?.name),
                        value: category?.id,
                      }))}
                      {...field}
                      label="Category"
                      placeholder="Select category"
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
                    rows={100}
                    height="300"
                    resize
                    errorMessage={errors.message?.message}
                    label="Message"
                    placeholder="Enter message"
                    {...field}
                    required
                  />
                )}
              />
              <Controller name="assignedInstitutionId" control={control} render={({ field }) => (
                <Combobox
                  options={institutionsList?.map((institution) => ({
                    label: capitalizeString(institution?.name),
                    value: institution?.id,
                  }))}
                  {...field}
                  label="Institution"
                  placeholder="Select institution"
                  isLoading={institutionsIsFetching}
                />
              )}
              />
            </fieldset>
            <Button
              type="submit"
              className="w-full"
              isLoading={createTicketIsLoading}
            >
              Submit
            </Button>
          </form>
        </section>
      </main>
    </AppLayout>
  );
};

export default CreateTicketPage;
