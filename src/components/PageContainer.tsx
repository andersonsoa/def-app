type Props = {
  children: React.ReactNode;
};

export function PageContainer(props: Props) {
  return <div className="bg-zinc-100 w-full p-4 rounded">{props.children}</div>;
}
