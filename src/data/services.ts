import { GraduationCap, Presentation, Lightbulb, Code2, type LucideIcon } from 'lucide-react';

export interface Service {
  key: 'mentoring' | 'training' | 'consulting' | 'development';
  icon: LucideIcon;
}

export const services: Service[] = [
  { key: 'mentoring', icon: GraduationCap },
  { key: 'training', icon: Presentation },
  { key: 'consulting', icon: Lightbulb },
  { key: 'development', icon: Code2 },
];
