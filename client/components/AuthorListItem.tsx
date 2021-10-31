function AuthorListItem({ author, index }) {
  index++;
  return (
    <div className="relative flex border-2 rounded-lg justify-center px-4 py-2 mx-3 my-3 items-center">
      <img
        className="h-10 w-10 rounded-full"
        src={author.image}
        alt={author.name}
      />
      <div className="ml-4">
        <p className="text-gray-800 text-sm font-semibold whitespace-nowrap">
          {author.name}
        </p>
        <p className="text-gray-600 text-sm whitespace-nowrap">
          İçerik Sayısı: {author._count.posts}
        </p>
      </div>
      <div className="absolute h-8 w-8 -left-3 -top-3 bg-red-700 rounded-full text-center text-white">
        <p className="text-center text-sm font-extrabold transform translate-y-1.5">
          {index}
        </p>
      </div>
    </div>
  );
}

export default AuthorListItem;
