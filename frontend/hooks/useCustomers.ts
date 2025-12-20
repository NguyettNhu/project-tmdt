'use client';

import { useCallback, useEffect, useState } from 'react';
import { getCustomers } from '../services/customer.service';
import { ApiCustomer } from '../types';

export function useCustomers() {
    const [customers, setCustomers] = useState<ApiCustomer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCustomers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getCustomers();
            setCustomers(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch customers');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    return { customers, loading, error, refetch: fetchCustomers };
}
