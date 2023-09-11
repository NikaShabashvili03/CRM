// import prisma from "@/app/libs/prismadb";
// import getCurrentUser from "./getCurrentUser";

// export interface IRoomsParams {
//   filter?: String;
//   // lost?: boolean;
//   // endDate?: Boolean;
//   // startDate?: string;
// }

// export default async function getLeads(
//   params: IRoomsParams
// ) {
//   try {
//     const currentUser = await getCurrentUser();
//     const {
//       filter,
//     //   lost,
//     //   // startDate,
//     //   // endDate,
//     } = params;
    
//     let query: any = {};



//     // if (startDate && endDate) {
//     //   query.NOT = {
//     //     reservations: {
//     //       some: {
//     //         OR: [
//     //           {
//     //             endDate: { gte: startDate },
//     //             startDate: { lte: startDate }
//     //           },
//     //           {
//     //             startDate: { lte: endDate },
//     //             endDate: { gte: endDate }
//     //           }
//     //         ]
//     //       }
//     //     }
//     //   }
//     // }

//     let allLeads;


//     allLeads = await prisma.leads.findMany({
//       where: {
//           userId: currentUser?.id,
//       },
//       orderBy: {
//           createdAt: 'desc'
//       },
//       include: {
//           user: true,
//       }
//   });
//   if(currentUser?.role === "Admin"){
//     allLeads = await prisma.leads.findMany({
//       where: {
//           user: query,
//       },
//       orderBy: {
//           createdAt: 'desc'
//       },
//       include: {
//           user: true,
//       }
//     });
//   }

//     if(filter == "Done"){
//         allLeads = await prisma.leads.findMany({
//           where: {
//             userId: currentUser?.id,
//             status: 'Done'
//           },
//           orderBy: {
//               createdAt: 'desc'
//           },
//           include: {
//               user: true,
//           }
//       });
//       if(currentUser?.role === "Admin"){
//         allLeads = await prisma.leads.findMany({
//           where: {
//               user: query,
//               status: 'Done'
//           },
//           orderBy: {
//               createdAt: 'desc'
//           },
//           include: {
//               user: true,
//           }
//         });
//       }
//     }

//     if(filter == "New"){
//       allLeads = await prisma.leads.findMany({
//         where: {
//             userId: currentUser?.id,
//             status: 'New'
//         },
//         orderBy: {
//             createdAt: 'desc'
//         },
//         include: {
//             user: true,
//         }
//     });
//     if(currentUser?.role === "Admin"){
//       allLeads = await prisma.leads.findMany({
//         where: {
//             user: query,
//             status: 'New'
//         },
//         orderBy: {
//             createdAt: 'desc'
//         },
//         include: {
//             user: true,
//         }
//       });
//     }
//     }


//     if(filter == "Lost"){
//       allLeads = await prisma.leads.findMany({
//         where: {
//             userId: currentUser?.id,
//             status: "Lost"
//         },
//         orderBy: {
//             createdAt: 'desc'
//         },
//         include: {
//             user: true,
//         }
//     });
//     if(currentUser?.role === "Admin"){
//       allLeads = await prisma.leads.findMany({
//         where: {
//             user: query,
//             status: 'Lost'
//         },
//         orderBy: {
//             createdAt: 'desc'
//         },
//         include: {
//             user: true,
//         }
//       });
//     }
//     }


//     if(filter == "Process"){
//       allLeads = await prisma.leads.findMany({
//         where: {
//             userId: currentUser?.id,
//             status: 'Process'
//         },
//         orderBy: {
//             createdAt: 'desc'
//         },
//         include: {
//             user: true,
//         }
//     });
//     if(currentUser?.role === "Admin"){
//       allLeads = await prisma.leads.findMany({
//         where: {
//             user: query,
//             status: 'Process'
//         },
//         orderBy: {
//             createdAt: 'desc'
//         },
//         include: {
//             user: true,
//         }
//       });
//     }
//     }
//     if(filter == "Delete"){
//       allLeads = await prisma.leads.findMany({
//         where: {
//             userId: currentUser?.id,
//             status: 'Delete'
//         },
//         orderBy: {
//             createdAt: 'desc'
//         },
//         include: {
//             user: true,
//         }
//     });
//     if(currentUser?.role === "Admin"){
//       allLeads = await prisma.leads.findMany({
//         where: {
//             user: query,
//             status: 'Delete'
//         },
//         orderBy: {
//             createdAt: 'desc'
//         },
//         include: {
//             user: true,
//         }
//       });
//     }
//   }

  
//   const safeAllLeads = allLeads.map((listing) => ({
//     ...listing,
//     createdAt: listing.createdAt.toISOString(),
//   }));


//   return safeAllLeads
//   } catch (error: any) {
//     throw new Error(error);
//   }
// }



import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export interface IRoomsParams {

}

export default async function getActivity(

) {
  try {
    // const {
    //   dataId
    // } = params;
    
    let query: any = {};
    const currentUser = await getCurrentUser();

    const AllLeads = await prisma.activity.findMany({
      // where: {
      //   userId: currentUser?.id,
      // },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: true,
        task: true
      }
    });

    const safeAllLeads = AllLeads.map((leads) => ({
      ...leads,
      createdAt: leads.createdAt.toISOString(),
    }));

    return safeAllLeads;
  } catch (error: any) {
    throw new Error(error);
  }
}
