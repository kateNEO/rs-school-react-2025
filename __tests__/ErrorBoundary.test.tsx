import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../src/components/ErrorBoundary';
const MakeErrorComponent = () => {
  throw new Error('ERROR!');
};
describe('ErrorBoundary', () => {
  it('shows fallback UI after error is thrown', () => {
    render(
      <ErrorBoundary fallback={<p>It&apos;s okay. You need refresh page.</p>}>
        <MakeErrorComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByText("It's okay. You need refresh page.")
    ).toBeInTheDocument();
  });
});
