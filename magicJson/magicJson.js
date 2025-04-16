const magicJson = {
  type: "request",
  endpoint: "",
  executor: "",
  data: [],
  metadata: {
    company: {
      id: process.env.NEXT_PUBLIC_COMPANY_ID,
      name: "",
      licence: [
        {
          moduleName: "",
          isAccesible: true,
          permissions: [
            {
              subModuleName: "",
              create: true,
              read: true,
              update: true,
              delete: true,
            },
          ],
        },
      ],
    },
    user: {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      licence: [
        {
          moduleName: "",
          isAccesible: true,
          permissions: [
            {
              subModuleName: "",
              create: true,
              read: true,
              update: true,
              delete: true,
            },
          ],
        },
      ],
    },
    data: {
      options: {
        sortBy: "",
        populate: "",
        limit: 10,
        page: 3,
        id: "",
      },
      filter: {},
    },
  },
};

export default magicJson;
