import Button from "@/components/inputs/Button";
import { Heading } from "@/components/inputs/TextInputs";
import Table from "@/components/table/Table";
import AppLayout from "@/containers/navigation/AppLayout";
import { useInstitutionColumns } from "@/hooks/institutions/columns.institution";
import { useAppDispatch, useAppSelector } from "@/states/hooks";
import { useFetchInstitutions } from "@/usecases/institutions/institution.hooks";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import CreateInstitution from "./CreateInstitution";
import { setCreateInstitutionModal } from "@/states/slices/institutionSlice";

const InstitutionsPage = () => {
  /**
   * STATE VARIABLES
   */
  const dispatch = useAppDispatch();
  const { institutionsList, createInstitutionModal } = useAppSelector(
    (state) => state.institution
  );

  /**
   * USE CASES
   */
  const {
    fetchInstitutions,
    institutionsIsFetching,
    page,
    size,
    totalCount,
    totalPages,
    setPage,
    setSize,
  } = useFetchInstitutions();

  useEffect(() => {
    if (!createInstitutionModal) {
      fetchInstitutions({ page, size, searchQuery: "" });
    }
  }, [fetchInstitutions, page, size, createInstitutionModal]);

  const { institutionColumns } = useInstitutionColumns();

  return (
    <AppLayout>
      <main className="w-full flex flex-col gap-6">
        <nav className="w-full flex flex-col gap-4">
          <ul className="w-full flex items-center gap-3 justify-between">
            <Heading type="h2">Institutions</Heading>
            <Button
              icon={faPlus}
              onClick={(e) => {
                e.preventDefault();
                dispatch(setCreateInstitutionModal(true));
              }}
            >
              Create Institution
            </Button>
          </ul>
        </nav>
        <section className="w-full flex flex-col gap-4">
          <Table
            data={institutionsList}
            columns={institutionColumns}
            isLoading={institutionsIsFetching}
            page={page}
            size={size}
            totalCount={totalCount}
            totalPages={totalPages}
            setPage={setPage}
            setSize={setSize}
          />
        </section>
      </main>
      <CreateInstitution />
    </AppLayout>
  );
};

export default InstitutionsPage;
