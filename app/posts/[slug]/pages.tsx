type Props = {
  params: {
    slug: string;
  };
};

export default function SinglePost({ params }: Props) {
  const { slug } = params;
  return <div>SinglePost {slug}</div>;
}
