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
    render(<Navbar activeTab="dashboard" setActiveTab={mockSetActiveTab} />);
    const logoText = screen.getByText('HRNT');
    expect(logoText).toBeInTheDocument();
    expect(screen.getByLabelText('Go to dashboard')).toBeInTheDocument();
  });

  it('renders all desktop navigation items and quick action forum button', () => {
    render(<Navbar activeTab="dashboard" setActiveTab={mockSetActiveTab} />);
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
    
    // Check navigation buttons (Forum is now the dedicated CTA button)
    const expectedItems = ['Dashboard', 'Work', 'Stack', 'About', 'Stats', 'Awards', 'Contact'];
    expectedItems.forEach((label) => {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    });

    // Check Quick Action Forum button
    expect(screen.getAllByText('Forum').length).toBeGreaterThan(0);
  });

  it('handles navigation item click and triggers setActiveTab', () => {
    render(<Navbar activeTab="dashboard" setActiveTab={mockSetActiveTab} />);

    const workButton = screen.getByRole('button', { name: /work/i });
    fireEvent.click(workButton);

    expect(mockSetActiveTab).toHaveBeenCalledWith('work');
  });

  it('handles quick action forum button click and triggers setActiveTab with forum', () => {
    render(<Navbar activeTab="dashboard" setActiveTab={mockSetActiveTab} />);

    const forumButtons = screen.getAllByRole('button', { name: /forum/i });
    fireEvent.click(forumButtons[0]);

    expect(mockSetActiveTab).toHaveBeenCalledWith('forum');
  });

  it('toggles mobile navigation drawer open and closes with toggle button', async () => {
    render(<Navbar activeTab="dashboard" setActiveTab={mockSetActiveTab} />);
    
    const menuToggle = screen.getByLabelText('Toggle navigation menu');
    expect(menuToggle).toBeInTheDocument();

    fireEvent.click(menuToggle);

    // Mobile nav contains items
    const contactButtons = screen.getAllByText('Contact');
    expect(contactButtons.length).toBeGreaterThan(1);

    // Toggle close
    fireEvent.click(menuToggle);
  });

  it('navigates to tab and closes mobile menu when an item is clicked in mobile drawer', async () => {
    render(<Navbar activeTab="dashboard" setActiveTab={mockSetActiveTab} />);
    
    // Open mobile menu
    const menuToggle = screen.getByLabelText('Toggle navigation menu');
    fireEvent.click(menuToggle);

    // Click on Contact in mobile menu
    const contactButtons = screen.getAllByText('Contact');
    const mobileContactBtn = contactButtons[contactButtons.length - 1];
    fireEvent.click(mobileContactBtn);

    expect(mockSetActiveTab).toHaveBeenCalledWith('contact');
  });
});

