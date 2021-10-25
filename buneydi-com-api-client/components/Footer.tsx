function Footer() {
  return (
    <footer className="text-gray-700 body-font bg-gray-100 my-2">
      <div className="container border-t px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a
            href=""
            className="flex title-font font-bold items-center md:justify-start justify-center text-gray-900 hover:text-indigo-500"
          >
            <i className="fas fa-glasses fa-lg"></i>
            <span className="ml-3 text-xl">Bu Neydi?</span>
          </a>
          <p className="mt-2 text-sm text-gray-700">
            Neyin ne olduğunu öğrenin, öğretin ve yazın...
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a href="" className="text-gray-700 hover:text-indigo-500">
                  First Link
                </a>
              </li>
              <li>
                <a href="" className="text-gray-700 hover:text-indigo-500">
                  Second Link
                </a>
              </li>
              <li>
                <a href="" className="text-gray-700 hover:text-indigo-500">
                  Third Link
                </a>
              </li>
              <li>
                <a href="" className="text-gray-700 hover:text-indigo-500">
                  Fourth Link
                </a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a href="" className="text-gray-700 hover:text-indigo-500">
                  First Link
                </a>
              </li>
              <li>
                <a href="" className="text-gray-700 hover:text-indigo-500">
                  Second Link
                </a>
              </li>
              <li>
                <a href="" className="text-gray-700 hover:text-indigo-500">
                  Third Link
                </a>
              </li>
              <li>
                <a href="" className="text-gray-700 hover:text-indigo-500">
                  Fourth Link
                </a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a href="" className="text-gray-700 hover:text-indigo-500">
                  First Link
                </a>
              </li>
              <li>
                <a href="" className="text-gray-700 hover:text-indigo-500">
                  Second Link
                </a>
              </li>
              <li>
                <a href="" className="text-gray-700 hover:text-indigo-500">
                  Third Link
                </a>
              </li>
              <li>
                <a href="" className="text-gray-700 hover:text-indigo-500">
                  Fourth Link
                </a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a href="" className="text-gray-700 hover:text-indigo-500">
                  First Link
                </a>
              </li>
              <li>
                <a href="" className="text-gray-700 hover:text-indigo-500">
                  Second Link
                </a>
              </li>
              <li>
                <a href="" className="text-gray-700 hover:text-indigo-500">
                  Third Link
                </a>
              </li>
              <li>
                <a href="" className="text-gray-700 hover:text-gray-900">
                  Fourth Link
                </a>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 border-t">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            Copyright © {new Date().getFullYear()}{" "}
            <a href="/" className="text-gray-700 ml-1" target="_blank">
              www.buneydi.com
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a href="" className="text-gray-500">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="" className="ml-3 text-gray-500">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="" className="ml-3 text-gray-500">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="" className="ml-3 text-gray-500">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="" className="ml-3 text-gray-500">
              <i className="fab fa-instagram-square"></i>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
