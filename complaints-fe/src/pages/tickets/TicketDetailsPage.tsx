import AppLayout from '@/containers/navigation/AppLayout';
import { useAppSelector } from '@/states/hooks';
import { useFetchTicketMessages } from '@/usecases/ticket-messages/ticketMessage.hooks';
import { useGetTicketById } from '@/usecases/tickets/ticket.hooks';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TicketMessage } from '@/types/ticketMessage.type';
import { Ticket } from '@/types/ticket.type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { capitalizeString, formatDate } from '@/helpers/strings.helper';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { Controller, useForm } from 'react-hook-form';
import TextArea from '@/components/inputs/TextArea';
import CustomTooltip from '@/components/custom/CustomTooltip';

const Message = ({
  message,
  isOwnMessage,
}: {
  message: TicketMessage;
  isOwnMessage: boolean;
}) => {
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
            {message?.createdBy?.name || message?.createdBy?.email}
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
  const getStatusStyles = () => {
    switch (status) {
      case 'OPEN':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'CLOSED':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'URGENT':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <span
      className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 border ${getStatusStyles()}`}
    >
      <span className={`w-2 h-2 rounded-full bg-current`}></span>
      {status}
    </span>
  );
};

// Ticket priority badge component
const PriorityBadge = ({ priority }: { priority: string }) => {
  const getPriorityStyles = () => {
    switch (priority) {
      case 'LOW':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'HIGH':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'CRITICAL':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span
      className={`px-3 py-1.5 rounded-full text-sm font-medium border ${getPriorityStyles()}`}
    >
      {priority}
    </span>
  );
};

// Ticket details component
const TicketDetails = ({ ticket }: { ticket: Ticket }) => {
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

  /**
   * USE CASES
   */

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
  const { control, handleSubmit } = useForm();

  // HANDLE FORM SUBMISSION
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <AppLayout>
      <main className="w-full mx-auto px-4 py-4 flex flex-col h-full">
        {ticketIsFetching ? (
          <section className="bg-white rounded-lg shadow-sm p-4 animate-pulse flex justify-center">
            <p>Loading ticket details...</p>
          </section>
        ) : ticket ? (
          <TicketDetails ticket={ticket} />
        ) : null}

        <section className="bg-white rounded-lg shadow-sm flex-1 flex flex-col min-h-0">
          <section className="flex-1 overflow-y-auto">
            {ticketMessagesIsFetching ? (
              <section className="p-4 animate-pulse flex justify-center">
                <p>Loading messages...</p>
              </section>
            ) : ticketMessagesList.length > 0 ? (
              <section className="p-4">
                {ticketMessagesList.map((message) => (
                  <Message
                    key={message.id}
                    message={message}
                    isOwnMessage={message.createdById === currentUserId}
                  />
                ))}
              </section>
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
                <FontAwesomeIcon
                  icon={faArrowUp}
                  size="lg"
                  className="w-8 h-8 cursor-pointer shadow-sm hover:shadow-lg bg-primary text-white p-[.5px] py-2 rounded-full flex items-center justify-center"
                />
              </button>
            </CustomTooltip>
          </form>
        </section>
      </main>
    </AppLayout>
  );
};

export default TicketDetailsPage;
