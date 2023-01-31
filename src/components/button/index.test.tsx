import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '.';

describe('Button', () => {
  it('should render any "mode"', () => {
    render(
      <>
        <Button mode='primary'>Button Primary</Button>
        <Button mode='secondary'>Button Secondary</Button>
        <Button mode='tertiary'>Button Tertiary</Button>
      </>,
    );

    const button = screen.getByText('Button Primary');
    const buttonSecondary = screen.getByText('Button Secondary');
    const buttonTertiary = screen.getByText('Button Tertiary');

    expect(button).toHaveClass('text-white bg-orange-500');
    expect(buttonSecondary).toHaveClass('text-orange-500 bg-transparent');
    expect(buttonTertiary).toHaveClass(
      'underline text-orange-500 bg-transparent',
    );
  });
  it('should render disabled button with class "opacity-20"', () => {
    render(<Button disabled />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('opacity-20');
  });
  it('should have called function when click on button', async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} />);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });
  it('should render "primary" as default mode button', () => {
    render(<Button />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-white bg-orange-500');
  });
});
