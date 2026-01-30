interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: Props) {
  const { id } = await params;
  return <p>edit invoice with id: {id}</p>;
}
