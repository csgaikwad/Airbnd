import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Carousel } from "react-responsive-carousel";
import { PropertyAtom } from "../../atoms/PropertyAtom";
import { UserAtom } from "../../atoms/UserAtom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserProperties() {
  const properties = useRecoilValue(PropertyAtom);
  const [userProperties, setUserProperties] = useState([]);
  const user = useRecoilValue(UserAtom);
  const setPropertyAtom = useSetRecoilState(PropertyAtom);
  const navigate = useNavigate();

  const fetchUserProperties = async () => {
    try {
      if (properties.length === 0) {
        const response = await axios.get(`/properties`);
        setPropertyAtom(response.data);
        const filteredProperties = response.data.filter(
          (a) => a.user === user.id
        );
        setUserProperties(filteredProperties);
      } else {
        const filteredProperties = properties.filter((a) => a.user === user.id);
        setUserProperties(filteredProperties);
      }
    } catch (error) {
      console.error("Error fetching user properties:", error);
    }
  };
  useEffect(() => {
    if (user.isOwner && user.id) {
      fetchUserProperties();
    }
  }, [user.isOwner, user.id, properties]);
  return (
    <div className="block md:grid grid-cols-1  xl:grid-cols-2  gap-10  my-4 justify-items-center px-10 ">
      {userProperties.map((property) => (
        <div
          key={property._id}
          className=" shadow-xl rounded-xl  max-w-80 bg-transparent my-5 border-2 bg-white transition-transform duration-300 transform hover:scale-[102%] hover:z-10 hover:border-white hover:border-2 cursor-pointer size-full   "
        >
          <Carousel showThumbs={false} showStatus={false} showIndicators={true}>
            {property.propertyPhotos.map((photoUrl, index) => (
              <div
                className="md:min-w-36 sm:min-h-52 max-w-80  m-2 "
                key={index}
                onClick={() => {
                  navigate("/places/" + property._id);
                }}
              >
                <img
                  className="rounded-xl size-52 md:w-52 object-cover shadow-sm"
                  src={photoUrl}
                  alt={`Property ${index}`}
                />
              </div>
            ))}
          </Carousel>
          <div
            className="px-5 my-1 "
            onClick={() => {
              navigate("/places/" + property._id);
            }}
          >
            <h2 className="md:text-md font-semibold whitespace-nowrap truncate max-w-80 ">
              {property.title}
            </h2>
            <p className="text-gray-600 whitespace-nowrap truncate max-w-80">
              {property.location}
            </p>
            <p className="text-gray-600 text-md ">
              <span className="text-black font-semibold font-serif">
                ₹ {property.price}
              </span>
              /night {/*₹ */}
            </p>
            {/* <p className="text-sm text-gray-500 truncate pb-4">{property.details}</p> */}
          </div>
          <div className=" w-full mt-8 absolute bottom-0 flex items-end justify-center">
            <div
              className="hidden sm:flex  w-full  items-center justify-center font-serif font-semibold text-lg bg-red-500 opacity-50 hover:opacity-100 rounded-lg "
              onClick={() => {
                navigate("/property/" + property._id);
              }}
            >
              <span className="opacity-100">Edit </span>
              <img
                className=" border-2 border-white my-2 size-6   transition-transform duration-300 transform hover:scale-105 hover:z-10   cursor-pointer rounded-full p-1"
                src="/pencil.svg"
                alt="edit"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
