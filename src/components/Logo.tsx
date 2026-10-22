import { Mic } from 'lucide-react';

type LogoProps = {
  size?: number;
};

export function Logo({ size = 40 }: LogoProps) {
  return (
    <div
      className="rounded-2xl bg-forest-800 flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      <Mic
        className="text-lime-300"
        strokeWidth={2.5}
        style={{ width: size * 0.5, height: size * 0.5 }}
      />
    </div>
  );
}
