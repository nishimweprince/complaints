import AppLayout from '@/containers/navigation/AppLayout';
import { useAppSelector } from '@/states/hooks';
import {
  useCreateTicketMessage,
  useFetchTicketMessages,
} from '@/usecases/ticket-messages/ticketMessage.hooks';
import { useGetTicketById } from '@/usecases/tickets/ticket.hooks';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TicketMessage } from '@/types/ticketMessage.type';
import { Ticket } from '@/types/ticket.type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faHistory } from '@fortawesome/free-solid-svg-icons';
import {
  capitalizeString,
  formatDate,
  getStatusBackgroundColor,
} from '@/helpers/strings.helper';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { Controller, useForm } from 'react-hook-form';
import TextArea from '@/components/inputs/TextArea';
import CustomTooltip from '@/components/custom/CustomTooltip';
import Loader, { SkeletonLoader } from '@/components/inputs/Loader';
import Button from '@/components/inputs/Button';

const Message = ({
  message,
  isOwnMessage,
}: {
  message: TicketMessage;
  isOwnMessage: boolean;
}) => {
  // STATE VARIABLES
  const { user } = useAppSelector((state) => state.auth);

  const createdBy = message?.createdBy || user;

  return (
    <article
      className={`flex ${
        isOwnMessage ? 'justify-end' : 'justify-start'
      } mb-6 group`}
    >
      <section
        className={`flex flex-col ${
          isOwnMessage ? 'items-end' : 'items-start'
        } max-w-[70%]`}
      >
        {/* Message bubble */}
        <blockquote
          className={`${
            isOwnMessage
              ? 'bg-primary text-white rounded-t-2xl rounded-bl-2xl'
              : 'bg-gray-50 text-gray-800 rounded-t-2xl rounded-br-2xl border border-gray-100'
          } p-4 shadow-sm`}
        >
          <p className="text-sm whitespace-pre-wrap leading-relaxed">
            {message.message}
          </p>
        </blockquote>

        {/* Sender info and timestamp */}
        <footer className="flex items-center gap-2 mt-1.5 px-1">
          <FontAwesomeIcon
            icon={faCircleUser}
            className="w-4 h-4 text-gray-400"
          />
          <span className="text-xs text-gray-500">
            {createdBy?.name || createdBy?.email}
          </span>
          <span className="text-gray-300">•</span>
          <time className="text-xs text-gray-500">
            {formatDate(message?.createdAt, 'MMM DD, yyyy h:mm a')}
          </time>
        </footer>
      </section>
    </article>
  );
};

// Ticket status badge component
const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={`font-normal flex items-center gap-1 border ${getStatusBackgroundColor(
        status
      )}`}
    >
      <span className={`w-2 h-2 rounded-full bg-current`}></span>
      {capitalizeString(status)}
    </span>
  );
};

// Ticket priority badge component
export const PriorityBadge = ({ priority }: { priority: string }) => {
  const getPriorityStyles = () => {
    switch (priority) {
      case 'LOW':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'MEDIUM':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'HIGH':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'CRITICAL':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <span
      className={`font-normal flex items-center gap-1 border text-center justify-center text-[13px] rounded-lg px-3 ${getPriorityStyles()}`}
    >
      {capitalizeString(priority)}
    </span>
  );
};

// Ticket details component
export const TicketDetails = ({ ticket }: { ticket: Ticket }) => {
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
      <header className="border-b border-gray-100 p-3">
        <nav className="flex justify-between items-center">
          <address>
            <h1 className="text-lg font-bold text-gray-900">{ticket.title}</h1>
            <p className="text-xs text-gray-500">Ref: {ticket.referenceId}</p>
          </address>
          <menu className="flex gap-2">
            <StatusBadge status={ticket.status} />
            <PriorityBadge priority={ticket.priority} />
          </menu>
        </nav>
      </header>

      <section className="p-3 grid grid-cols-2 gap-3 text-sm">
        <blockquote className="flex flex-col gap-1">
          <Link
            to={`/users/${ticket?.createdBy?.id}`}
            className="text-gray-800 text-sm"
          >
            {ticket?.createdBy?.email}
          </Link>
          <Link
            to={`/institutions/${ticket?.assignedInstitution?.id}`}
            className="text-xs text-gray-500"
          >
            {ticket?.assignedInstitution?.name}
          </Link>
          <Link
            to={`/tickets/${ticket.id}/history`}
            className="mt-4 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-medium transition-colors w-fit flex items-center gap-2"
          >
            <FontAwesomeIcon
              icon={faHistory}
              className="w-4 h-4 text-primary"
            />
            View History
          </Link>
        </blockquote>

        <menu className="flex flex-wrap gap-1 justify-end items-center">
          {ticket?.assignedInstitution?.categories
            ?.slice(0, 3)
            .map((category) => (
              <span
                key={category}
                className="px-2 py-0.5 h-fit bg-gray-100 rounded text-xs text-gray-700"
              >
                {capitalizeString(category)}
              </span>
            ))}
          {ticket?.assignedInstitution?.categories?.length &&
            ticket?.assignedInstitution?.categories?.length > 3 && (
              <span className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-700">
                +{ticket?.assignedInstitution?.categories?.length - 3}
              </span>
            )}
        </menu>
      </section>
    </article>
  );
};

