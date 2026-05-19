"use client";

import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from '@/components/admin/ProductCard';

interface Product {
  id: string;
  name?: string;
  composition?: string;
  description?: string | null;
  [key: string]: any;
}

interface Division {
  id: string;
  name: string;
  description?: string;
  // Note: we no longer rely on preloaded products here; they'll be fetched lazily.
}

interface Props {
  divisions: Division[];
}

const PAGE_SIZE = 6; // products per page per division

export default function ProductListClient({ divisions }: Props) {
  const [pageMap, setPageMap] = useState<Record<string, number>>({}); // divisionId -> current page
  const [dataMap, setDataMap] = useState<Record<string, { products: Product[]; total: number; loading: boolean }>>({});

  const fetchProducts = useCallback(async (divisionId: string, page: number) => {
    setDataMap(prev => ({
      ...prev,
      [divisionId]: { ...(prev[divisionId] || { products: [], total: 0, loading: true }), loading: true },
    }));
    try {
      const res = await fetch(`/api/divisions/${divisionId}/products?page=${page}&pageSize=${PAGE_SIZE}`);
      const json = await res.json();
      setDataMap(prev => ({
        ...prev,
        [divisionId]: { products: json.products || [], total: json.total || 0, loading: false },
      }));
    } catch (e) {
      console.error('Error loading products for division', divisionId, e);
      setDataMap(prev => ({
        ...prev,
        [divisionId]: { ...(prev[divisionId] || { products: [], total: 0, loading: false }), loading: false },
      }));
    }
  }, []);


  // Load products whenever a division's page changes
  useEffect(() => {
    divisions.forEach(div => {
      const page = pageMap[div.id] ?? 0;
      fetchProducts(div.id, page);
    });
  }, [divisions, pageMap, fetchProducts]);

  const handleNext = (divisionId: string, total: number) => {
    setPageMap(prev => {
      const next = (prev[divisionId] ?? 0) + 1;
      const max = Math.floor((total - 1) / PAGE_SIZE);
      return next > max ? prev : { ...prev, [divisionId]: next };
    });
  };

  const handlePrev = (divisionId: string) => {
    setPageMap(prev => {
      const prevPage = (prev[divisionId] ?? 0) - 1;
      return prevPage < 0 ? prev : { ...prev, [divisionId]: prevPage };
    });
  };

  return (
    <div className="space-y-8">
      {divisions.map(division => {
        const currentPage = pageMap[division.id] ?? 0;
        const { products = [], total = 0, loading = false } = dataMap[division.id] || {};
        const totalPages = Math.ceil(total / PAGE_SIZE);
        return (
          <div key={division.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold font-sora text-brand-navy">{division.name} Division</h2>
                <p className="text-sm text-gray-500 mt-1">{division.description || 'No description provided'}</p>
              </div>
            </div>
            <div className="p-6">
              {loading ? (
                <p className="text-gray-500">Loading...</p>
              ) : total === 0 ? (
                <p className="text-gray-400 text-sm italic">No products in this division yet.</p>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map(p => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-4 gap-4">
                      <button
                        onClick={() => handlePrev(division.id)}
                        disabled={currentPage === 0}
                        className="px-4 py-2 bg-brand-blue text-white rounded disabled:opacity-50"
                      >
                        Prev
                      </button>
                      <span className="text-sm text-brand-navy">
                        Page {currentPage + 1} of {totalPages}
                      </span>
                      <button
                        onClick={() => handleNext(division.id, total)}
                        disabled={currentPage + 1 >= totalPages}
                        className="px-4 py-2 bg-brand-blue text-white rounded disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
