import Button from './Button.tsx';
import { store } from '../store/store.ts';
import { createCSV } from '../services/createCSV.ts';

type DownloadPanelPropsType = {
  countOfSelected: number;
  setSelected: (countOfSelected: number) => void;
};

function DownloadPanel({
  countOfSelected,
  setSelected,
}: DownloadPanelPropsType) {
  const removeAll = () => {
    store.getState().removeAll();
    setSelected(0);
  };
  const save = () => {
    const dataForSave = store.getState().selectedIdList;
    createCSV(dataForSave);
  };

  return (
    <div className="flex justify-between py-10">
      <p className="font-medium text-lg text-inherit text-shadow:inherit">
        {countOfSelected} cards selected
      </p>
      <div className="flex gap-5">
        <Button text="Save" type="button" onClick={save} />
        <Button text="Remove All" type="button" onClick={removeAll} />
      </div>
    </div>
  );
}

export default DownloadPanel;
