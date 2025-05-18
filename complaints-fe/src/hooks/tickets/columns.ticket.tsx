import CustomPopover from "@/components/custom/CustomPopover";
import { capitalizeString, formatDate, getStatusBackgroundColor } from "@/helpers/strings.helper";
import {
  ellipsisHClassName,
  tableActionClassName,
} from "@/constants/inputs.constants";
import { faCircleInfo, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { Ticket } from "@/types/ticket.type";
import { useMemo } from "react";
import { PriorityBadge } from "@/pages/tickets/TicketDetailsPage";
import TableUserLabel from "@/containers/users/TableUserLabel";

export const useTicketColumns = () => {
  const ticketColumns: ColumnDef<Ticket>[] = useMemo(() => {
    const columns: ColumnDef<Ticket>[] = [
      {
        header: 'Reference ID',
        accessorKey: 'referenceId',
      },
      {
        header: 'Title',
        accessorKey: 'title',
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => (
          <p className={`${getStatusBackgroundColor(row.original?.status || '')} text-center p-[2px] px-3 text-white text-normal rounded-lg`}>
            {capitalizeString(row.original?.status || '')}
          </p>
        ),
      },
      {
        header: 'Priority',
        accessorKey: 'priority',
        cell: ({ row }) => (
          <PriorityBadge priority={row.original?.priority || ''} />
        ),
      },
      {
        header: 'Category',
        accessorKey: 'category',
        cell: ({ row }) => (
          <span className="text-primary font-medium text-center text-[12px]">
            {capitalizeString(row.original?.category?.name) || 'N/A'}
          </span>
        ),
      },
      {
        header: 'Assigned to',
        accessorKey: 'assignedUser',
        cell: ({ row }) => {
          if (row.original?.assignedUser) {
            return <TableUserLabel user={row.original?.assignedUser} />;
          }
          return (
            <span className="text-gray-500 text-center text-[12px] cursor-not-allowed">
              Unassigned
            </span>
          );
        },
      },
      {
        header: 'Date added',
        accessorKey: 'createdAt',
        cell: ({ row }) =>
          formatDate(row.original.createdAt, 'DD/MM/YYYY HH:mm'),
      },
      {
        header: 'Last updated',
        accessorKey: 'updatedAt',
        cell: ({ row }) =>
          formatDate(row.original.updatedAt, 'DD/MM/YYYY HH:mm'),
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
                  to={`/tickets/${row.original.id}`}
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

    return columns as ColumnDef<Ticket>[];
  }, []);

  return { ticketColumns };
};
