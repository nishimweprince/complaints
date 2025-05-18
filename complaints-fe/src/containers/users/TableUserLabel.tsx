import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { SkeletonLoader } from '@/components/inputs/Loader';
import { User } from '@/types/user.type';

const TableUserLabel = ({
  user,
  isLoading,
}: {
  user?: User;
  isLoading?: boolean;
}) => {
  if (isLoading)
    return (
      <span className="block w-32">
        <SkeletonLoader />
      </span>
    );

  return (
    <Link
      to={`/users/${user?.id}`}
      className="group flex items-center gap-2 px-2 py-1 rounded-md border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200 ease-in-out w-fit bg-background"
    >
      <figure className="relative">
        <span className="absolute inset-0 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        <FontAwesomeIcon
          icon={faUser}
          className="relative bg-primary/5 text-primary rounded-full p-1.5 text-sm transition-transform duration-200 group-hover:scale-105"
        />
      </figure>
      <section className="flex flex-col">
        <span className="font-medium text-gray-900 text-sm leading-tight">
          {user?.name?.split(' ')?.[0] || '@' + user?.email?.split('@')?.[0]}
        </span>
        {user?.email && (
          <span className="text-xs text-gray-500 truncate max-w-[150px] leading-tight">
            {user.email}
          </span>
        )}
      </section>
    </Link>
  );
};

export default TableUserLabel;
