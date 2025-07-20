import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../src/components/ErrorBoundary';
import Result from '../src/components/Result';
describe('ErrorBoundary', () => {
  it('shows fallback UI after error is thrown', () => {
    render(
      <ErrorBoundary fallback={<p>It&apos;s okay. You need refresh page.</p>}>
        <Result
          response={{
            total_records: 1,
            result: [],
            total_pages: 1,
            next: null,
            previous: null,
          }}
          isLoading={false}
          error={null}
          setIsLoading={() => {}}
        />
      </ErrorBoundary>
    );

    const button = screen.getByText('Error Button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(
      screen.getByText("It's okay. You need refresh page.")
    ).toBeInTheDocument();
  });
});
