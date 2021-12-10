interface TableProps extends React.PropsWithChildren<{}> {}
export function Table(props: TableProps) {
  return <div>{props.children}</div>;
}
