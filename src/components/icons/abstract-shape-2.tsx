import type { SVGProps } from 'react';

export default function AbstractShape2(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 200C0 89.5431 89.5431 0 200 0V0C310.457 0 400 89.5431 400 200V400H0V200Z"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path
        d="M400 200C400 310.457 310.457 400 200 400V400C89.5431 400 0 310.457 0 200V0H400V200Z"
        fill="currentColor"
        fillOpacity="0.05"
      />
    </svg>
  );
}
