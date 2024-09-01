// components/Sidebar.js
import Link from 'next/link';
import { Card, CardContent } from './ui/card';

const steps = [
  { id: 'step1', label: 'Your Info', number: 1 },
  { id: 'step2', label: 'Select Plan', number: 2 },
  { id: 'step3', label: 'Add-Ons', number: 3 },
  { id: 'step4', label: 'Summary', number: 4 },
];

const Sidebar = () => {
  // For demonstration, assuming 'step1' is active. You can replace this with actual state management.
  const activeStep = 'step1';

  return (
    <aside className="fixed top-12 left-0 h-screen w-1/2 flex bottom-12 items-center justify-center p-6" 
           style={{ backgroundImage: 'url(/bg-sidebar-desktop.svg)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
      <div className="relative w-full max-w-md h-[80%] flex items-center justify-center">
        <Card className="bg-transparent shadow-none border-none h-full w-full">
          <CardContent className="bg-transparent text-white p-6">
            <nav>
              <ul className="space-y-6">
                {steps.map(({ id, label, number }) => (
                  <li key={id} className={`flex items-center space-x-4 ${activeStep === id ? 'text-blue-400' : 'text-white'}`}>
                    <span className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${activeStep === id ? 'border-blue-400 bg-blue-600 text-white' : 'border-gray-600'}`}>
                      <span className="text-lg font-bold">{number}</span>
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xl font-semibold">{label}</span>
                      <span className={`text-sm ${activeStep === id ? 'text-blue-400' : 'text-gray-400'}`}>Step {number}</span>
                    </div>
                    <Link href={`#${id}`} className="hidden"></Link>
                  </li>
                ))}
              </ul>
            </nav>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
};

export default Sidebar;
