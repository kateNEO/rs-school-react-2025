import Button from '../../components/Button';
import { ModalWrapper } from '../../components/ModalWrapper';
import UncontrolledForm from '../../components/UncontrolledForm';
import RHFForm from '../../components/RHFForm';
import { useState } from 'react';

function Forms() {
  const [isUncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [isRHFOpen, setRHFOpen] = useState(false);
  return (
    <div className="flex align-center justify-center mt-50 gap-10">
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
        <UncontrolledForm />
      </ModalWrapper>
      <ModalWrapper isOpen={isRHFOpen} onClose={() => setRHFOpen(false)}>
        <RHFForm />
      </ModalWrapper>
    </div>
  );
}

export default Forms;
