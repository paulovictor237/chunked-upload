import { render, screen } from '@testing-library/react';
import { RouterWrapper } from 'app/tests/wrappers';
import { Select } from '.';
import { i18n } from './i18n';

describe('Select', () => {
  const options = [
    {
      label: 'Option 1',
      value: 'option-1',
    },
    {
      label: 'Option 2',
      value: 'option-2',
    },
  ];
  it.todo('should render correctly with any option');
  it('should render correctly without option', async () => {
    render(<Select options={[]} />, {
      wrapper: RouterWrapper,
    });
    const { placeholder } = i18n.pt;
    const optionsText = screen.queryByText(placeholder);
    expect(optionsText).toBeInTheDocument();
  });
  it('should be able to render label', () => {
    render(<Select options={options} label='My Label' />, {
      wrapper: RouterWrapper,
    });
    const label = screen.getByText('My Label');
    expect(label).toBeInTheDocument();
  });
  it.todo('should be able to render disabled');
});
