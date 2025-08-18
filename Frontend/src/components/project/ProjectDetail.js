import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HeadImage from "./HeadImage";
import Descripction from "./Descripction";
import Image1 from "./image1";
import Image2 from "./image2";
import Image3 from "./image3";
import Image4 from "./image4";
import Image5 from "./image5";
import Image6 from "./image6";
import Image7 from "./image7";
import Next7 from "./nextimage7";
import Next8 from "./Component8";
import Next9 from "./Component9";
import Next9next from "./Component9next";
import Next10 from "./Component10";
import Next11 from "./compontent11";
import Next12 from "./component12";
import Next13 from "./map";
import Next14 from "./NextProject";

export default function ProjectDetail() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState({});
  const [desc, setDesc] = useState({});
  const [info, setinfo] = useState({});
  const [imageData1, setImageData1] = useState({});
  const [imageData2, setImageData2] = useState({});
  const [imageData3, setImageData3] = useState({});
  const [imageData4, setImageData4] = useState({});
  const [imageData5, setImageData5] = useState({});
  const [imageData6, setImageData6] = useState({});
  const [imageData7, setImageData7] = useState({});
  const [imageData8, setImageData8] = useState({});
  const [imageData9, setImageData9] = useState({});
  const [imageData10, setImageData10] = useState({});
  const [imageData11, setImageData11] = useState({});
  const [imageData12, setImageData12] = useState({});
  const [imageData13, setImageData13] = useState({});
  const [map, setmap] = useState({});
  const [scrollTop, setScrollTop] = useState(0);
  // const [allProjects, setAllProjects] = useState([]);
  const [nextProject, setNextProject] = useState(null);

  const handleScroll = () => {
    const winScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    setScrollTop(scrolled);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    axios
      .get("/api/display/")
      .then((res) => {
        const sorted = res.data;
        // setAllProjects(sorted);
        const currentIndex = sorted.findIndex((p) => p.id === id);
        // console.log("All projects:", sorted);
        // console.log("Current project index:", currentIndex);
        if (currentIndex === -1) {
          console.error("Project not found in the list");
          return;
        }
        const nextIndex =
          currentIndex === sorted.length - 1 ? 0 : currentIndex + 1;
        // console.log("Next project index:", nextIndex);
        const next = sorted[nextIndex];
        // console.log("Next project:", next);

        setNextProject({
          id: next.id,
          title: next.title,
          imageUrl: next.image?.url || " error",
          address: next.address || "No address",
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const fetchProject = () => {
      axios
        .get(`/api/display/find/${id}`)
        .then((response) => {
          setProject(response.data);
          setLoading(false);
          // console.log("Project data:", response.data);
          // console.log("Project ID:", id);
        })
        .catch(() => {
          setError("Project not found");
          setLoading(false);
        });
    };

    fetchProject(); // Call once immediately

    const interval = setInterval(() => {
      fetchProject(); // Then call every 10 seconds
    }, 10000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [id]);

  // Set both items and description state in a single useEffect hook
  useEffect(() => {
    if (project) {
      const newItems = {
        title: project.title,
        imageUrl: project.images[0].url,
        address: project.location?.address,
      };
      setItems(newItems);

      const newDesc = {
        projectId: project._id,
        title: project.title,
        description: project.description,
        address: project.location.address,
      };
      setDesc(newDesc);
      const newinfo = {
        projectId: project._id,
        bedrooms: project.infoTable.bedrooms,
        bathrooms: project.infoTable.bathrooms,
        squareFootage: project.infoTable.squareFootage,
        lotSize: project.infoTable.lotSize,
        amenities: project.infoTable.amenities,
        soldPrice: project.infoTable.soldPrice,
      };
      setinfo(newinfo);
      const newImageData1 = {
        imageOne: project.images[1] || null,
        imageTwo: project.images[2] || null,
        prize: project.infoTable.soldPrice,
        location: project.location.address,
        projectId: project._id,
      };
      setImageData1(newImageData1);
      const newImageData2 = {
        imageOne: project.images[3] || null,
        projectId: project._id,
      };
      setImageData2(newImageData2);
      const newImageData3 = {
        imageOne: project.images[4] || null,
        projectId: project._id,
      };
      setImageData3(newImageData3);
      const newImageData4 = {
        imageOne: project.images[5] || null,
        projectId: project._id,
      };
      setImageData4(newImageData4);
      const newImageData5 = {
        imageOne: project.images[6] || null,
        projectId: project._id,
      };
      setImageData5(newImageData5);
      const newImageData6 = {
        imageOne: project.images[7] || null,
        projectId: project._id,
      };
      setImageData6(newImageData6);
      const newImageData7 = {
        imageOne: project.images[8] || null,
        projectId: project._id,
      };
      setImageData7(newImageData7);
      const newImageData8 = {
        imageOne: project.images[9] || null,
        projectId: project._id,
      };
      setImageData8(newImageData8);
      const newImageData9 = {
        imageOne: project.images[10] || null,
        imageTwo: project.images[11] || null,
        projectId: project._id,
      };
      setImageData9(newImageData9);
      const newImageData10 = {
        imageOne: project.images[12] || null,
        imageTwo: project.images[13] || null,
        projectId: project._id,
      };
      setImageData10(newImageData10);
      const newImageData11 = {
        imageOne: project.images[14] || null,
        imageTwo: project.images[15] || null,
        projectId: project._id,
      };
      setImageData11(newImageData11);
      const newImageData12 = {
        imageOne: project.images[16] || null,
        projectId: project._id,
      };
      setImageData12(newImageData12);
      const newImageData13 = {
        imageOne: project.images || null,
        projectId: project._id,
      };
      setImageData13(newImageData13);
      const newmap = {
        projectId: project._id,
        mapLink: project.location.mapLink,
        address: project.location.address,
        latitude: project.location.latitude,
        longitude: project.location.longitude,
      };
      setmap(newmap);
    }
  }, [project]);

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "24px",
          opacity: 0.8,
        }}
      ></div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${scrollTop}%`,
          height: "5px",
          backgroundColor: "#4caf50",
          zIndex: 9999,
          transition: "width 0.25s ease-out",
        }}
      />
      <div>
        <HeadImage items={items} />
      </div>
      <div>
        <Descripction desc={desc} />
      </div>
      {imageData1.imageOne && imageData1.imageTwo && (
        <Image1 data={imageData1} />
      )}
      {imageData2.imageOne && <Image2 data={imageData2} />}
      {imageData3.imageOne && <Image3 data={imageData3} />}
      {imageData4.imageOne && <Image4 data={imageData4} />}
      {imageData5.imageOne && <Image5 data={imageData5} />}
      {imageData6.imageOne && <Image6 data={imageData6} />}
      {imageData7.imageOne && <Image7 data={imageData7} />}
      {imageData8.imageOne && <Next7 data={imageData8} />}
      {/* Only render when both images are available */}
      {imageData9.imageOne && imageData9.imageTwo && (
        <Next8 data={imageData9} />
      )}
      {imageData10.imageOne && imageData10.imageTwo && (
        <Next9 data={imageData10} />
      )}
      {imageData11.imageOne && imageData11.imageTwo && (
        <Next9next data={imageData11} />
      )}
      {imageData12.imageOne && <Next10 data={imageData12} />}
      {imageData13.imageOne && <Next11 data={imageData13} />}
      {/* need to complement */}
      {/* <Image1 data={imageData1} />
      <Image2 data={imageData2} />
      <Image3 data={imageData3} />
      <Image4 data={imageData4} />
      <Image5 data={imageData5} />
      <Image6 data={imageData6} />
      <Image7 data={imageData7} />
      <Next7 data={imageData8} />
      <Next8 data={imageData9} />
      <Next9 data={imageData10} />
      <Next9next data={imageData11} />
      <Next10 data={imageData12} />
      <Next11 data={imageData13} />*/}
      0
      <Next12 info={info} />
      <Next13 map={map} />
      {/* <Next14
        nextProject={{
          // imageUrl: nextProject?.images[0]?.url,
          address: nextProject?.location?.address,
          id: nextProject?._id,
        }}
      /> */}
      {/* <Next14
        nextProject={{
          imageUrl: Array.isArray(nextProject?.images)
            ? nextProject.images[0]?.url
            : null,
          address: nextProject?.location?.address ?? null,
          id: nextProject?._id ?? null,
        }}
      /> */}
      <Next14 nextProject={nextProject} />
    </>
  );
}
