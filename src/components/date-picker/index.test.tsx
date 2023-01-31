import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterWrapper } from 'app/tests/wrappers';
import { DatePicker } from '.';
import { i18n } from './i18n';

describe('DatePicker', () => {
  it('should be able to choose any date', async () => {
    const user = userEvent.setup();
    const dateValue = '2022-12-12';
    const onChange = jest.fn();
    render(<DatePicker onChange={onChange} />, {
      wrapper: RouterWrapper,
    });
    const { placeholder } = i18n.pt;
    const dateInput = screen.getByPlaceholderText(placeholder);
    await user.type(dateInput, dateValue);
    expect(onChange).toHaveBeenCalled();
    expect(dateInput).toHaveValue(dateValue);
  });
  it('should be able to choose any hour', async () => {
    const user = userEvent.setup();
    const dateWithHourValue = '2022-12-12 12:12';
    const onChange = jest.fn();
    render(<DatePicker onChange={onChange} />, {
      wrapper: RouterWrapper,
    });
    const { placeholder } = i18n.pt;
    const dateInput = screen.getByPlaceholderText(placeholder);
    await user.type(dateInput, dateWithHourValue);
    expect(onChange).toHaveBeenCalled();
    expect(dateInput).toHaveValue(dateWithHourValue);
  });

  it.todo("shouldn't be able to choose any past date");

  it.todo("shouldn't be able to choose any past hour");
  it.todo(
    'shouldn\'t be able to choose any date and hour out of "2022-20-10 12:00:00" and "2022-20-11 10:00:00"',
  );
  it.todo('should be able to format date and hour');
  it.todo(
    'should be able to see datepiker on Portuguese, English and Spanish locales',
  );
});
