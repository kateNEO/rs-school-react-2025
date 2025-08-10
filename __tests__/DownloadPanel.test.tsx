import type { BooksCard } from '../src/pages/MainPage';
import { fireEvent, render, screen } from '@testing-library/react';
import * as createCSVModule from '../src/services/createCSV';

global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
global.URL.revokeObjectURL = vi.fn();

const selectedIdListMock: BooksCard[] = [
  {
    key: '/books/OL14942956W',
    title: 'Book 1',
    author_name: ['First Author'],
    lending_edition_s: 'Fantasy',
  },
  {
    key: '/books/OL14942956H',
    title: 'Book 2',
    author_name: ['First Author', 'Second Author'],
    lending_edition_s: 'Fiction',
  },
];

const removeAllMock = vi.fn();

vi.mock('../src/store/store', () => ({
  store: {
    getState: () => ({
      selectedIdList: selectedIdListMock,
      toggleItem: () => {},
      isSelected: () => false,
      removeAll: removeAllMock,
    }),
  },
}));

vi.mock('../src/services/createCSV', () => ({
  createCSV: vi.fn(),
}));

import DownloadPanel from '../src/components/DownloadPanel';

describe('DownloadPanel', () => {
  beforeEach(() => {
    removeAllMock.mockClear();
  });

  it('calls removeAll and resets count on "Remove All" click', () => {
    const setSelected = vi.fn();
    render(<DownloadPanel countOfSelected={2} setSelected={setSelected} />);
    fireEvent.click(screen.getByText('Remove All'));
    expect(removeAllMock).toHaveBeenCalled();
    expect(setSelected).toHaveBeenCalledWith(0);
  });

  it('calls createCSV with selectedIdList on "Save" click', () => {
    const setSelected = vi.fn();
    render(<DownloadPanel countOfSelected={2} setSelected={setSelected} />);
    fireEvent.click(screen.getByText('Save'));
    expect(createCSVModule.createCSV).toHaveBeenCalledWith(selectedIdListMock);
  });
});
