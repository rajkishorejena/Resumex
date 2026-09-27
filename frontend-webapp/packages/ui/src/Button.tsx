import type { ButtonHTMLAttributes } from 'react';

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = ['rf-btn', className].filter(Boolean).join(' ');
  return <button className={classes} {...props} />;
}
