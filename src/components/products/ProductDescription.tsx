interface ProductDescriptionProps {
  title?: string;
  description: string;
}

export default function ProductDescription({
  title = 'Product Description',
  description,
}: ProductDescriptionProps) {
  if (!description) return null;

  return (
    <div className="mt-16 border-t pt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div
        className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
