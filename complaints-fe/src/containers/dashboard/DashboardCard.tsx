import { SkeletonLoader } from "@/components/inputs/Loader";
import { getStatusBackgroundColor } from "@/helpers/strings.helper";
import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

interface DashboardCardProps {
  label: string;
  value: string | number;
  onActionClick?: MouseEventHandler<HTMLAnchorElement>;
  actionLabel?: string;
  isLoading?: boolean;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  label,
  value,
  onActionClick,
  actionLabel = 'View Details',
  isLoading = false,
}) => {
  return (
    <article className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      <header className="mb-4">
        <h3 className="text-gray-600 text-sm font-medium uppercase tracking-wider m-0">
          {label}
        </h3>
        <p className="text-gray-900 text-3xl font-semibold my-2">
          {isLoading ? (
            <SkeletonLoader className="w-full h-4" type="text" />
          ) : (
            value
          )}
        </p>
      </header>
      {onActionClick && (
        <Link
          to={`#`}
          onClick={onActionClick}
          type="Link"
          className={`${getStatusBackgroundColor(
            label
          )} text-white px-4 py-2 rounded-md text-sm font-medium
            focus:outline-none focus:ring-2 focus:ring-offset-2
            transition-colors duration-200`}
        >
          {actionLabel}
        </Link>
      )}
    </article>
  );
};

export default DashboardCard;
