import {
  // Navigation & UI
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  Home,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,

  // HVAC Specific
  Thermometer,
  Gauge,
  Wind,
  Zap,
  Settings,
  Activity,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,

  // Product Categories
  Cpu,
  Radio,
  Wifi,
  Bluetooth,
  Usb,
  Cable,

  // Actions
  Plus,
  Minus,
  Edit,
  Trash2,
  Download,
  Upload,
  Share,
  Copy,
  Eye,
  EyeOff,

  // Contact & Support
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  FileText,
  type LucideIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';

// Icon name mapping for easy reference
export const icons = {
  // Navigation & UI
  menu: Menu,
  close: X,
  search: Search,
  cart: ShoppingCart,
  user: User,
  home: Home,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  externalLink: ExternalLink,

  // HVAC Specific
  thermometer: Thermometer,
  gauge: Gauge,
  wind: Wind,
  zap: Zap,
  settings: Settings,
  activity: Activity,
  barChart: BarChart3,
  trending: TrendingUp,
  warning: AlertTriangle,
  success: CheckCircle,
  error: XCircle,
  info: Info,

  // Product Categories
  sensor: Cpu,
  transmitter: Radio,
  wireless: Wifi,
  bluetooth: Bluetooth,
  wired: Usb,
  cable: Cable,

  // Actions
  plus: Plus,
  minus: Minus,
  edit: Edit,
  delete: Trash2,
  download: Download,
  upload: Upload,
  share: Share,
  copy: Copy,
  show: Eye,
  hide: EyeOff,

  // Contact & Support
  phone: Phone,
  email: Mail,
  location: MapPin,
  clock: Clock,
  calendar: Calendar,
  document: FileText,
} as const;

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  size?: number | string;
  className?: string;
  strokeWidth?: number;
}

/**
 * Centralized Icon component for BAPI HVAC
 *
 * Uses Lucide React icons with HVAC-specific naming
 * Provides consistent sizing and styling across the app
 *
 * @example
 * <Icon name="thermometer" size={24} className="text-blue-600" />
 * <Icon name="sensor" size="lg" />
 */
export function Icon({
  name,
  size = 24,
  className,
  strokeWidth = 2,
}: IconProps) {
  const LucideIcon = icons[name] as LucideIcon;

  // Handle size presets
  const getSize = (size: number | string) => {
    if (typeof size === 'number') return size;

    const sizeMap = {
      xs: 12,
      sm: 16,
      md: 20,
      lg: 24,
      xl: 32,
      '2xl': 48,
    } as const;

    return sizeMap[size as keyof typeof sizeMap] || 24;
  };

  return (
    <LucideIcon
      size={getSize(size)}
      strokeWidth={strokeWidth}
      className={cn('', className)}
    />
  );
}

// Export individual icons for direct use when needed
export {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  Home,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Thermometer,
  Gauge,
  Wind,
  Zap,
  Settings,
  Activity,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Cpu,
  Radio,
  Wifi,
  Bluetooth,
  Usb,
  Cable,
  Plus,
  Minus,
  Edit,
  Trash2,
  Download,
  Upload,
  Share,
  Copy,
  Eye,
  EyeOff,
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  FileText,
};
