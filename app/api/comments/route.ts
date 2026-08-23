import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'forum-portfolio';
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '';
const FIRESTORE_BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

// Helper sanitize string (strip HTML tags)
function sanitizeText(input: string): string {
    return input.replace(/<[^>]*>?/gm, '').trim();
}

// Helper untuk format komentar dari struktur Firestore REST API
function parseFirestoreDoc(doc: any) {
    if (!doc || !doc.fields) return null;
    const id = doc.name ? doc.name.split('/').pop() : '';
    return {
        id,
        name: doc.fields.name?.stringValue || 'Anonymous',
        userId: doc.fields.userId?.stringValue || '',
        userImage: doc.fields.userImage?.stringValue || '',
        message: doc.fields.message?.stringValue || '',
        createdAt: doc.fields.createdAt?.timestampValue || doc.createTime || new Date().toISOString(),
    };
}

// GET: Ambil daftar komentar (urut berdasarkan tanggal terbaru)
export async function GET() {
    try {
        const queryUrl = `${FIRESTORE_BASE_URL}:runQuery?key=${API_KEY}`;
        const queryBody = {
            structuredQuery: {
                from: [{ collectionId: 'comments' }],
                orderBy: [
                    {
                        field: { fieldPath: 'createdAt' },
                        direction: 'DESCENDING',
                    },
                ],
                limit: 100,
            },
        };

        const res = await fetch(queryUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(queryBody),
            cache: 'no-store',
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('Firestore GET Error:', res.status, errorText);
            return NextResponse.json({ error: 'Failed to fetch comments' }, { status: res.status });
        }

        const data = await res.json();
        const comments = (Array.isArray(data) ? data : [])
            .filter((item: any) => item && item.document)
            .map((item: any) => parseFirestoreDoc(item.document))
            .filter(Boolean);

        return NextResponse.json({ comments }, {
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            },
        });
    } catch (err: any) {
        console.error('Comments GET Handler Error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST: Tambah komentar baru
export async function POST(req: NextRequest) {
    try {
        const clientIp = getClientIp(req);
        const { allowed, retryAfter } = checkRateLimit(`comments-${clientIp}`, 5, 30000);
        if (!allowed) {
            return NextResponse.json(
                { error: `Too many comments sent. Please wait ${retryAfter || 30} seconds.` },
                { status: 429, headers: { 'Retry-After': String(retryAfter || 30) } }
            );
        }

        const authHeader = req.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized: Missing authentication token' }, { status: 401 });
        }

        const body = await req.json();
        const { message, name, userImage, userId } = body;

        const cleanMessage = typeof message === 'string' ? sanitizeText(message) : '';
        const cleanName = typeof name === 'string' ? sanitizeText(name) : 'User';

        if (!cleanMessage) {
            return NextResponse.json({ error: 'Message cannot be empty' }, { status: 400 });
        }

        if (cleanMessage.length > 500) {
            return NextResponse.json({ error: 'Message exceeds maximum length (500 chars)' }, { status: 400 });
        }

        const createUrl = `${FIRESTORE_BASE_URL}/comments?key=${API_KEY}`;
        const firestorePayload = {
            fields: {
                userId: { stringValue: userId || '' },
                name: { stringValue: cleanName || 'User' },
                userImage: { stringValue: userImage || '' },
                message: { stringValue: cleanMessage },
                createdAt: { timestampValue: new Date().toISOString() },
            },
        };

        const res = await fetch(createUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader,
            },
            body: JSON.stringify(firestorePayload),
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('Firestore POST Error:', res.status, errorText);
            return NextResponse.json({ error: 'Failed to post comment' }, { status: res.status });
        }

        const createdDoc = await res.json();
        const comment = parseFirestoreDoc(createdDoc);

        return NextResponse.json({ success: true, comment }, { status: 201 });
    } catch (err: any) {
        console.error('Comments POST Handler Error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE: Hapus komentar
export async function DELETE(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized: Missing authentication token' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const commentId = searchParams.get('id');

        if (!commentId) {
            return NextResponse.json({ error: 'Missing comment ID' }, { status: 400 });
        }

        const deleteUrl = `${FIRESTORE_BASE_URL}/comments/${commentId}?key=${API_KEY}`;

        const res = await fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': authHeader,
            },
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('Firestore DELETE Error:', res.status, errorText);
            return NextResponse.json({ error: 'Failed to delete comment' }, { status: res.status });
        }

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error('Comments DELETE Handler Error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
