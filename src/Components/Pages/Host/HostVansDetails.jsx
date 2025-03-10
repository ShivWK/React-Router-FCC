import React, { useEffect, useState } from "react";
import { Link, useParams, NavLink, Outlet, useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  let response = await fetch(`/api/host/vans/${params.id}`);
  let data = response.json();

  return data;
}

export default function HostVansDetails() {
  // let van = useParams();

  //useParam returns an object so use objec destructuring to get value from it
  //const { id } = useParams();

  // let [loading, setLoading] = useState(true);
  // let [myVan, setMyVan] = useState([]);

  let loaderData = useLoaderData().vans;
  console.log(loaderData);

  // useEffect(() => {
  //   fetch(`/api/host/vans/${van.id}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Something went wrong");
  //       } else return response.json();
  //     })
  //     .then((data) => {
  //       setMyVan(data.vans[0]);
  //       setLoading(false);
  //     });
  // }, []);

  const myVanDetails = (
    <div className="p-2 bg-white">
      <div className="flex gap-3 md:gap-4 my-2">
        <img
          src={loaderData.imageUrl}
          className="md:w-[12%] md:h-[82%] w-[30%] h-[90%]"
          alt="van-image"
        />
        <div className="flex flex-col gap-2 md:gap-4 justify-center">
          <span
            className={`inline-flex my-1 items-center md:px-4 md:py-1 px-3 py-0 rounded-md text-white ${
              loaderData.type == "simple"
                ? "bg-[#b43333]"
                : loaderData.type == "luxury"
                ? "bg-[#0c0702]"
                : "bg-[rgb(4,80,35)]"
            } w-fit`}
          >
            {loaderData.type}
          </span>
          <p className="md:text-2xl text-xl font-semibold">{loaderData.name}</p>
          <p className="font-semibold">{loaderData.price}/day</p>
        </div>
      </div>
      <nav className=" flex md:gap-3 gap-4 pb-2">
        <NavLink
          end
          to="." //this is link for the component which is index for the parent HostVansDetails compo
          className={({ isActive }) =>
            `hover:font-semibold ${isActive ? "underline" : ""}`
          }
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? "700" : "",
            };
          }}
        >
          Details
        </NavLink>

        <NavLink
          to="vanPricing"
          className={({ isActive }) =>
            `hover:font-semibold ${isActive ? "underline" : ""}`
          }
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? "700" : "",
            };
          }}
        >
          Pricing
        </NavLink>

        <NavLink
          to="vanPhotos"
          className={({ isActive }) =>
            `hover:font-semibold ${isActive ? "underline" : ""}`
          }
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? "700" : "",
            };
          }}
        >
          Photos
        </NavLink>
      </nav>
      <Outlet context={loaderData} />
      {/* since myVan is an object so we have send this as an object */}
    </div>
  );

  function backHandler() {
    history.back();
  }

  return (
    <>
      <section className="px-[10px] mb-8">
        <Link
          className="my-3 md:my-4 text-sm font-semibold flex items-center"
          to=".."
          relative="path"
        >
          &#8592; <span className="underline">back to all vans</span>
        </Link>
        <div className="w-full mt-2">
          {
            myVanDetails
          }
        </div>
      </section>
    </>
  );
}
