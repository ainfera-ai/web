type RevealProps = {
  as?: "div" | "a";
  dist?: 14 | 16 | 18;
  children?: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLElement> &
  Record<string, unknown>;

export default function Reveal({ as = "div", dist = 18, children, className, ...rest }: RevealProps) {
  const cls =
    [className, dist === 16 ? "rv-16" : dist === 14 ? "rv-14" : undefined]
      .filter(Boolean)
      .join(" ") || undefined;

  const Tag = as as React.ElementType;

  return (
    <Tag className={cls} {...rest} data-reveal="on">
      {children}
    </Tag>
  );
}
