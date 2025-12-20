'use client';

import { useCallback, useEffect, useState } from 'react';
import { getPostById, getPosts } from '../services/post.service';
import { ApiPost } from '../types';

export function usePosts() {
    const [posts, setPosts] = useState<ApiPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getPosts();
            setPosts(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return { posts, loading, error, refetch: fetchPosts };
}

export function usePost(id: number) {
    const [post, setPost] = useState<ApiPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPost() {
            setLoading(true);
            setError(null);
            try {
                const data = await getPostById(id);
                setPost(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch post');
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            fetchPost();
        }
    }, [id]);

    return { post, loading, error };
}
