import React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '../../lib/utils';

export default function Label({ className, ...props }) {
  return (
    <LabelPrimitive.Root
      className={cn(
        'text-sm font-medium text-black leading-none peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  );
}
