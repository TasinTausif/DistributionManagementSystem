import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../components/common/Button';

describe('Button Component', () => {
    it('renders correctly with children', () => {
        render(<Button>Click Me</Button>);
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('calls onClick handler when clicked', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click Me</Button>);
        const button = screen.getByText('Click Me');
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('displays loading spinner when loading is true', () => {
        const { container } = render(<Button loading>Loading...</Button>);
        // Look for spinner by class (fa-spinner) or by checking if disabled
        expect(container.querySelector('.spin')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('applies correct variant class', () => {
        const { container } = render(<Button variant="danger">Delete</Button>);
        expect(container.querySelector('.btn-danger')).toBeInTheDocument();
    });
});
