import { render, screen } from '@testing-library/react';

describe('Smoke test', () => {
  it('renders without crashing', () => {
    render(<div>Hello BAPI</div>);
    expect(screen.getByText('Hello BAPI')).toBeInTheDocument();
  });
});