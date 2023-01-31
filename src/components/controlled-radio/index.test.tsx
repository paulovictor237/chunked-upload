import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { JSXElementConstructor, ReactElement } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { ControlledRadio } from '.';
import { ControlledForm } from '../controlled-form';
import { Props, RadioItems } from './types';

type rerenderFn = (
  ui: ReactElement<any, string | JSXElementConstructor<any>>,
) => void;
type ComponentProps = { inputProps: Omit<Props, 'name'> };

const user = userEvent.setup();

const componentName = 'test';
let formMethods: UseFormReturn<any, any>;

const items: RadioItems = [
  { text: 'text1', value: 'value1' },
  { text: 'text2', value: 'value2' },
  { text: 'text3', value: 'value3' },
];

const defaultItem = {
  text: 'text4',
  value: 'value4',
  defaultChecked: true,
};

const Component = ({ inputProps }: ComponentProps) => (
  <ControlledForm formMethods={formMethods}>
    <ControlledRadio name={componentName} {...inputProps} />
  </ControlledForm>
);

describe('ControlledRadio', () => {
  beforeEach(() => {
    formMethods = renderHook(() => useForm()).result.current;
  });
  describe('values pass in props should work', () => {
    it('should render with a custom default value', async () => {
      render(<Component inputProps={{ items: [...items, defaultItem] }} />);
      expect(formMethods.watch(componentName)).toBe('value4');
    });

    it('should clean the value when click again in the same option', async () => {
      const { rerender } = render(<Component inputProps={{ items }} />);

      const labels = screen.getAllByRole('controlled-radio-label');

      await user.click(labels[0]);
      expect(formMethods.watch(componentName)).toBe('value1');

      rerender(<Component inputProps={{ items, uncheckValue: 'valueNUll' }} />);

      await user.click(labels[0]);
      expect(formMethods.watch(componentName)).toBe('valueNUll');
    });
  });

  describe('check the default value and on click value', () => {
    let inputs: HTMLElement[];
    let labels: HTMLElement[];
    let rerender: rerenderFn;

    beforeEach(() => {
      const renderComponent = render(<Component inputProps={{ items }} />);
      rerender = renderComponent.rerender;
      labels = screen.getAllByRole('controlled-radio-label');
      inputs = screen.getAllByRole('controlled-radio-input');
    });

    it('should render an array of inputs', async () => {
      expect(inputs.length).toBe(3);
      expect(labels.length).toBe(3);
    });

    it('should render with null value by default', async () => {
      expect(formMethods.watch(componentName)).toBeNull();
    });

    it('should change the value when click in the label', async () => {
      await user.click(labels[0]);
      expect(formMethods.watch(componentName)).toBe(items[0].value);

      await user.click(labels[1]);
      expect(formMethods.watch(componentName)).toBe(items[1].value);

      await user.click(labels[2]);
      expect(formMethods.watch(componentName)).toBe(items[2].value);
    });

    it('should not clean the value when click again in the same option', async () => {
      await user.click(labels[0]);
      expect(formMethods.watch(componentName)).toBe('value1');

      rerender(<Component inputProps={{ items }} />);

      await user.click(labels[0]);
      expect(formMethods.watch(componentName)).toBe('value1');
    });
  });
});
