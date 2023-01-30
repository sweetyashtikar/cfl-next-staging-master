import NextLink from 'next/link';

export default function Link({ href, children, ...props }: any) {
  return href ? (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  ) : (
    <a {...props}>{children}</a>
  );
}
