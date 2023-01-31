import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { JSXElementConstructor, ReactElement } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { ControlledCheckbox } from '.';
import { ControlledForm } from '../controlled-form';
import { Props } from './types';

type ComponentProps = { inputProps?: Omit<Props, 'name'> };

const user = userEvent.setup();

const componentName = 'test';
const checkboxIconName = 'controlled-checkbox-hicheck';
let formMethods: UseFormReturn<any, any>;

const Component = ({ inputProps }: ComponentProps) => (
  <ControlledForm formMethods={formMethods}>
    <ControlledCheckbox name={componentName} {...inputProps} />
  </ControlledForm>
);

describe('ControlledCheckbox', () => {
  beforeEach(() => {
    formMethods = renderHook(() => useForm()).result.current;
  });

  describe('values pass in props should work', () => {
    it('should render with true value with defaultChecked', async () => {
      render(<Component inputProps={{ defaultChecked: true }} />);
      expect(formMethods.watch(componentName)).toBeTruthy();

      const hiCheck = screen.queryByRole(checkboxIconName);
      expect(hiCheck).toBeInTheDocument();
    });

    it('should render with true value with checked', async () => {
      render(<Component inputProps={{ checked: true }} />);
      expect(formMethods.watch(componentName)).toBeTruthy();

      const hiCheck = screen.queryByRole(checkboxIconName);
      expect(hiCheck).toBeInTheDocument();
    });

    it('should not be able to change the value when disabled is active', async () => {
      render(<Component inputProps={{ disabled: true }} />);
      expect(formMethods.watch(componentName)).toBeFalsy();

      const label = screen.getByRole('controlled-checkbox-label');
      await user.click(label);
      expect(formMethods.watch(componentName)).toBeFalsy();
    });
  });

  describe('check the behavior value for default and on click ', () => {
    let input: HTMLElement;
    let label: HTMLElement;
    let hiCheck: HTMLElement | null;
    let rerender: (
      ui: ReactElement<any, string | JSXElementConstructor<any>>,
    ) => void;

    beforeEach(() => {
      const renderFn = render(<Component />);
      rerender = renderFn.rerender;

      input = screen.getByRole('controlled-checkbox-input');
      label = screen.getByRole('controlled-checkbox-label');
      hiCheck = screen.queryByRole(checkboxIconName);
    });

    it('should render with false value by default', async () => {
      expect(input).toBeInTheDocument();

      expect(label).toBeInTheDocument();

      expect(hiCheck).not.toBeInTheDocument();

      expect(formMethods.watch(componentName)).toBeFalsy();
    });

    it('on clicked should render with true value', async () => {
      await user.click(label);
      expect(formMethods.watch(componentName)).toBeTruthy();

      rerender(<Component />);
      hiCheck = screen.queryByRole(checkboxIconName);
      expect(hiCheck).toBeInTheDocument();
    });

    it('on clicked twice should render with false value', async () => {
      await user.click(label);
      await user.click(label);
      expect(formMethods.watch(componentName)).toBeFalsy();

      rerender(<Component />);
      hiCheck = screen.queryByRole(checkboxIconName);
      expect(hiCheck).not.toBeInTheDocument();
    });
  });
});
