type Props = {
  params: {
    slug: string;
  };
};

export default function CategoriesPage({ params }: Props) {
  const { slug } = params;
  return <div>CategoriesPage {slug}</div>;
}
