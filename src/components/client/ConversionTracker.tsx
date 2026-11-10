'use client';

import { useEffect } from 'react';
import { initConversionTracking } from '@/utils/analytics';

export default function ConversionTracker() {
  useEffect(() => initConversionTracking(), []);
  return null;
}
