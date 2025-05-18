import CustomPopover from '@/components/custom/CustomPopover';
import {
  ellipsisHClassName,
  tableActionClassName,
} from '@/constants/inputs.constants';
import { capitalizeString, formatDate } from '@/helpers/strings.helper';
import { Institution } from '@/types/institution.type';
import { faCircleInfo, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

export const useInstitutionColumns = () => {
  const institutionColumns: ColumnDef<Institution>[] = useMemo(() => {
    return [
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Description',
        accessorKey: 'description',
      },
      {
        header: 'Categories',
        accessorKey: 'categories',
        cell: ({ row }) => {
          return (
            <ul className="flex flex-wrap gap-2">
              {row?.original?.categories?.map(
                (category: string, index: number) => (
                  <li
                    key={index}
                    className="text-[12px] p-1 px-2 rounded-md bg-background cursor-pointer hover:bg-primary hover:text-white"
                  >
                    {capitalizeString(category)}
                  </li>
                )
              )}
            </ul>
          );
        },
      },
      {
        header: 'Date added',
        accessorKey: 'createdAt',
        cell: ({ row }) =>
          formatDate(row?.original?.createdAt, 'DD/MM/YYYY HH:mm'),
      },
      {
        header: '',
        accessorKey: 'actions',
        cell: ({ row }) => {
          return (
            <CustomPopover
              trigger={
                <FontAwesomeIcon
                  icon={faEllipsisH}
                  className={ellipsisHClassName}
                />
              }
            >
              <menu className="w-full flex flex-col gap-1">
                <Link
                  className={tableActionClassName}
                  to={`/institutions/${row?.original?.id}`}
                >
                  <FontAwesomeIcon icon={faCircleInfo} />
                  View details
                </Link>
              </menu>
            </CustomPopover>
          );
        },
      },
    ];
  }, []);

  return { institutionColumns };
};
