/**
 * @file Button.jsx
 * @description Centralized, reusable Button component for the MediNest application.
 * Adapts across mobile, tablet, and desktop viewports with built-in accessibility.
 */

import React from 'react';
import { BUTTON_STYLES } from '../../theme/theme.js';

export default function Button({
  children,
  variant = 'coral',
  size = 'md',
  className = '',
  icon: Icon = null,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) {
  // Base classes mapped from theme
  const baseStyle = BUTTON_STYLES[variant] || BUTTON_STYLES.coral;

  // Size variations
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm sm:text-base px-5 py-2.5',
    lg: 'text-base sm:text-lg px-7 py-3',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyle} ${sizeStyles[size] || sizeStyles.md} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />
      )}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 shrink-0" />
      )}
    </button>
  );
}
