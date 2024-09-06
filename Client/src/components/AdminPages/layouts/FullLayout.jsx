import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";

const FullLayout = () => {
  return (
    <main className="pageWrapper d-flex ">
      {/********Sidebar**********/}
      <aside
        className="sidebarArea shadow"
        id="sidebarArea"
        style={{
          position: "sticky",
          top: "0",
          zIndex: "1000",
          height: "100vh",
          overflowY: "auto",
          // overflowX: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#3F77F3 #f1f1f1",
        }}
      >
        <style>
          {`
            #sidebarArea::-webkit-scrollbar {
              width: 5px;
            }
            #sidebarArea::-webkit-scrollbar-track {
              background: #f1f1f1;
            }
            #sidebarArea::-webkit-scrollbar-thumb {
              background-color: #007bff;
              border-radius: 10px;
              border: 2px solid #f1f1f1;
            }
            #sidebarArea::-webkit-scrollbar-thumb:hover {
              background-color: #5EADFC;
            }
          `}
        </style>
        <Sidebar />
      </aside>

      {/********Content Area**********/}
      <div className="contentArea flex-grow-1 ">
        {/********Header**********/}
        <header
          style={{
            position: "sticky",
            top: "0",
            zIndex: "1000",
            backgroundColor: "white",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Header />
        </header>

        {/********Middle Content**********/}
        <Container className="p=4 wrapper " fluid>
          <Outlet />
        </Container>
      </div>
    </main>
  );
};

export default FullLayout;

// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import { Container } from "reactstrap";

// const FullLayout = () => {
//   return (
//     <main>
//       <div className="pageWrapper d-flex">
//         {/********Sidebar**********/}
//         <aside
//           className="sidebarArea shadow"
//           id="sidebarArea"
//           style={{
//             position: "sticky",
//             top: "0",
//             zIndex: "1000",
//             height: "100vh",
//             overflowY: "auto",
//             scrollbarWidth: "thin",
//             scrollbarColor: "#3F77F3 #f1f1f1",
//           }}
//         >
//           <style>
//             {`
//               #sidebarArea::-webkit-scrollbar {
//                 width: 5px;
//               }
//               #sidebarArea::-webkit-scrollbar-track {
//                 background: #f1f1f1;
//               }
//               #sidebarArea::-webkit-scrollbar-thumb {
//                 background-color: #007bff;
//                 border-radius: 10px;
//                 border: 2px solid #f1f1f1;
//               }
//               #sidebarArea::-webkit-scrollbar-thumb:hover {
//                 background-color: #5EADFC;
//               }
//             `}
//           </style>
//           <Sidebar />
//         </aside>

//         {/********Content Area**********/}
//         <div className="contentArea flex-grow-1">
//           {/* <div > */}
//           {/********Header**********/}
//           <header
//             style={{
//               position: "sticky",
//               top: "0",
//               zIndex: "1000",
//               backgroundColor: "white", // Optional: ensures the header doesn't overlap content
//               boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Optional: adds a subtle shadow
//             }}
//           >
//             <Header />
//           </header>

//           {/********Middle Content**********/}
//           <Container className="p-4 wrapper" fluid>
//             <Outlet />
//           </Container>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default FullLayout;