const TicketDetailsPage = () => {
  /**
   * STATE VARIABLES
   */
  const { ticketMessagesList } = useAppSelector((state) => state.ticketMessage);
  const { ticket } = useAppSelector((state) => state.ticket);

  /**
   * NAVIGATION
   */
  const { id } = useParams();
  const navigate = useNavigate();

  /**
   * USE CASES
   */

  // CREATE TICKET MESSAGE
  const {
    createTicketMessage,
    createTicketMessageIsSuccess,
    createTicketMessageIsLoading,
  } = useCreateTicketMessage();

  // FETCH TICKET MESSAGES
  const { fetchTicketMessages, ticketMessagesIsFetching, page, size } =
    useFetchTicketMessages();

  useEffect(() => {
    if (id) {
      fetchTicketMessages({
        ticketId: id,
        page,
        size,
      });
    }
  }, [fetchTicketMessages, id, page, size]);

  // GET TICKET BY ID
  const { getTicketById, ticketIsFetching } = useGetTicketById();

  useEffect(() => {
    if (id) {
      getTicketById(id);
    }
  }, [getTicketById, id]);

  const currentUserId = useAppSelector((state) => state.auth.user?.id);

  /**
   * REACT HOOK FORM
   */
  const { control, handleSubmit, reset } = useForm();

  // HANDLE FORM SUBMISSION
  const onSubmit = handleSubmit((data) => {
    if (data?.message) {
      createTicketMessage({
        message: data?.message,
        ticketId: id,
      });
    }
  });

  // HANDLE CREATE MESSAGE IS SUCCESS
  useEffect(() => {
    if (createTicketMessageIsSuccess) {
      reset({
        message: '',
      });
      if (id) {
        getTicketById(id);
      }
    }
  }, [createTicketMessageIsSuccess, getTicketById, id, reset]);

  return (
    <AppLayout>
      <main className="w-full mx-auto px-4 py-4 flex flex-col h-full">
        {ticketIsFetching ? (
          <section className="bg-white rounded-lg shadow-sm p-4">
            <section className="flex flex-col gap-4">
              {/* Header skeleton */}
              <header className="flex items-center justify-between">
                <SkeletonLoader className="h-6 w-48" />
                <SkeletonLoader className="h-8 w-24" />
              </header>
              
              {/* Status and priority skeleton */}
              <nav className="flex gap-4">
                <SkeletonLoader className="h-6 w-32" />
                <SkeletonLoader className="h-6 w-32" />
              </nav>

              {/* Description skeleton */}
              <article className="space-y-2">
                <SkeletonLoader className="h-4 w-24" />
                <SkeletonLoader className="h-4 w-full" />
                <SkeletonLoader className="h-4 w-3/4" />
              </article>

              {/* Metadata skeleton */}
              <section className="grid grid-cols-2 gap-4 mt-4">
                <menu className="space-y-2">
                  <SkeletonLoader className="h-4 w-20" />
                  <SkeletonLoader className="h-4 w-32" />
                </menu>
                <menu className="space-y-2">
                  <SkeletonLoader className="h-4 w-20" />
                  <SkeletonLoader className="h-4 w-32" />
                </menu>
              </section>
            </section>
          </section>
        ) : ticket ? (
          <TicketDetails ticket={ticket} />
        ) : null}

        <section className="bg-white rounded-lg shadow-sm flex-1 flex flex-col min-h-0">
          <section
            className="flex-1 overflow-y-auto"
            ref={(el) => {
              if (
                el &&
                !ticketMessagesIsFetching &&
                ticketMessagesList.length > 0
              ) {
                el.scrollTop = el.scrollHeight;
              }
            }}
          >
            {ticketMessagesIsFetching ? (
              <menu className="p-4 space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <article key={index} className="flex flex-col gap-2">
                    {/* Message header skeleton */}
                    <header className="flex items-center gap-2">
                      <SkeletonLoader className="h-8 w-8 rounded-full" />
                      <section className="flex flex-col gap-1">
                        <SkeletonLoader className="h-4 w-32" />
                        <SkeletonLoader className="h-3 w-24" />
                      </section>
                    </header>
                    {/* Message content skeleton */}
                    <section className="ml-10 space-y-2">
                      <SkeletonLoader className="h-4 w-3/4" />
                      <SkeletonLoader className="h-4 w-1/2" />
                    </section>
                  </article>
                ))}
              </menu>
            ) : ticketMessagesList.length > 0 ? (
              <menu className="p-4">
                {ticketMessagesList.map((message) => (
                  <Message
                    key={message.id}
                    message={message}
                    isOwnMessage={message.createdById === currentUserId}
                  />
                ))}
              </menu>
            ) : (
              <section className="p-4 text-center text-gray-500">
                <p>No messages to display</p>
              </section>
            )}
          </section>

          <form
            className="border-t border-gray-100 p-4 bg-white flex items-center justify-between gap-2"
            onSubmit={onSubmit}
          >
            <fieldset className="flex gap-2 w-full">
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    placeholder="Type your message..."
                    rows={2}
                  />
                )}
              />
            </fieldset>
            <CustomTooltip label="Click to send message">
              <button type="submit">
                {createTicketMessageIsLoading ? (
                  <Loader className="text-primary" />
                ) : (
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    size="lg"
                    className="w-8 h-8 cursor-pointer shadow-sm hover:shadow-lg bg-primary text-white p-[.5px] py-2 rounded-full flex items-center justify-center"
                  />
                )}
              </button>
            </CustomTooltip>
          </form>
        </section>
        <menu className="w-full flex items-center gap-4 justify-between mt-4">
          <Button
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              navigate('/tickets');
            }}
          >
            Back
          </Button>
        </menu>
      </main>
    </AppLayout>
  );
};

export default TicketDetailsPage;
