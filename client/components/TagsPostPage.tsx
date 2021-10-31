import Tag from "./Tag";

function TagsPostPage({ tags }) {
  return (
    <div>
      <div className="flex items-center py-2 text-xl border-b space-x-2">
        <i className="fas fa-tags"></i>
        <span>Etiketler</span>
      </div>
      <div className="flex flex-wrap py-2">
        {tags.map((tag) => (
          <Tag key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  );
}

export default TagsPostPage;
