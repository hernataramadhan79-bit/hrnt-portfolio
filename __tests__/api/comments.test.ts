import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET, POST, DELETE } from '@/app/api/comments/route';
import { NextRequest } from 'next/server';

describe('/api/comments API Route', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('GET returns parsed comments list from Firestore REST API', async () => {
        const mockFirestoreResponse = [
            {
                document: {
                    name: 'projects/forum-portfolio/databases/(default)/documents/comments/doc123',
                    fields: {
                        name: { stringValue: 'John Doe' },
                        userId: { stringValue: 'user1' },
                        userImage: { stringValue: 'https://example.com/avatar.png' },
                        message: { stringValue: 'Hello world!' },
                        createdAt: { timestampValue: '2026-01-01T00:00:00Z' },
                    },
                },
            },
        ];

        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => mockFirestoreResponse,
        } as any);

        const response = await GET();
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.comments).toHaveLength(1);
        expect(data.comments[0]).toEqual({
            id: 'doc123',
            name: 'John Doe',
            userId: 'user1',
            userImage: 'https://example.com/avatar.png',
            message: 'Hello world!',
            createdAt: '2026-01-01T00:00:00Z',
        });
    });

    it('POST rejects requests without authorization token', async () => {
        const req = new NextRequest('http://localhost:3000/api/comments', {
            method: 'POST',
            body: JSON.stringify({ message: 'Hello' }),
        });

        const response = await POST(req);
        const data = await response.json();

        expect(response.status).toBe(401);
        expect(data.error).toContain('Missing authentication token');
    });

    it('POST validates empty message', async () => {
        const req = new NextRequest('http://localhost:3000/api/comments', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer valid-token',
            },
            body: JSON.stringify({ message: '   ' }),
        });

        const response = await POST(req);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.error).toContain('cannot be empty');
    });

    it('POST successfully forwards to Firestore with Authorization header', async () => {
        const mockCreatedDoc = {
            name: 'projects/forum-portfolio/databases/(default)/documents/comments/newDoc456',
            fields: {
                name: { stringValue: 'Alice' },
                userId: { stringValue: 'user2' },
                userImage: { stringValue: '' },
                message: { stringValue: 'Great portfolio!' },
                createdAt: { timestampValue: '2026-01-02T00:00:00Z' },
            },
        };

        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => mockCreatedDoc,
        } as any);

        const req = new NextRequest('http://localhost:3000/api/comments', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer sample-auth-token',
            },
            body: JSON.stringify({
                userId: 'user2',
                name: 'Alice',
                message: 'Great portfolio!',
            }),
        });

        const response = await POST(req);
        const data = await response.json();

        expect(response.status).toBe(201);
        expect(data.success).toBe(true);
        expect(data.comment.id).toBe('newDoc456');
        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/comments?key='),
            expect.objectContaining({
                headers: expect.objectContaining({
                    Authorization: 'Bearer sample-auth-token',
                }),
            })
        );
    });

    it('DELETE rejects requests without authorization token', async () => {
        const req = new NextRequest('http://localhost:3000/api/comments?id=doc123', {
            method: 'DELETE',
        });

        const response = await DELETE(req);
        const data = await response.json();

        expect(response.status).toBe(401);
    });

    it('DELETE successfully forwards delete request to Firestore', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => ({}),
        } as any);

        const req = new NextRequest('http://localhost:3000/api/comments?id=doc123', {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer sample-auth-token',
            },
        });

        const response = await DELETE(req);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/comments/doc123?key='),
            expect.objectContaining({
                method: 'DELETE',
                headers: expect.objectContaining({
                    Authorization: 'Bearer sample-auth-token',
                }),
            })
        );
    });
});
