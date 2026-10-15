import type { ProductDimension } from '../types/allTypes';

export const formatDimensionString = (dimension: ProductDimension): string => {
  const parts: string[] = [];
  if (dimension.width) parts.push(`W: ${dimension.width}`);
  if (dimension.height) parts.push(`H: ${dimension.height}`);
  if (dimension.thickness) parts.push(`T: ${dimension.thickness}`);
  const unit = dimension.unit || 'in';

  if (dimension.width && dimension.height) {
    let base = `${dimension.width} × ${dimension.height} ${unit}`;
    if (dimension.thickness) base += ` (Thick: ${dimension.thickness} ${unit})`;
    return base;
  }

  return parts.length > 0 ? `${parts.join(' • ')} ${unit}` : 'Custom Size';
};