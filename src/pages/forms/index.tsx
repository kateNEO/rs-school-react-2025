import Button from '../../components/Button';
import { ModalWrapper } from '../../components/ModalWrapper';
import UncontrolledForm from '../../components/UncontrolledForm';
import RHFForm from '../../components/RHFForm';
import { useState } from 'react';
import FormCard from '../../components/FormCard.tsx';
import { formStore } from '../../store/formStore.ts';

function Forms() {
  const [isUncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [isRHFOpen, setRHFOpen] = useState(false);
  const forms = formStore.getState().getData();
  return (
    <>
      <div className="flex align-center justify-center mt-10 gap-10 h-20">
        <Button
          text="uncontrolled"
          type="button"
          onClick={() => setUncontrolledOpen(true)}
        />
        <Button text="RHF" type="button" onClick={() => setRHFOpen(true)} />
        <ModalWrapper
          isOpen={isUncontrolledOpen}
          onClose={() => setUncontrolledOpen(false)}
        >
          <UncontrolledForm onClose={() => setUncontrolledOpen(false)} />
        </ModalWrapper>
        <ModalWrapper isOpen={isRHFOpen} onClose={() => setRHFOpen(false)}>
          <RHFForm onClose={() => setRHFOpen(false)} />
        </ModalWrapper>
      </div>
      {forms.length > 0 && (
        <div className="flex align-center justify-center gap-10">
          {forms.map((form, index) => (
            <FormCard key={index} data={form} />
          ))}
        </div>
      )}
    </>
  );
}

export default Forms;
