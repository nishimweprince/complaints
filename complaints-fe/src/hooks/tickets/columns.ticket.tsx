import CustomPopover from "@/components/custom/CustomPopover";
import { formatDate } from "@/helpers/strings.helper";
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

export const useTicketColumns = () => {
  const ticketColumns: ColumnDef<Ticket>[] = useMemo(() => {
    return [
      {
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                status === "OPEN"
                  ? "bg-green-100 text-green-800"
                  : status === "CLOSED"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {status}
            </span>
          );
        },
      },
      {
        header: "Created At",
        accessorKey: "createdAt",
        cell: ({ row }) =>
          formatDate(row.original.createdAt, "DD/MM/YYYY HH:mm"),
      },
      {
        header: "",
        accessorKey: "actions",
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
  }, []);

  return { ticketColumns };
};
