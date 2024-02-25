const mockCourses = [
  {
    id: 1,
    code: "C-ECE-01",
    title: "Electronics Engineering",
    description: "Engineering",
    category: "engineering",
    acronym: "ECE",
    subjects: [
      { acronym: "MATH", title: "Mathematics" },
      { acronym: "ELEX", title: "Electronics Engineering" },
      { acronym: "GEAS", title: "General Engineering and Applied Sciences" },
    ],
    tags: ["engineering", "ece", "review"],
  },
  {
    id: 2,
    code: "C-ECE-02",
    title: "Electronics Technician",
    description: "Technician",
    category: "engineering",
    acronym: "ECT",
    subjects: [
      { acronym: "MATH", title: "Mathematics" },
      { acronym: "ELEX", title: "Electronics Engineering" },
    ],
    tags: ["engineering", "ect", "review"],
  },
];

export default mockCourses;
