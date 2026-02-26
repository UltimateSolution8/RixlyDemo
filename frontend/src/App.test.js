import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

// Mock framer-motion to avoid animation related test issues
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }) => <div {...props}>{children}</div>,
        h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
        h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
        p: ({ children, ...props }) => <p {...props}>{children}</p>,
        section: ({ children, ...props }) => <section {...props}>{children}</section>,
        nav: ({ children, ...props }) => <nav {...props}>{children}</nav>,
        button: ({ children, ...props }) => <button {...props}>{children}</button>,
    },
    AnimatePresence: ({ children }) => children,
}));

test('renders hero section title', () => {
    render(<App />);
    const linkElement = screen.getByText(/Turn Visitors Into/i);
    expect(linkElement).toBeInTheDocument();
});

test('renders FAQ section', () => {
    render(<App />);
    const faqTitle = screen.getByText(/Frequently Asked Questions/i);
    expect(faqTitle).toBeInTheDocument();
});

test('renders pricing section', () => {
    render(<App />);
    const pricingTitle = screen.getByText(/Simple, Transparent Pricing/i);
    expect(pricingTitle).toBeInTheDocument();
});
