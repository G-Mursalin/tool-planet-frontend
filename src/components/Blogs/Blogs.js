import React from "react";

const Blogs = () => {
  const code1 = `const products = [
    {name:"iPhone 12",price:15000},
    {name:"iPhone 13",price:15000},
    {name:"Samsung",price:15000},
    {name:"tV 12",price:15000},
    ];`;
  const code2 = `const searchTerm = "TV";`;
  const code3 = `const searchResult= products.filter(({ name }) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );`;
  return (
    <section className="px-16 mt-20">
      <div>
        <h2 className="text-2xl font-bold text-primary">
          How will you improve the performance of a React Application?
        </h2>
        <div className="mt-4 text-lg">
          Optimizing application performance is very important. Because it makes
          the user experience better and better. So, here are some techniques
          for improving the performance of a React Application.
          <ul className="list-disc ml-10 mt-2">
            <li>
              Using React Fragments to avoid additional HTML Element Wrappers.
            </li>
            <li>Avoiding using Index as Key for map.</li>
            <li>Avoiding spreading props on DOM elements.</li>
            <li> Avoiding unnecessary re-renders using React.memo().</li>
          </ul>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-2xl font-bold text-primary">
          What are the different ways to manage a state in a React application?
        </h2>
        <div className="mt-4 text-lg">
          There are four ways to manage a state in a React App.
          <ul className="list-disc ml-10 mt-2">
            <li>
              Local (UI) state - Local state is data we manage in one or another
              component.
            </li>
            <li>
              Global (UI) state - Global state is data we manage across multiple
              components.
            </li>
            <li>Server state - Data that comes from an external server.</li>
            <li>
              URL state - Data that exists on our URLs, including the pathname
              and query parameters.
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-2xl font-bold text-primary">
          Why you do not set the state directly in React. For example, if you
          have const [products, setProducts] = useState([]). Why you do not set
          products = [...] instead, you use the setProducts
        </h2>
        <p className="mt-4 text-lg">
          We can't do this because React doesn't works like this behind the
          seen. States are immediately. It creates a pending state transition,
          and accessing it after calling this method will only return the
          present value.
        </p>
      </div>
      <div className="mt-5">
        <h2 className="text-2xl font-bold text-primary">
          You have an array of products. Each product has a name, price,
          description, etc. How will you implement a search to find products by
          name?
        </h2>
        <p className="mt-4 text-lg">{code1}</p>
        <p className="mt-1 text-lg">{code2}</p>
        <p className="mt-1 text-lg">{code3}</p>
      </div>
      <div className="mt-4 text-lg">
        <h2 className="text-2xl font-bold text-primary">
          What is a unit test? Why should write unit tests?
        </h2>
        <p className="mt-4 text-lg">
          Unit test is a testing of the smallest part of the code of an
          application in the development process. This testing method is the
          first level of software testing, which is performed before other
          testing methods. So if it is done correctly, it can help detect an
          early error in code that may be more difficult to find in later
          testing stages. So, it in very important to write unity tests.
        </p>
      </div>
    </section>
  );
};

export default Blogs;
