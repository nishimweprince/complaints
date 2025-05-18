import AppLayout from '@/containers/navigation/AppLayout';
import { useFetchEntityHistory } from '@/usecases/audit-logs/auditLog.hooks';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import TableUserLabel from '@/containers/users/TableUserLabel';
import { formatDate, capitalizeString } from '@/helpers/strings.helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCircle } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '@/states/hooks';
import { AuditLog } from '@/types/auditLog.type';
import Button from '@/components/inputs/Button';

// Component to display a single audit log entry
export const AuditLogEntryComponent = ({
  log,
  previousLog,
}: {
  log: AuditLog;
  previousLog?: AuditLog;
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'REOPENED':
        return 'bg-amber-100 text-amber-800';
      case 'ANSWERED':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderValueChanges = () => {
    const changes = [];
    const newValues = log.newValues || {};
    const oldValues = previousLog?.newValues || {
      status: undefined,
      assignedUser: undefined,
      assignedInstitution: undefined,
    };

    // Status change
    if (JSON.stringify(newValues.status) !== JSON.stringify(oldValues.status)) {
      changes.push(
        <li key="status" className="flex items-center gap-2">
          <span className="text-gray-500 text-sm">Status:</span>
          <div className="flex items-center gap-2">
            {oldValues.status && (
              <span
                className={`px-2 py-0.5 rounded text-xs ${getStatusColor(
                  oldValues.status
                )} line-through`}
              >
                {capitalizeString(oldValues.status)}
              </span>
            )}
            <span className="text-gray-400">→</span>
            <span
              className={`px-2 py-0.5 rounded text-xs ${getStatusColor(
                newValues.status
              )}`}
            >
              {capitalizeString(newValues.status)}
            </span>
          </div>
        </li>
      );
    }

    // Assigned User change
    if (
      JSON.stringify(newValues.assignedUser) !==
      JSON.stringify(oldValues.assignedUser)
    ) {
      changes.push(
        <li key="assignedUser" className="flex items-center gap-2">
          <span className="text-gray-500 text-sm">Assigned User:</span>
          <div className="flex items-center gap-2">
            {oldValues.assignedUser ? (
              <TableUserLabel user={oldValues.assignedUser} />
            ) : (
              <span className="text-red-500 line-through">None</span>
            )}
            <span className="text-gray-400">→</span>
            {newValues.assignedUser ? (
              <TableUserLabel user={newValues.assignedUser} />
            ) : (
              <span className="text-green-600">None</span>
            )}
          </div>
        </li>
      );
    }

    // Assigned Institution change
    if (
      JSON.stringify(newValues.assignedInstitution) !==
      JSON.stringify(oldValues.assignedInstitution)
    ) {
      changes.push(
        <li key="assignedInstitution" className="flex items-center gap-2">
          <span className="text-gray-500 text-sm">Assigned Institution:</span>
          <div className="flex items-center gap-2">
            {oldValues.assignedInstitution ? (
              <span className="text-red-500 line-through">
                {oldValues.assignedInstitution.name}
              </span>
            ) : (
              <span className="text-red-500 line-through">None</span>
            )}
            <span className="text-gray-400">→</span>
            {newValues.assignedInstitution ? (
              <span className="text-green-600">
                {newValues.assignedInstitution.name}
              </span>
            ) : (
              <span className="text-green-600">None</span>
            )}
          </div>
        </li>
      );
    }

    return changes;
  };

  return (
    <article className="relative pl-8 pb-8 last:pb-0">
      {/* Timeline line */}
      <span
        className="absolute left-3 top-0 bottom-0 w-px bg-gray-200"
        aria-hidden="true"
      />

      {/* Timeline dot */}
      <span
        className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center"
        aria-hidden="true"
      >
        <FontAwesomeIcon icon={faCircle} className="w-3 h-3 text-primary" />
      </span>

      {/* Content */}
      <section className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
        {/* Header */}
        <header className="flex items-center justify-between mb-3">
          <time className="flex items-center gap-2 text-sm text-gray-500">
            <FontAwesomeIcon
              icon={faClock}
              className="w-4 h-4 text-gray-400"
              aria-hidden="true"
            />
            {formatDate(log.createdAt, 'MMM DD, yyyy h:mm a')}
          </time>
          <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">
            {log.action}
          </span>
        </header>

        {/* Actor */}
        <section className="mb-3">
          <span className="text-sm text-gray-500">Changed by:</span>
          <div className="mt-1">
            <TableUserLabel user={log.createdBy} />
          </div>
        </section>

        {/* Changes */}
        <ul className="space-y-2 list-none">{renderValueChanges()}</ul>
      </section>
    </article>
  );
};

const TicketHistoryPage = () => {
  /**
   * STATE VARIABLES
   */
  const { auditLogsList } = useAppSelector((state) => state.auditLog);

  /**
   * NAVIGATION
   */
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { id } = useParams();

  /**
   * USE CASES
   */
  const { fetchEntityHistory, entityHistoryIsFetching } =
    useFetchEntityHistory();

  useEffect(() => {
    let entityId: string | null = null;
    let entityType: string | null = null;

    if (searchParams.get('entityId') !== 'null') {
      entityId = searchParams.get('entityId');
    }

    if (searchParams.get('entityType') !== 'null') {
      entityType = searchParams.get('entityType');
    }

    if (id) {
      entityId = id;
    }

    if (entityId) {
      fetchEntityHistory({
        entityId,
        entityType,
        page: 0,
        size: 1000,
      });
    }
  }, [fetchEntityHistory, id, searchParams]);

  return (
    <AppLayout>
      <main className="w-full mx-auto px-4 py-4">
        <section className="max-w-6xl mx-auto">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
            <p className="text-gray-500 mt-1">
              History of changes for this ticket
            </p>
          </header>

          {entityHistoryIsFetching ? (
            <section className="flex justify-center items-center py-8">
              <p className="animate-pulse text-gray-500">Loading history...</p>
            </section>
          ) : auditLogsList?.length > 0 ? (
            <section className="space-y-4">
              {auditLogsList.map((log, index) => (
                <AuditLogEntryComponent
                  key={log.id}
                  log={log}
                  previousLog={index > 0 ? auditLogsList[index - 1] : undefined}
                />
              ))}
            </section>
          ) : (
            <section className="text-center py-8 text-gray-500">
              <p>No history available for this ticket</p>
            </section>
          )}
        </section>
        <menu className="w-full flex items-center gap-3 justify-between mt-4">
          <Button
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Back
          </Button>
        </menu>
      </main>
    </AppLayout>
  );
};

export default TicketHistoryPage;
