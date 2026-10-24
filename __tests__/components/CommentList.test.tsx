import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

vi.mock('@/lib/firebase', () => ({ auth: { currentUser: null } }));

import CommentList from '@/sections/Forum/CommentList';
import type { OutgoingComment } from '@/sections/Forum';

const existing = {
  id: 'c1',
  name: 'Adrian',
  userId: 'u2',
  userImage: '',
  message: 'Hello there',
  createdAt: '2026-09-06T08:56:00Z',
};

const outgoing: OutgoingComment = {
  tempId: 'out-1',
  userId: 'u1',
  name: 'Hernata',
  userImage: '',
  message: 'Fresh message',
  phase: 'landed',
};

function mockComments(comments: unknown[]) {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ comments }),
  }) as unknown as typeof fetch;
}

describe('CommentList outgoing hand-off', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows a just-posted message at the top before the server copy arrives', async () => {
    mockComments([existing]);
    render(<CommentList currentUserId="u1" outgoing={outgoing} onOutgoingSettled={vi.fn()} />);

    await waitFor(() => expect(screen.getByText('Hello there')).toBeInTheDocument());
    const messages = screen.getAllByText(/Fresh message|Hello there/).map((p) => p.textContent);
    expect(messages).toEqual(['Fresh message', 'Hello there']);
    // no delete control on a message that has no server id yet
    expect(screen.queryByRole('button', { name: 'Delete message' })).toBeNull();
  });

  it('settles once the refreshed thread contains the same message, without showing it twice', async () => {
    mockComments([{ ...existing, id: 'c2', userId: 'u1', name: 'Hernata', message: 'Fresh message' }, existing]);
    const onSettled = vi.fn();
    render(<CommentList currentUserId="u1" outgoing={outgoing} onOutgoingSettled={onSettled} />);

    await waitFor(() => expect(onSettled).toHaveBeenCalled());
    expect(screen.getAllByText('Fresh message')).toHaveLength(1);
  });
});
