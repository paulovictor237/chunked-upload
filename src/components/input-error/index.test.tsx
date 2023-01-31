import { render, screen } from '@testing-library/react';
import { InputErrorMessage } from '.';

describe('InputErrorMessage', () => {
  it('should render message', () => {
    render(<InputErrorMessage message='test' />);
    const message = screen.getByText('test');
    expect(message).toBeInTheDocument();
  });
  it('should render with classes of className', () => {
    render(<InputErrorMessage message='test' className='bg-red-500' />);
    const inputErrorMessage = screen.getByRole('contentinfo');
    expect(inputErrorMessage).toHaveClass('bg-red-500');
  });
});
