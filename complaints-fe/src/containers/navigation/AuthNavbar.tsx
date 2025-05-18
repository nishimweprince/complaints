import { Link } from 'react-router-dom';
import { Heading } from '@/components/inputs/TextInputs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Globe } from 'lucide-react';

const AuthNavbar = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
          >
            <Heading type="h2" className="text-primary">
              Complaints Portal
            </Heading>
          </Link>

          <aside className="flex items-center space-x-4">
            <Select defaultValue="en">
              <SelectTrigger className="min-w-[100px] cursor-pointer">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="cursor-pointer" value="en">
                  English
                </SelectItem>
                <SelectItem className="cursor-pointer" value="fr">
                  Français
                </SelectItem>
                <SelectItem className="cursor-pointer" value="kin">
                  Kinyarwanda
                </SelectItem>
              </SelectContent>
            </Select>
          </aside>
        </nav>
      </section>
    </header>
  );
};

export default AuthNavbar;
