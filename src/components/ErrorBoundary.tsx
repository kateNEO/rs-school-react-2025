import React, { Component } from 'react';

type ErrorProps = {
  fallback: React.ReactNode;
  children: React.ReactNode;
};
type ErrorState = {
  hasError: boolean;
};
class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
