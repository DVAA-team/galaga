import { Component, ReactNode } from 'react';

type TOwnProps = {
  children?: ReactNode;
};

type TOwwState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<TOwnProps, TOwwState> {
  constructor(props: TOwnProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): TOwwState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Произошла ошибка, мы уже занимаемся ее исправлением</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
