import { Heading } from '@/components/inputs/TextInputs';
import Button from '@/components/inputs/Button';
import { useNavigate } from 'react-router-dom';
import { faArrowLeft, faHome } from '@fortawesome/free-solid-svg-icons';

const NotFoundPage = () => {
  /**
   * NAVIGATION
   */
  const navigate = useNavigate();

  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-background px-4">
      <article className="w-full max-w-[500px] text-center flex flex-col items-center gap-6">
        <header className="flex flex-col gap-3">
          <Heading type="h1" className="text-6xl font-bold text-primary">
            404
          </Heading>
          <Heading type="h2" className="text-2xl font-semibold text-gray-800">
            Page Not Found
          </Heading>
          <p className="text-secondary text-sm">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </header>

        <nav className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="w-full sm:w-auto"
            variant="outline"
            icon={faArrowLeft}
            to="#"
          >
            Go Back
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate('/dashboard');
            }}
            className="w-full sm:w-auto"
            icon={faHome}
            to="#"
          >
            Go to Dashboard
          </Button>
        </nav>
      </article>
    </main>
  );
};

export default NotFoundPage;
