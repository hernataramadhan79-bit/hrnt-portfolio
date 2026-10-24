import React from 'react';
import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ModalShell from '@/components/ui/ModalShell';

beforeAll(() => {
  // jsdom has no matchMedia; report a desktop viewport
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});

describe('ModalShell', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = '';
  });

  function renderShell() {
    return render(
      <ModalShell labelledBy="sheet-title" onClose={onClose} maxWidthClass="max-w-xl">
        <h2 id="sheet-title">Velco</h2>
        <a href="#first">First link</a>
        <a href="#last">Last link</a>
      </ModalShell>
    );
  }

  it('renders an accessible modal dialog named by its title', () => {
    renderShell();
    expect(screen.getByRole('dialog', { name: 'Velco' })).toHaveAttribute('aria-modal', 'true');
  });

  it('moves focus to the close button and locks page scroll while open', () => {
    renderShell();
    expect(screen.getByRole('button', { name: 'Close modal' })).toHaveFocus();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('closes on Escape and on the close button', () => {
    renderShell();
    fireEvent.keyDown(window, { key: 'Escape' });
    fireEvent.click(screen.getByRole('button', { name: 'Close modal' }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('keeps Tab inside the sheet', () => {
    renderShell();
    const last = screen.getByRole('link', { name: 'Last link' });
    last.focus();
    fireEvent.keyDown(window, { key: 'Tab' });
    expect(screen.getByRole('button', { name: 'Close modal' })).toHaveFocus();
  });

  it('gives focus back to the opener and unlocks scroll on unmount', () => {
    const opener = document.createElement('button');
    document.body.appendChild(opener);
    opener.focus();

    const { unmount } = renderShell();
    unmount();

    expect(opener).toHaveFocus();
    expect(document.body.style.overflow).toBe('');
    opener.remove();
  });
});
