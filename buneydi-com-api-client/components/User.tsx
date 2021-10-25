function User({ user }) {
  return (
    <div className="flex justify-center items-center">
      <img className="h-10 w-10 rounded-full" src={user.image} alt="" />
      <div className="ml-1">
        <p className="text-lg font-medium whitespace-nowrap truncate">
          {user.name}
        </p>
      </div>
    </div>
  );
}

export default User;
