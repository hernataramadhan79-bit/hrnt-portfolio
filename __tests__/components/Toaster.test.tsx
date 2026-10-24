import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import Toaster, { toast } from '@/components/ui/Toaster';

describe('Toaster', () => {
  it('announces a toast in a polite live region', () => {
    render(<Toaster />);
    act(() => toast('Message posted', 'success'));
    expect(screen.getByRole('status')).toHaveTextContent('Message posted');
  });

  it('keeps at most three toasts, newest first', () => {
    render(<Toaster />);
    act(() => {
      ['one', 'two', 'three', 'four'].forEach((m) => toast(m));
    });
    const items = screen.getAllByRole('listitem').map((li) => li.textContent);
    expect(items.slice(0, 3)).toEqual(['four', 'three', 'two']);
    expect(screen.queryByText('one')).toBeNull();
  });
});
