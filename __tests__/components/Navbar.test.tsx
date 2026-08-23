import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Navbar from '@/components/Navbar';

describe('Navbar Component', () => {
  const mockSetActiveTab = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the intact HRNT brand logo', () => {
    render(<Navbar activeTab="home" setActiveTab={mockSetActiveTab} />);
    const logoText = screen.getByText('HRNT');
    expect(logoText).toBeInTheDocument();
    expect(screen.getByLabelText('Go to home')).toBeInTheDocument();
  });

  it('renders all desktop navigation items and forum button', () => {
    render(<Navbar activeTab="home" setActiveTab={mockSetActiveTab} />);
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
    
    // Check navigation links
    const expectedItems = ['Home', 'Skills', 'Projects', 'Services', 'Experience', 'Stats', 'Contact'];
    expectedItems.forEach((label) => {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    });

    // Check Forum button
    expect(screen.getByLabelText('Open forum')).toBeInTheDocument();
  });

  it('handles navigation item click and dispatches custom event', () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    render(<Navbar activeTab="home" setActiveTab={mockSetActiveTab} />);

    const projectsButton = screen.getByRole('link', { name: /projects/i });
    fireEvent.click(projectsButton);

    expect(mockSetActiveTab).toHaveBeenCalledWith('projects');
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('toggles mobile navigation drawer open and closes with close button', async () => {
    render(<Navbar activeTab="home" setActiveTab={mockSetActiveTab} />);
    
    const menuToggle = screen.getByLabelText('Open navigation menu');
    expect(menuToggle).toBeInTheDocument();

    fireEvent.click(menuToggle);

    // Dialog is open
    const mobileMenu = screen.getByRole('dialog', { name: /navigation menu/i });
    expect(mobileMenu).toBeInTheDocument();

    // Close button
    const closeButtons = screen.getAllByLabelText('Close navigation menu');
    fireEvent.click(closeButtons[0]);

    // Body overflow is reset
    expect(document.body.style.overflow).toBe('');
  });

  it('closes mobile navigation drawer on Escape key press', async () => {
    render(<Navbar activeTab="home" setActiveTab={mockSetActiveTab} />);
    
    const menuToggle = screen.getByLabelText('Open navigation menu');
    fireEvent.click(menuToggle);

    expect(screen.getByRole('dialog', { name: /navigation menu/i })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('');
    });
  });

  it('navigates to tab and closes mobile menu when an item is clicked in mobile drawer', async () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    render(<Navbar activeTab="home" setActiveTab={mockSetActiveTab} />);
    
    // Open mobile menu
    const menuToggle = screen.getByLabelText('Open navigation menu');
    fireEvent.click(menuToggle);

    const mobileNav = screen.getByRole('navigation', { name: /mobile navigation/i });
    expect(mobileNav).toBeInTheDocument();

    // Click on Contact in mobile menu
    const contactLinks = screen.getAllByRole('link', { name: /contact/i });
    const mobileContactLink = contactLinks[contactLinks.length - 1];
    fireEvent.click(mobileContactLink);

    expect(mockSetActiveTab).toHaveBeenCalledWith('contact');
    expect(dispatchSpy).toHaveBeenCalled();
    expect(document.body.style.overflow).toBe('');
  });
});

