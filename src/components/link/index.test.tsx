import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  createRouterWrapperProviderValues,
  RouterWrapper,
  Wrapper,
} from 'app/tests/wrappers';
import { Link } from '.';

describe('Link', () => {
  it('should be able to use any style mode', () => {
    render(
      <>
        <Link href='/my-link'>Primary</Link>
        <Link href='/my-link-secondary' mode='secondary'>
          Secondary
        </Link>
        <Link href='/my-link-tertiary' mode='tertiary'>
          Tertiary
        </Link>
      </>,
      {
        wrapper: RouterWrapper,
      },
    );
    const linkElement = screen.getByText('Primary');
    const linkElementSecondary = screen.getByText('Secondary');
    const linkElementTertiary = screen.getByText('Tertiary');

    expect(linkElement).toHaveClass('text-white bg-orange-500');
    expect(linkElement).toHaveAttribute('href', '/my-link');

    expect(linkElementSecondary).toHaveClass('text-orange-500 bg-transparent');
    expect(linkElementSecondary).toHaveAttribute('href', '/my-link-secondary');

    expect(linkElementTertiary).toHaveClass('underline text-orange-500');
    expect(linkElementTertiary).toHaveAttribute('href', '/my-link-tertiary');
  });
  it('should render primary mode as default style', () => {
    render(<Link href='/my-link'>My Link</Link>, {
      wrapper: RouterWrapper,
    });
    const linkElement = screen.getByRole('link');

    expect(linkElement).toHaveClass('text-white bg-orange-500');
    expect(linkElement).toHaveAttribute('href', '/my-link');
  });
  it('should render class "opacity-20" when disabled', () => {
    render(
      <Link href='/my-link' disabled>
        My Link
      </Link>,
      {
        wrapper: RouterWrapper,
      },
    );
    const linkElement = screen.getByRole('link');

    expect(linkElement).toHaveClass('opacity-20');
    expect(linkElement).toHaveAttribute('href', '/my-link');
  });
  it.todo('should render active class when active');
  it('should be able to navigate', async () => {
    const contextValues = createRouterWrapperProviderValues();
    render(<Link href='/my-link'>My Link</Link>, {
      wrapper: (props) => (
        <Wrapper {...props} routerWrapperContextValues={contextValues} />
      ),
    });
    const linkElement = screen.getByRole('link');

    await waitFor(() => {
      userEvent.click(linkElement);
      expect(contextValues.push).toHaveBeenCalledWith(
        '/my-link',
        '/my-link',
        {},
      );
    });
  });
});
