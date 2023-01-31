import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '.';

describe('Input', () => {
  it("should be able to type when input isn't disabled", async () => {
    const user = userEvent.setup();
    render(<Input name='input' placeholder='input' />);
    const input = screen.getByPlaceholderText('input');

    await user.type(input, 'test');
    const inputValue = screen.getByDisplayValue('test');

    expect(input).toHaveValue('test');
    expect(inputValue).toBeInTheDocument();
  });

  it('should not be able to type when input is disabled', async () => {
    const user = userEvent.setup();
    render(<Input name='input' label='input' disabled />);
    const input = screen.getByLabelText('input');

    await user.type(input, 'test');
    const inputValue = screen.queryByDisplayValue('test');
    const inputContainer = screen.queryByRole('input-container');

    expect(input).toBeDisabled();
    expect(input).toHaveValue('');
    expect(input).toHaveAttribute('disabled');
    expect(inputValue).not.toBeInTheDocument();
    expect(inputContainer).toHaveClass('bg-gray-200 pointer-events-none');
  });
  it('should be able to render label', () => {
    render(<Input name='input' label='Email' />);
    const label = screen.getByLabelText('Email');
    expect(label).toBeInTheDocument();
  });
  it('should be able to toggle password mode visualization', async () => {
    const user = userEvent.setup();
    render(<Input name='input' label='input' type='password' />);

    const input = screen.getByLabelText('input');
    const button = screen.getByRole('password-button');
    const iconEyeOpen = screen.queryByRole('icon-eye-open');
    const iconEyeOff = screen.queryByRole('icon-eye-off');

    expect(input).toHaveAttribute('type', 'password');
    expect(iconEyeOpen).toBeInTheDocument();
    expect(iconEyeOff).not.toBeInTheDocument();

    await user.click(button);
    const iconEyeOff2 = screen.queryByRole('icon-eye-off');

    expect(input).toHaveAttribute('type', 'text');
    expect(iconEyeOpen).not.toBeInTheDocument();
    expect(iconEyeOff2).toBeInTheDocument();
  });
  it.todo('should be able to render icons before and after the input');
});
