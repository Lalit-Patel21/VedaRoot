// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Api from "../../apis/Api";

// function Category() {
//   const [categoryList, setCategoryList] = useState([]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     loadCategory();
//   }, []);
//   const loadCategory = async () => {
//     try {
//       let response = await axios.get(Api.LOAD_CATEGORY);
//       console.log(response);
//       console.log(response.data);
//       setCategoryList(response.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   const navigateToViewMore = (id) => {
//     navigate(`view-more/${id}`);
//   };
//   return (
//     <>
//       <div className="container mt-5">
//         <div className="row">
//           {categoryList.map((category, index) => (
//             <div key={index} className="col-md-3 p-2">
//               <div
//                 className="d-flex flex-column"
//                 style={{ boxShadow: "10px 10px 10px grey", height: "450px" }}
//               >
//                 <img
//                   src={category.imageUrl}
//                   style={{ height: "200px", width: "100%" }}
//                 />
//                 <div>
//                   <h3>{category.categoryName}</h3>
//                 </div>
//                 <div>
//                   <p>{category.description}</p>
//                 </div>

//                 <button
//                   onClick={() => navigateToViewMore(category._id)}
//                   style={{ width: "100%" }}
//                   className="btn btn-secondary text-white"
//                 >
//                   View more
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }
// export default Category;

import Header from "../header/Header";
export default function Category() {
  return (
    <>
      {/* <Header /> */}
      <div className="container - mt-5">
        <h1>Category component...</h1>
      </div>
    </>
  );
}
