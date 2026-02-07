import { useRef, useEffect, useState } from 'react';
import { Ctrovalidate } from '@ctrovalidate/browser';

interface TeamMember {
  id: string;
  email: string;
}

function App() {
  const formRef = useRef<HTMLFormElement>(null);
  const validatorRef = useRef<Ctrovalidate | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([
    { id: crypto.randomUUID(), email: '' },
  ]);

  // Register a custom validation rule
  Ctrovalidate.addRule(
    'isCompanyEmail',
    (value: unknown) => (value as string).endsWith('@industrial.com'),
    'Please use your official company email address.'
  );

  useEffect(() => {
    if (formRef.current && !validatorRef.current) {
      validatorRef.current = new Ctrovalidate(formRef.current, {
        realTime: true,
        errorClass: 'border-red-500',
        errorMessageClass: 'text-red-600 text-xs mt-1',
        pendingClass: 'opacity-50',
      });
    }

    return () => {
      validatorRef.current?.destroy();
    };
  }, []);

  const addMember = () => {
    setMembers((prev) => [...prev, { id: crypto.randomUUID(), email: '' }]);
  };

  const removeMember = (id: string) => {
    if (members.length <= 1) return;
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  useEffect(() => {
    if (validatorRef.current) {
      validatorRef.current.refresh();
    }
  }, [members]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validatorRef.current?.validate();

    if (isValid) {
      alert(`Inviting ${members.length} new team members!`);
      formRef.current?.reset();
      validatorRef.current?.reset();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-6 font-sans">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold uppercase tracking-wide">
          Team Onboarding
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Dynamic Field Management Demo
        </p>
      </header>

      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
      >
        <div className="space-y-4">
          {members.map((member, index) => (
            <div key={member.id} className="space-y-1">
              <label
                htmlFor={`email-${member.id}`}
                className="block text-xs uppercase tracking-wider text-gray-700"
              >
                Member {index + 1}
              </label>
              <div className="flex items-center space-x-2">
                <input
                  id={`email-${member.id}`}
                  type="email"
                  name={`email_${member.id}`}
                  data-ctrovalidate-rules="required|isCompanyEmail"
                  placeholder="colleague@company.com"
                  defaultValue={member.email}
                  className="flex-1 border-2 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeMember(member.id)}
                  disabled={members.length === 1}
                  className="text-red-500 hover:text-red-700 font-bold text-lg px-2 disabled:opacity-50"
                  title="Remove"
                >
                  &times;
                </button>
              </div>
              <div className="error-msg text-red-600 text-xs mt-1"></div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <button
            type="button"
            onClick={addMember}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs uppercase px-4 py-2 rounded tracking-wider"
          >
            + Add Another
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs uppercase px-4 py-2 rounded tracking-wider"
          >
            Send Invites
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
