import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '@/components/Footer';

describe('Footer Component', () => {
  const mockOnNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders HRNT logo, copyright, and identity elements', () => {
    render(<Footer onNavigate={mockOnNavigate} />);

    expect(screen.getByText('HRNT')).toBeInTheDocument();
    expect(screen.getByText('Full-Stack Engineer')).toBeInTheDocument();
    expect(screen.getByText(/Hernata Ramadhan/)).toBeInTheDocument();
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
  });

  it('renders essential social channels and back to top action', () => {
    render(<Footer onNavigate={mockOnNavigate} />);

    expect(screen.getByLabelText('GitHub')).toHaveAttribute('href', 'https://github.com/hernataramadhan79-bit');
    expect(screen.getByLabelText('LinkedIn')).toHaveAttribute('href', 'https://www.linkedin.com/in/hernata-ramadhan-614725350/');
    expect(screen.getByLabelText('Email')).toHaveAttribute('href', 'mailto:hernataramadhan79@gmail.com');
    expect(screen.getByLabelText('Scroll to top')).toBeInTheDocument();
  });

  it('triggers navigation to dashboard and scroll when HRNT logo is clicked', () => {
    render(<Footer onNavigate={mockOnNavigate} />);

    const logoBtn = screen.getByLabelText('Back to dashboard');
    fireEvent.click(logoBtn);

    expect(mockOnNavigate).toHaveBeenCalledWith('dashboard');
  });
});
