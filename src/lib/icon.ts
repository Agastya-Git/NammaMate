import {
  Bus,
  ShoppingBag,
  Stethoscope,
  GraduationCap,
  Sparkles,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Bus,
  ShoppingBag,
  Stethoscope,
  GraduationCap,
  Sparkles,
  MessageCircle,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? MessageCircle;
}
