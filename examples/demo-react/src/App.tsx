import { useRef, useEffect, useState } from 'react';
import { Ctrovalidate } from 'ctrovalidate';
import './App.css';

interface TeamMember {
  id: string;
  email: string;
}

function App() {
  const formRef = useRef<HTMLFormElement>(null);
  const validatorRef = useRef<Ctrovalidate | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([
    { id: crypto.randomUUID(), email: '' }
  ]);

  useEffect(() => {
    if (formRef.current && !validatorRef.current) {
      validatorRef.current = new Ctrovalidate(formRef.current, {
        realTime: true,
        errorClass: 'error-visible',
        errorMessageClass: 'error-msg',
      });
    }

    return () => {
      validatorRef.current?.destroy();
    };
  }, []);

  // When members array changes, we don't necessarily need to re-initialize.
  // We can use a ref callback or individual useEffects for new fields, 
  // OR just call refresh() if we wanted lazy updates. 
  // Here we show the precise 'addField' pattern via Ref callbacks for maximum control.

  const addMember = () => {
    setMembers(prev => [...prev, { id: crypto.randomUUID(), email: '' }]);
  };

  const removeMember = (id: string) => {
    if (members.length <= 1) return;
    setMembers(prev => prev.filter(m => m.id !== id));
    // Note: Ctrovalidate automatically cleans up when elements are removed from DOM
    // thanks to the MutationObserver in the core engine, BUT 
    // explicit removal (validator.removeField) is good practice if ensuring cleanup 
    // before DOM removal, or if MutationObserver support is not relied upon.
    // In this React example, DOM removal happens *after* state update, so 
    // we let the validator's internal observer or refresh handle it, 
    // or we could manually handle it if we had a ref to the element before removal.
    // For simplicity in this demo, we can just call refresh() in a useEffect [members].
  };

  useEffect(() => {
    // Ideally, for big lists, use refresh()
    if (validatorRef.current) {
      validatorRef.current.refresh();
    }
  }, [members]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validatorRef.current?.validate();

    if (isValid) {
      alert(`Inviting ${members.length} new team members!`);
      // Reset logic
      formRef.current?.reset();
      validatorRef.current?.reset();
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Team Onboarding</h1>
        <p>Dynamic Field Management Demo</p>
      </header>

      <form ref={formRef} noValidate onSubmit={handleSubmit} className="card">
        <div className="members-list">
          {members.map((member, index) => (
            <div key={member.id} className="field-group">
              <label htmlFor={`email-${member.id}`}>
                Member {index + 1}
              </label>
              <div className="input-row">
                <input
                  id={`email-${member.id}`}
                  type="email"
                  name={`email_${member.id}`}
                  data-ctrovalidate-rules="required|email" // Declarative rules
                  placeholder="colleague@company.com"
                  defaultValue={member.email}
                />
                <button
                  type="button"
                  onClick={() => removeMember(member.id)}
                  className="icon-btn delete-btn"
                  title="Remove"
                  disabled={members.length === 1}
                >
                  &times;
                </button>
              </div>
              <div className="error-msg"></div> {/* Container for Ctrovalidate */}
            </div>
          ))}
        </div>

        <div className="actions">
          <button type="button" onClick={addMember} className="btn secondary">
            + Add Another
          </button>
          <button type="submit" className="btn primary">
            Send Invites
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
