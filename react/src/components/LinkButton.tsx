import React from "react";

type Variant = "primary" | "secondary" | "danger" | "success";

type LinkButtonProps = {
  variant: Variant;
} & ({
  onClick?: never;
  href: string;
} | { 
  href?: never;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void 
})

export default function LinkButton(props: React.PropsWithChildren<LinkButtonProps>) {
  const { children, variant, href, onClick } = props;
  return (
    <a 
      href={href}
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </a>
  )
}