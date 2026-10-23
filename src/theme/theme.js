/**
 * @file theme.js
 * @description Centralized design system tokens, color palette, typography,
 * and reusable button/card styles for the MediNest Healthcare Platform.
 * Edit values here to quickly update the global look and feel.
 */

export const THEME_COLORS = {
  // Primary brand color (dark teal / forest green seen in header, banners, and primary cards)
  primary: '#07332F',
  primaryHover: '#0a4640',
  primaryLight: '#0d554d',

  // Secondary accent color (coral / peach seen on main CTA buttons, badges, and highlights)
  secondary: '#F7A582',
  secondaryHover: '#e8946f',
  secondaryLight: '#FFF0EC',

  // Utility colors
  dark: '#111827',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  accentPink: '#FFEDF4',
  accentPinkText: '#E11D48',
  accentGreen: '#EDFDF2',
  accentGreenText: '#16A34A',
  accentYellow: '#FEF9C3',
  accentYellowText: '#CA8A04',
  danger: '#EF4444',
  dangerHover: '#DC2626',
};

export const BUTTON_STYLES = {
  // Primary Coral/Peach CTA button (e.g., Book Appointment, View Profile, All Services)
  coral:
    'bg-[#F7A582] hover:bg-[#e8946f] active:scale-95 text-white font-medium px-6 py-2.5 rounded-lg transition-all duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',

  // Secondary Dark Green Button (e.g., Form Submit, Add Doctor, Dashboard Actions)
  teal:
    'bg-[#07332F] hover:bg-[#0a4640] active:scale-95 text-white font-medium px-6 py-2.5 rounded-lg transition-all duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',

  // Outlined Coral Button
  outlineCoral:
    'border-2 border-[#F7A582] text-[#F7A582] hover:bg-[#F7A582] hover:text-white active:scale-95 font-medium px-6 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer',

  // Outlined Teal Button
  outlineTeal:
    'border-2 border-[#07332F] text-[#07332F] hover:bg-[#07332F] hover:text-white active:scale-95 font-medium px-6 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer',

  // Danger Red Button (e.g., Delete Doctor, Remove User)
  danger:
    'bg-[#E11D48] hover:bg-[#BE123C] active:scale-95 text-white font-medium px-4 py-1.5 rounded-md text-sm transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer',

  // Minimal Small Button
  smTeal:
    'bg-[#07332F] hover:bg-[#0a4640] text-white font-medium px-4 py-1.5 rounded-md text-sm transition-all duration-200 cursor-pointer',
};

export const CARD_STYLES = {
  whiteCard:
    'bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300',
  interactiveCard:
    'bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-[#F7A582] hover:shadow-lg transition-all duration-300',
};

export default {
  colors: THEME_COLORS,
  buttons: BUTTON_STYLES,
  cards: CARD_STYLES,
};
