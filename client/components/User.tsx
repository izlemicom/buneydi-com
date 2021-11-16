import Link from "next/link";
function User({ user }) {
  return (
    <div className="flex justify-center items-center">
      <Link href={`/yazar/${user.id}`}>
        <a>
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={user.image}
            alt=""
          />
        </a>
      </Link>
      <div className="ml-1">
        <Link href={`/yazar/${user.id}`}>
          <a>
            <p className="text-lg font-medium whitespace-nowrap truncate hover:underline">
              {user.name}
            </p>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default User;
